import { Effect, Express, pipe } from "../support/express";

export const loggerMiddleware = Express.gen(function* (_) {
  const { request, next } = yield* _(Express.DefaultContext);
  const { method, path } = request;

  yield* _(Effect.log(`${method} ${path}`));
  yield* _(Effect.sync(next));
});
