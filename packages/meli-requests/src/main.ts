import { Effect, pipe } from "effect";
import { NodeRuntime } from "@effect/platform-node";

import { SqlLive } from "./adapters/pg.adapter";
import { ApiAdapter } from "./adapters/api.adapter";

const program = Effect.gen(function* () {
});

pipe(
  program,
  Effect.provide(
    // ApiAdapter.Live,
    SqlLive,
  ),
  NodeRuntime.runMain
);
