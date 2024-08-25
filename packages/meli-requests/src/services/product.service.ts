import { Context, Effect, Layer, pipe } from "effect";
import { InsertProductSchema, Product } from "../models/product.model";
import { SqlClient, SqlResolver } from "@effect/sql";

export declare namespace ProductService {
  type Shape = {
    insertProduct(): void;
  };
}
export class ProductService extends Context.Tag("@services/ProductService")<
  ProductService,
  ProductService.Shape
>() {
  static Live = Layer.effect(
    ProductService,
    Effect.gen(function* (_) {
      const sql = yield* SqlClient.SqlClient

      return ProductService.of({
        insertProduct() {
          SqlResolver.ordered("InsertProduct", {
            Request: InsertProductSchema,
            Result: Product,
            execute: (requests) =>
              sql`
              INSERT INTO products
              ${sql.insert(requests)}
              RETURNING products.*
            `
          })
        },
      });
    })
  );
}
