import { Config, Context, Effect, Layer, Secret } from "effect";
import { SqlClient } from "@effect/sql"
import { PgClient, PgMigrator } from "@effect/sql-pg";

import { fileURLToPath } from "node:url"

export declare namespace PgAdapter {
  type Shape = {
    database: () => Effect.Effect<void, never>;
    migrations: () => Effect.Effect<void, never>;
  }
}

export class PgAdapter extends Context.Tag("@adapters/PgAdapter")<
  PgAdapter,
  PgAdapter.Shape
>() {
  static Live = Layer.effect(
    PgAdapter,
    Effect.gen(function* (_) {
      const sql = yield* SqlClient.SqlClient

      return PgAdapter.of({
        database() {
          return PgClient.layer({
            database: Config.succeed("melidb"),
            username: Config.succeed("slbenitez"),
            port: Config.succeed(5432),
            password: Config.succeed( Secret.fromString("b4ckendChallenge"))
          })
        },

        migrations() {
          return PgMigrator.layer({
            loader: PgMigrator.fromFileSystem(
              fileURLToPath(new URL("migrations", import.meta.url))
            ),
            schemaDirectory: "src/database/migrations"
          }).pipe(Layer.provide(PgClient.layer({
            database: Config.succeed("gdg"),
            username: Config.succeed("user"),
            port: Config.succeed(5432),
            password: Config.succeed( Secret.fromString("password")),
          })))
        },
      })
    })
  )
}
