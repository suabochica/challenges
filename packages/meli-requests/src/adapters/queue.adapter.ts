import { Context, Effect, Layer, Option, pipe, Queue } from "effect";

export declare namespace QueueAdapter {
  type Shape = {
    send: (offerOnlyQueue: Queue.Enqueue<number>, item: number) => Effect.Effect<void>;
    receive: (takeOnlyQueue: Queue.Dequeue<number>) => Effect.Effect<void>;
  };
}

export class QueueAdapter extends Context.Tag("adapters/QueueAdapter")<
  QueueAdapter,
  QueueAdapter.Shape
>() {
  static Live = Layer.effect(
    QueueAdapter,
    Effect.gen(function* (_) {
      return QueueAdapter.of({
        send(offerOnlyQueue, item) {
          return Queue.offer(offerOnlyQueue, item)
        },

        receive(takeOnlyQueue) {
          return Queue.take(takeOnlyQueue)
        }
      })
    })
  )
}