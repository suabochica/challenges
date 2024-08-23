import { Context, Data, Effect, Layer } from "effect";

export class IOError extends Data.TaggedError("IOError")<{ which: unknown }> {}

export declare namespace FileAdapter {
  type Shape = {
    read: (file: string) => Effect.Effect<string, IOError>;
  };
}

const files: Record<string, string> = {
  items: JSON.stringify({
    0: {
      id: "750925229",
      site: "MLA",
    },
  }),
};

export class FileAdapter extends Context.Tag("@adapters/FileAdapter")<
  FileAdapter,
  FileAdapter.Shape
>() {
  static InMemory = Layer.succeed(
    FileAdapter,
    FileAdapter.of({
      read(file) {
        return Effect.tryPromise({
          try: () => {
            if (files[file]) {
              return Promise.resolve(files[file]);
            }
            return Promise.reject(new Error("File not found"));
          },
          catch: (which) => new IOError({ which }),
        });
      },
    })
  );
}
