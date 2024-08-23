import { Context, Effect, Layer, pipe } from "effect";

import { StatusCode, TaggedHttpError } from "../support/common";

import { Item } from "../models/item.model";
import { ItemAdapter } from "../adapters/item.adapter";

export class NotFound 
extends TaggedHttpError("NotFound", StatusCode(404)) {}

export declare namespace ItemService {
    type Shape = {
        findItem(id: string): Effect.Effect<Item, NotFound>
    }
}

export class ItemService
extends Context.Tag("@services/ItemService")<
    ItemService,
    ItemService.Shape
>(){
    static Live = Layer.effect(ItemService, Effect.gen(function*(_){
        const adapter = yield* _(ItemAdapter);

        return ItemService.of({
            findItem(id) {
                return pipe(
                    adapter.getItemById(id),
                    Effect.mapError(() => new NotFound)
                )
            },
        })
    }))
}