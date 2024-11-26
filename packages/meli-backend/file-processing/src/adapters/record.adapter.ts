import { Context, Data, Effect, Layer } from "effect";

const files: Record<string, string> = {
  items: JSON.stringify({
    0: {
      id: "750925229",
      site: "MLA",
    },
    1: {
      id: "750925239",
      site: "MLA",
    },
  }),
};

export class IOError extends Data.TaggedError("IOError")<{ which: unknown }> {}

export declare namespace RecordAdapter {
  type Shape = {
    readRecord: (file: string) => Effect.Effect<string, IOError>;
  };
}

export class RecordAdapter extends Context.Tag("@adapters/RecordAdapter")<
  RecordAdapter,
  RecordAdapter.Shape
>() {
  static InMemory = Layer.succeed(
    RecordAdapter,
    RecordAdapter.of({
      readRecord(file) {
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
