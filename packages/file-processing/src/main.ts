import { FileSystem } from "@effect/platform"
import { NodeFileSystem, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const readFileString: Effect.Effect<void, PlatformError, FileSystem.FileSystem> = Effect.gen(function* (_) {
  const fs = yield* _(FileSystem.FileSystem)

  // Reading the content of the same file where this code is written
  const content = yield* _(fs.readFileString("./inputs/data.csv", "utf8"))
  console.log(content)
})

NodeRuntime.runMain(readFileString.pipe(Effect.provide(NodeFileSystem.layer)))