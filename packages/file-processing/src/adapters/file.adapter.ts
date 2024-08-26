import { Context, Data, Effect, Layer } from "effect";
import { FileSystem } from "@effect/platform"

export class IOError extends Data.TaggedError("IOError")<{ which: unknown }> {}

export declare namespace FileAdapter {
  type Shape = {
    // readFileSystem: (file: string) => Effect.Effect<void, IOError>;
    getFilePath: () => Effect.Effect<void>;
  };
}

export class FileAdapter extends Context.Tag("@adapters/FileAdapter")<
  FileAdapter,
  FileAdapter.Shape
>() {
  static InMemory = Layer.effect(
    FileAdapter,
    Effect.gen(function* (_) {
      // const fs = yield* _(FileSystem.FileSystem);

      return FileAdapter.of({
        // readFileSystem(filepath) {
        //   return Effect.tryPromise({
        //     try: () => {
        //       const content = fs.readFileString(filepath, "utf8")
        //       console.log(content)
        //       return Promise.resolve(content);
        //     },
        //     catch: (which) => new IOError({ which })
        //   });
        // },

        getFilePath() {
          return Effect.succeed("GET into files endpoint")
        }
      });
    })
  );
}
