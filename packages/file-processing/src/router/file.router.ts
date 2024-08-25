import { Effect, Express, pipe } from "../support/express";
import { FileService } from "../services/file.service";

const uploadFile = Express.gen(function*(_){
    const { request, response } = yield* _(Express.RouteContext("/files/:filename"));
    const service = yield* _(FileService);

    return yield* _(
      service.processFile(request.params.filename),
      Effect.match({
          onSuccess(value) {
              response.status(200);
              response.json(JSON.stringify(value))
          },
          onFailure(error) {
              response.status(error.code);
              response.json(error.error);
          },
      })
  )
})

const router = pipe(
  Express.makeRouter(),
  Express.post(`/file/:filename}`, uploadFile)
)

export const FileRouter = Express.makeModule("/files", router);
