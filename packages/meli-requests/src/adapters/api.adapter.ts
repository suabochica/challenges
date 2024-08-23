import { Effect } from "effect"
import { Category, Currency, Item, User, GetItemError, GetCategoryError, GetCurrencyError, GetUserError } from "../models"

export const getFileData = (en) => {
  //TO DO
}

export const getItem = (id: number) =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://api.example.com/items?ids=${id}`)
      .then(response => response.json() as Promise<typeof Item>),
    catch: () => new GetItemError()
  })

export const getCategoryName = (id: number) =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://api.example.com/categories/${id}`)
      .then(response => response.json() as Promise<typeof Category>),
    catch: () => new GetCategoryError()
  })

export const getCurrencyyDescription = (id: number) =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://api.example.com/currencies/${id}`)
      .then(response => response.json() as Promise<typeof Currency>),
    catch: () => new GetCurrencyError()
  })

export const getUserNickname = (id: number) =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://api.example.com/users/${id}`)
      .then(response => response.json() as Promise<typeof User>),
    catch: () => new GetUserError()
  })
