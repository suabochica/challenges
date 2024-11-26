import { Config, Effect, Struct, pipe } from "effect"
import { PgClient } from "@effect/sql-pg"
import { SqlClient } from "@effect/sql"

const SqlLive = PgClient.layer({
  database: Config.succeed("melid_db")
})

const program = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient

  const products = yield* sql<{
  }>`SELECT * FROM products`

  yield* Effect.log(`Got ${products.length} results!`)
})

pipe(
  program,
  Effect.provide(SqlLive),
  Effect.runPromise
)