import { Context, Data, Effect, Layer, Queue, pipe } from "effect";
import multer from "multer";

export class IOError extends Data.TaggedError("IOError")<{ which: unknown }> {}
export class CannotSendToQueue extends Data.TaggedError("CannotSendToQueue")<{ which: unknown }> {}
export class NotFound extends Data.TaggedError("NotFound")<{whihc: unknown}> {}

export declare namespace FileAdapter {
  type Shape = {
    uploadFile(): Effect.Effect<void, IOError>;
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
      const upload = multer({ dest: "uploads/" });

      return FileAdapter.of({
        uploadFile() {
          return Effect.succeed(upload.single("file"))
        },

        getFileCheckpoint() {
          return Effect.succeed("GET into files endpoint")
        }
      });
    })
  );
}
