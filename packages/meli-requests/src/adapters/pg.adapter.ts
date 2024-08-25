import { Config, Layer } from "effect";
import { PgClient, PgMigrator } from "@effect/sql-pg";
import { NodeContext } from "@effect/platform-node"
import * as Secret from "effect/Secret";

import { fileURLToPath } from "node:url"

export const SqlLive = PgClient.layer({
  database: Config.succeed("melidb"),
  username: Config.succeed("slbenitezd"),
  port: Config.succeed(5432),
  password: Config.succeed(Secret.fromString("b4ckendChallenge")),
});

// const MigratorLive = PgMigrator.layer({
//   loader: PgMigrator.fromFileSystem(
//     fileURLToPath(new URL("migrations", import.meta.url ))
//   ),
//   // Where to put the `_schema.sql` file
//   schemaDirectory: "src/database/migrations"
// }).pipe(Layer.provide(SqlLive))

// export const EnvLive = Layer.mergeAll(SqlLive, MigratorLive).pipe(
//   Layer.provide(NodeContext.layer)
// )
