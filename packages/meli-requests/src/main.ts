import { Effect, pipe, Queue } from "effect";
import { NodeRuntime } from "@effect/platform-node";

import { PgAdapter } from "./adapters/pg.adapter";
import { ApiAdapter } from "./adapters/api.adapter";
import { QueueAdapter } from "./adapters/queue.adapter";

import { Item } from "./models/item.model";

const send = (offerOnlyQueue: Queue.Enqueue<number>, value: number) => {
  return Queue.offer(offerOnlyQueue, value)
}
 
const receive = (takeOnlyQueue: Queue.Dequeue<number>) => {
  return Queue.take(takeOnlyQueue)
}
 
const program = Effect.gen(function* () {
  const queue = yield* Queue.unbounded<number>()
 
  // Offer values to the queue
  yield* send(queue, 1)
  yield* send(queue, 2)
  yield* send(queue, 3)
 
  // Take values from the queue
  console.log(yield* receive(queue))
  console.log(yield* receive(queue))
  console.log(yield* receive(queue))
})
 
Effect.runPromise(program)