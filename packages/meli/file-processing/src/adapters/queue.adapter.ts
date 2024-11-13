import { Context, Effect, Layer, Option, pipe, Queue } from "effect";
import { Item } from "../models/item.model";
import { ReaderAdapter } from "./reader.adapter";

export declare namespace QueueAdapter {
  type Shape = {
    send: (offerOnlyQueue: Queue.Enqueue<unknown>) => Effect.Effect<boolean, never, never>;
  };
}

export class QueueAdapter extends Context.Tag("adapters/QueueAdapter")<
  QueueAdapter,
  QueueAdapter.Shape
>() {
  static Live = Layer.effect(
    QueueAdapter,
    Effect.gen(function* (_) {
      const reader = yield* _(ReaderAdapter)

      return QueueAdapter.of({
        send(offerOnlyQueue) {
          return Queue.offer(offerOnlyQueue, reader.readFileString())
        },
      })
    })
  )
}