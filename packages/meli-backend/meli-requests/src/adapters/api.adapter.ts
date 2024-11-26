import { Effect, Layer, Context } from "effect";
import {
  GetItemError,
  GetCategoryError,
  GetCurrencyError,
  GetUserError,
} from "../models";

const API_HOST_URL = "https://api.mercadolibre.com";

export declare namespace ApiAdapter {
  type Shape = {
    getItem: (itemId: string) => Effect.Effect<unknown, GetItemError>;
    getCategoryName: (
      categoryId: string
    ) => Effect.Effect<unknown, GetCategoryError>;
    getCurrencyDescription: (
      currencyId: string
    ) => Effect.Effect<unknown, GetCurrencyError>;
    getUserNickname: (userId: number) => Effect.Effect<unknown, GetUserError>;
  };
}

export class ApiAdapter extends Context.Tag("@adapters/ApiAdapter")<
  ApiAdapter,
  ApiAdapter.Shape
>() {
  static Live = Layer.succeed(
    ApiAdapter,
    ApiAdapter.of({
      getItem: (itemId: string) =>
        Effect.tryPromise({
          try: () =>
            fetch(`${API_HOST_URL}/items?ids=${itemId}`).then(
              (response) => response.json()
            ),
          catch: () => new GetItemError(),
        }),

      getCategoryName: (categoryId: string) =>
        Effect.tryPromise({
          try: () =>
            fetch(`${API_HOST_URL}/categories/${categoryId}`).then(
              (response) => response.json()
            ),
          catch: () => new GetCategoryError(),
        }),

      getCurrencyDescription: (currencyId: string) =>
        Effect.tryPromise({
          try: () =>
            fetch(`${API_HOST_URL}/currencies/${currencyId}`).then(
              (response) => response.json()
            ),
          catch: () => new GetCurrencyError(),
        }),

      getUserNickname: (userId: number) =>
        Effect.tryPromise({
          try: () =>
            fetch(`${API_HOST_URL}/users/${userId}`).then(
              (response) => response.json()
            ),
          catch: () => new GetUserError(),
        }),
    })
  );
}
