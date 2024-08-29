import { Effect, Queue } from "effect";

type Item = {
  id: string
  site: string
}

const send = (offerOnlyQueue: Queue.Enqueue<Item>, value: Item) => {
  return Queue.offer(offerOnlyQueue, value)
}
 
const receive = (takeOnlyQueue: Queue.Dequeue<Item>) => {
  return Queue.take(takeOnlyQueue)
}
 
const program = Effect.gen(function* () {
  const queue = yield* Queue.unbounded<Item>()
 
  // Offer values to the queue
  yield* send(queue, {id: "750925227", site: "MLA"})
  yield* send(queue, {id: "750925228", site: "MLA"})
  yield* send(queue, {id: "750925229", site: "MLA"})
 
  // Take values from the queue
  console.log(yield* receive(queue))
  console.log(yield* receive(queue))
  console.log(yield* receive(queue))
})
 
Effect.runPromise(program)