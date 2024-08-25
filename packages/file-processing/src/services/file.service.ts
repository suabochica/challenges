import { Context, Effect, Layer, pipe } from "effect";

import { StatusCode, TaggedHttpError } from "../support/common";

import { FileAdapter } from "../adapters/file.adapter";

export class NotFound extends TaggedHttpError("NotFound", StatusCode(404)) {}

export declare namespace FileService {
  type Shape = {
    processFile(filename: string): Effect.Effect<void, NotFound>;
    getFilePath(filename: string): void;
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
        processFile(filename) {
          return pipe(
            adapter.readFileSystem(filename),
            Effect.mapError(() => new NotFound())
          );
        },

        getFilePath(filename) {}

      });
    })
  );
}
