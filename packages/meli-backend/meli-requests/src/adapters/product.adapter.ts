import { Context, Effect, Layer, Secret } from "effect";
import { SqlClient, SqlResolver } from "@effect/sql"

import { InsertProductSchema, Product } from "../models/product.model";

export declare namespace ProductAdapter {
  type Shape = {
    insertProduct: () => Effect.Effect<void, never>;
  }
}

export class ProductAdapter extends Context.Tag("@adapters/ProductgAdapter")<
  ProductAdapter,
  ProductAdapter.Shape
>() {
  static Live = Layer.effect(
    ProductAdapter,
    Effect.gen(function* (_) {
      const sql = yield* SqlClient.SqlClient

      return ProductAdapter.of({
        insertProduct() {
          return SqlResolver.ordered("Insert Product", {
            Request: InsertProductSchema,
            Result: Product,
            execute: (requests) => 
              sql`
                INSERT INTO products (id, site, start_time, price, name, description, nickname)
              `
          })
        },
      })
    })
  )
}
