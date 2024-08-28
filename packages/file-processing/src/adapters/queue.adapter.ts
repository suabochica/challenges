import { Context, Effect, Layer, Option, pipe, Queue } from "effect";
import { Item } from "../models/item.model";

export declare namespace QueueAdapter {
  type Shape = {
    send: (offerOnlyQueue: Queue.Enqueue<unknown>, item: unknown) => Effect.Effect<boolean, never, never>;
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
      })
    })
  )
}