import { Effect, Express, pipe } from "../support/express";
import { ItemService } from "../services/item.service";

const getItemByIdGen = Express.gen(function* (_) {
  const { request, response } = yield* _(Express.RouteContext("/item/:id"));
  const service = yield* _(ItemService);

  return yield* _(
    service.findItem(request.params.id),
    Effect.match({
      onSuccess(value) {
        response.status(200);
        response.json(JSON.stringify(value));
      },
      onFailure(error) {
        response.status(error.code);
        response.json(error.error);
      },
    })
  );
});

const getItemByIdPipe = pipe(
  Effect.all([Express.RouteContext("/:id"), ItemService]),
  Effect.flatMap(([ctx, service]) => {
    const { request, response } = ctx;

    return pipe(
      service.findItem(request.params.id),
      Effect.match({
        onSuccess(value) {
          response.status(200);
          response.json(JSON.stringify(value));
        },
        onFailure(error) {
          response.status(error.code);
          response.json(error.error);
        },
      })
    );
  }),
  Effect.either
);

const loggerMiddleware = Express.gen(function* (_) {
  const { request, next } = yield* _(Express.DefaultContext);
  const { method, path } = request;

  yield* _(Effect.log(`${method} ${path}`));
  yield* _(Effect.sync(next));
});

const router = pipe(
  Express.makeRouter(),
  Express.use(loggerMiddleware),
  Express.get("/:id", getItemByIdGen),
  Express.get("pipe/:id", getItemByIdPipe)
);

export const ItemRouter = Express.makeModule("/items", router);
