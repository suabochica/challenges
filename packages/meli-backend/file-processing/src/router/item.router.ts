import { Effect, Express, pipe } from "../support/express";
import { ItemService } from "../services/item.service";

import { loggerMiddleware } from "../support/logs";

const getItemByIdGen = Express.gen(function* (_) {
  const { request, response } = yield* _(Express.RouteContext("/:id"));
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

const router = pipe(
  Express.makeRouter(),
  Express.use(loggerMiddleware),
  Express.get("/:id", getItemByIdGen),
  Express.get("pipe/:id", getItemByIdPipe)
);

export const ItemRouter = Express.makeModule("/items", router);
