import { Effect, Express, pipe } from "../support/express";
import { FileService } from "../services/file.service";

import { loggerMiddleware } from "../support/logs";

const getFile = Express.gen(function* (_) {
  const { request, response } = yield* _(Express.RouteContext("/:upload"));
  const service = yield* _(FileService);

  return yield* _(
    service.getFileCheckpoint(),
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

const uploadFile = Express.gen(function* (_) {
  const { request, response } = yield* _(Express.RouteContext("/:upload"));
  const service = yield* _(FileService);

  return yield* _(
    service.uploadFile(request.body),
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

const router = pipe(
  Express.makeRouter(),
  Express.use(loggerMiddleware),
  Express.get(`/`, getFile),
  Express.post(`/`, uploadFile)
);

export const FileRouter = Express.makeModule("/files", router);
