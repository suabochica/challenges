import { Context, Effect, Layer, pipe } from "effect";
import { ProductAdapter } from "../adapters/product.adapter";

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
      const adapter = yield* _(ProductAdapter);

      return ProductService.of({
        insertProduct() {
          return pipe(
            adapter.insertProduct(),
          )
        },
      });
    })
  );
}
