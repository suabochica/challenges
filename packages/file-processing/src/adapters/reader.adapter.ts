import { Context, Effect, Layer, pipe } from "effect";
import { Stream } from "effect/Stream";
import { FileSystem } from "@effect/platform"
import { PlatformError } from "@effect/platform/Error";

export declare namespace ReaderAdapter {
  type Shape = {
    readFileString(): Effect.Effect<void, PlatformError>;
    readFileStream(): Stream<Uint8Array, PlatformError>
  };
}

export class ReaderAdapter extends Context.Tag("@adapters/ReaderAdapter")<
  ReaderAdapter,
  ReaderAdapter.Shape
  >() {
    static Live = Layer.effect(
      ReaderAdapter,
      Effect.gen(function* (_) {
        const fs = yield* _(FileSystem.FileSystem)

        return ReaderAdapter.of({
          readFileString() {
            return Effect.succeed(
              fs.readFileString("../../uploads/data.csv", "utf-8")
            )
          },

          readFileStream() {
            return fs.stream("../../uploads/data.csv", {
              bufferSize: 64,
              bytesToRead: 8,
              chunkSize: 128
            })
          },
        });
      })
    )
  }
