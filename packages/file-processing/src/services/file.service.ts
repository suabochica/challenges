import { Context, Effect, Layer, pipe } from "effect";

import { StatusCode, TaggedHttpError } from "../support/common";

import { FileAdapter } from "../adapters/file.adapter";

export class NotFound extends TaggedHttpError("NotFound", StatusCode(404)) {}

export declare namespace FileService {
  type Shape = {
    // processFile(filename: string): Effect.Effect<void, NotFound>;
    getFilePath(): Effect.Effect<void, NotFound>;
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
        // processFile(filename) {
        //   return pipe(
        //     adapter.readFileSystem(filename),
        //     Effect.mapError(() => new NotFound())
        //   );
        // },

        getFilePath() {
          return pipe(
            adapter.getFilePath(),
            Effect.mapError(() => new NotFound())
          )
        }
      });
    })
  );
}
