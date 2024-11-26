import { Express, Layer, pipe } from "./support/express";

import { HealthAdapter } from "./adapters/health.adapter";
import { ItemAdapter } from "./adapters/item.adapter";
import { FileAdapter } from "./adapters/file.adapter";
import { RecordAdapter } from "./adapters/record.adapter";

import { HealthRouter } from "./router/health.router";
import { FileRouter } from "./router/file.router";
import { ItemRouter } from "./router/item.router";

import { ItemService } from "./services/item.service";
import { HealthService } from "./services/health.service";
import { FileService } from "./services/file.service";
import { ReaderAdapter } from "./adapters/reader.adapter";
import { QueueAdapter } from "./adapters/queue.adapter";

const program = pipe(
  Express.makeApp(),
  Express.useModule(HealthRouter),
  Express.useModule(ItemRouter),
  Express.useModule(FileRouter),
  Express.listen(3333, () => console.log("Listening on port 3333"))
);
const mainLayer = pipe(
  Layer.mergeAll(
    HealthService.Live,
    ItemService.Live,
    FileService.Live
  ),
  Layer.provide(HealthAdapter.Live),
  Layer.provide(ItemAdapter.Live),
  Layer.provide(RecordAdapter.InMemory),
  Layer.provide(FileAdapter.Live),
  // Layer.provide(ReaderAdapter.Live),
  // Layer.provide(QueueAdapter.Live),
);

Express.run(
  Express.provide(
    program, mainLayer
  )
);
