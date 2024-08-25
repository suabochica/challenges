import { Express, Layer, pipe } from "./support/express";

import { RecordAdapter } from "./adapters/record.adapter";
import { HealthAdapter } from "./adapters/health.adapter";
import { ItemAdapter } from "./adapters/item.adapter";

import { HealthRouter } from "./router/health.router";
import { ItemRouter } from "./router/item.router";

import { ItemService } from "./services/item.service";

const program = pipe(
  Express.makeApp(),
  Express.useModule(HealthRouter),
  Express.useModule(ItemRouter),
  Express.listen(3333, () => console.log("Listening on port 3333"))
);
const mainLayer = pipe(
  Layer.mergeAll(HealthAdapter.Live, ItemService.Live),
  Layer.provide(ItemAdapter.FromFile),
  Layer.provide(RecordAdapter.InMemory)
);

Express.run(Express.provide(program, mainLayer));
