import { Context, Effect, Layer, Option, pipe } from "effect";
import { Item } from "../models/item.model";
import { FileAdapter, IOError } from "./file.adapter";

export declare namespace ItemAdapter {
  type Shape = {
    getItemById: (id: string) => Effect.Effect<Item, IOError>;
  };
}

export class ItemAdapter extends Context.Tag("@adapters/ItemAdapter")<
  ItemAdapter,
  ItemAdapter.Shape
>() {
  static FromFile = Layer.effect(
    ItemAdapter,
    Effect.gen(function* (_) {
      const fileAdapter = yield* _(FileAdapter);

      return ItemAdapter.of({
        getItemById(id) {
          return pipe(
            fileAdapter.read("items"),
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
