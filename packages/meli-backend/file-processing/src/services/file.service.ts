import { Context, Effect, Layer, pipe } from "effect";

import { StatusCode, TaggedHttpError } from "../support/common";

import { FileAdapter } from "../adapters/file.adapter";

export class CannotSentToQueue extends TaggedHttpError("CannotSentToQueue", StatusCode(404)) {}
export class NotFound extends TaggedHttpError("NotFound", StatusCode(404)) {}

export declare namespace FileService {
  type Shape = {
    uploadFile(): Effect.Effect<void, NotFound>;
    getFileCheckpoint(): Effect.Effect<void, NotFound>;
  };
}

export class FileService extends Context.Tag("@services/FileService")<
  FileService,
  FileService.Shape
>() {
  static Live = Layer.effect(
    FileService,
    Effect.gen(function* (_) {
      const adapter = yield* _(FileAdapter);

      return FileService.of({
        uploadFile() {
          return pipe(
            adapter.uploadFile(),
            Effect.mapError(() => new NotFound())
          );
        },

        getFileCheckpoint() {
          return pipe(
            adapter.getFileCheckpoint(),
            Effect.mapError(() => new NotFound())
          )
        }
      });
    })
  );
}
