import {Config, Effect, Layer} from "effect";
import {SqlClient} from "@effect/sql"
import * as Secret from "effect/Secret";

const SqlLive = SqlClient.client.layer({
  database: Config.succeed("melidb"),
  username: Config.succeed("slbenitezd"),
  port: Config.succeed(5432),
  password: Config.succeed(Secret.fromString("b4ckendChallenge")),
})
