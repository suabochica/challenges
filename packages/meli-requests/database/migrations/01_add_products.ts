import * as Effect from "effect/Effect"
import * as Sql from "@effect/sql-pg"

export default Effect.flatMap(
  Sql.client.PgClient,
  (sql) => sql `
    CREATE TABLE IF NOT EXIST products (
      id VARCHAR(128) NOT NULL,
      site VARCHAR(8) NOT NULL,
      price DOUBLE(11, 2) UNSIGNED,
      start_time DATETIME,
      name VARCHAR(128),
      description TEXT,
      nickname VARCHAR(128),
      CONSTRAINT pk_id_site PRIMARY KEY (id, site)
    );
  `
)
