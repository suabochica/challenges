import { Effect } from "effect"
import { ApiAdapter } from "./adapters/api.adapter"
 
// Orchestrates operations on todos, notifying their owners
const program = Effect.gen(function* () {
  const adapter = yield* ApiAdapter

  const item = adapter.getItem("MLA5725")
  const category = adapter.getCategoryName("MLA5725")
  const description = adapter.getCurrencyDescription("789")
  const nickname = adapter.getUserNickname(101112)

  console.log(item, category, description, nickname)
})

const runnable = program.pipe(
  Effect.provide(ApiAdapter.Live)
)

Effect.runPromise(runnable).then(console.log)