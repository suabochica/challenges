import { Context, Effect, Layer } from "effect";
import { Stream } from "effect/Stream";
import { FileSystem } from "@effect/platform"
import { PlatformError } from "@effect/platform/Error";

export declare namespace ReaderAdapter {
  type Shape = {
    readFileString(filepath: string): Effect.Effect<string, PlatformError>;
    readFileStream(filepath: string): Stream<Uint8Array, PlatformError>
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
          readFileString(filepath) {
            return fs.readFileString(filepath, "utf-8")
          },

          readFileStream(filepath) {
            return fs.stream(filepath, {
              bufferSize: 64,
              bytesToRead: 8,
              chunkSize: 128
            })
          },
        });
      })
    )
  }
