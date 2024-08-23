import * as S from "@effect/schema/Schema"

export const Item = S.Struct({
  start_time: S.String,
  price: S.BigDecimal,
})
