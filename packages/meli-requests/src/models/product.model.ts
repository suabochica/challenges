import * as S from "@effect/schema/Schema"

export const Product = S.Struct({
  id: S.UUID,
  site: S.String,
  price: S.BigDecimal,
  start_time: S.String,
  name: S.String,
  description: S.String,
  nickname: S.String,
  created_at: S.DateFromSelf,
  updated_at: S.DateFromSelf
})

export const InsertProductSchema = Product.pipe(S.omit("id", "created_at", "updated_at"))
export type ProductInsert = S.Schema.Type<typeof InsertProductSchema>
export type ProductSchema = S.Schema.Type<typeof Product>
