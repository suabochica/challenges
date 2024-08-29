import { Effect } from "effect";

import { QueueAdapter } from "./adapters/queue.adapter";
import { ApiAdapter } from "./adapters/api.adapter";
import { PgAdapter } from "./adapters/pg.adapter";

const program = Effect.gen(function* () {
  const queueAdapter = yield* QueueAdapter
  const apiAdapter = yield* ApiAdapter
  const PgAdapter = yield* PgAdapter
})
 
const runnable = Effect.provide(program, QueueAdapter.Live, ApiAdapter.Live, PgAdapter.Live)
 
Effect.runPromise(runnable).then(console.log)