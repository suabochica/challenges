import { Effect } from "effect";

import { FileSystem } from "@effect/platform";
import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";

const readFileString = Effect.gen(function* (_) {
  const fs = yield* _(FileSystem.FileSystem);

  const content = yield* _(fs.readFileString("./inputs/data.csv", "utf8"));

  console.log(content);
});

NodeRuntime.runMain(readFileString.pipe(Effect.provide(NodeFileSystem.layer)));
