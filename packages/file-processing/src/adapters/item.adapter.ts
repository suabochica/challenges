import { Context, Effect, Layer, Option, pipe } from "effect";
import { Item } from "../models/item.model";
import { RecordAdapter, IOError } from "./record.adapter";

export declare namespace ItemAdapter {
  type Shape = {
    getItemById: (id: string) => Effect.Effect<Item, IOError>;
  };
}

export class ItemAdapter extends Context.Tag("@adapters/ItemAdapter")<
  ItemAdapter,
  ItemAdapter.Shape
>() {
  static Live = Layer.effect(
    ItemAdapter,
    Effect.gen(function* (_) {
      const recordAdapter = yield* _(RecordAdapter);

      return ItemAdapter.of({
        getItemById(id) {
          return pipe(
            recordAdapter.readRecord("items"),
            Effect.map((items) => JSON.parse(items) as Record<string, Item>),
            Effect.flatMap((itemRecord) => Option.fromNullable(itemRecord[id])),
            Effect.catchTag(
              "NoSuchElementException",
              () => new IOError({ which: "Item Not Found" })
            )
          );
        },
      });
    })
  );
}
