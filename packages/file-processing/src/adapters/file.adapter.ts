import { Context, Data, Effect, Layer, Queue, pipe } from "effect";
import { Stream } from "effect/Stream";
import { PlatformError } from "@effect/platform/Error";

import { Item } from "../models/item.model";

import { QueueAdapter } from "./queue.adapter";
import { ReaderAdapter } from "./reader.adapter";

export class IOError extends Data.TaggedError("IOError")<{ which: unknown }> {}
export class CannotSendToQueue extends Data.TaggedError("CannotSendToQueue")<{ which: unknown }> {}
export class NotFound extends Data.TaggedError("NotFound")<{whihc: unknown}> {}

export declare namespace FileAdapter {
  type Shape = {
    uploadFile(file: unknown): Effect.Effect<void, IOError>;
    readFile(filepath: string): Effect.Effect<void, PlatformError> | Stream<Uint8Array, PlatformError>;
    sendDataToQueue(data: unknown): Effect.Effect<void, CannotSendToQueue>;
    getFileCheckpoint(): Effect.Effect<void, NotFound>;
  };
}

export class FileAdapter extends Context.Tag("@adapters/FileAdapter")<
  FileAdapter,
  FileAdapter.Shape
>() {
  static Live = Layer.effect(
    FileAdapter,
    Effect.gen(function* (_) {
      const queue = yield* Queue.unbounded<unknown>()

      const queueAdapter = yield* _(QueueAdapter)
      const readerAdapter = yield* _(ReaderAdapter)

      return FileAdapter.of({
        uploadFile(file) {
          return Effect.succeed("Upload file")
        },

        readFile(filepath: string) {
          return readerAdapter.readFileString(filepath)
        },

        sendDataToQueue(data) {
          return queueAdapter.send(queue, data)
        },

        getFileCheckpoint() {
          return Effect.succeed("GET into files endpoint")
        }
      });
    })
  );
}
