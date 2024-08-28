import { Context, Effect, Layer, pipe } from "effect";
import { Stream } from "effect/Stream";
import { PlatformError } from "@effect/platform/Error";

import { StatusCode, TaggedHttpError } from "../support/common";

import { FileAdapter } from "../adapters/file.adapter";

export class CannotSentToQueue extends TaggedHttpError("CannotSentToQueue", StatusCode(404)) {}
export class NotFound extends TaggedHttpError("NotFound", StatusCode(404)) {}

export declare namespace FileService {
  type Shape = {
    uploadFile(file: unknown): Effect.Effect<void, NotFound>;
    readFile(filepath: string):  Effect.Effect<void, PlatformError> | Stream<Uint8Array, PlatformError>;
    sendDataToQueue(data: unknown): Effect.Effect<void, CannotSentToQueue>;
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
        uploadFile(file: unknown) {
          return pipe(
            adapter.uploadFile(file),
            Effect.mapError(() => new NotFound())
          );
        },

        readFile(filepath: string) {
          return pipe(
            adapter.readFile(filepath),
          );
        },

        sendDataToQueue(data: unknown) {
          return pipe(
            adapter.sendDataToQueue(data),
            Effect.mapError(() => new CannotSentToQueue())
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
