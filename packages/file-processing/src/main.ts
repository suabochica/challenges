import { Express, Layer, pipe } from "./support/express";

import { RecordAdapter } from "./adapters/record.adapter";
import { HealthAdapter } from "./adapters/health.adapter";
import { ItemAdapter } from "./adapters/item.adapter";
import { FileAdapter } from "./adapters/file.adapter";

import { HealthRouter } from "./router/health.router";
import { FileRouter } from "./router/file.router";
import { ItemRouter } from "./router/item.router";

import { ItemService } from "./services/item.service";
import { HealthService } from "./services/health.service";
import { FileService } from "./services/file.service";

const program = pipe(
  Express.makeApp(),
  Express.useModule(HealthRouter),
  Express.useModule(FileRouter),
  Express.useModule(ItemRouter),
  Express.listen(3333, () => console.log("Listening on port 3333"))
);
const mainLayer = pipe(
  Layer.mergeAll(HealthService.Live, ItemService.Live, FileService.Live),
  Layer.provide(HealthAdapter.Live),
  Layer.provide(ItemAdapter.FromFile),
  Layer.provide(FileAdapter.InMemory),
  Layer.provide(RecordAdapter.InMemory)
);

Express.run(Express.provide(program, mainLayer));
