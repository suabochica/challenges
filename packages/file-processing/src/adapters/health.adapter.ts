import { Context, Effect, Layer } from "effect";

export declare namespace HealthAdapter {
  type Shape = {
    health: () => Effect.Effect<void>;
  };
}

export class HealthAdapter extends Context.Tag("@adapters/Health")<
  HealthAdapter,
  HealthAdapter.Shape
>() {
  static Live = Layer.succeed(
    HealthAdapter,
    HealthAdapter.of({ health: () => Effect.void })
  );
}
