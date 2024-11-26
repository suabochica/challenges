import { Context, Effect, Layer } from "effect";
import { HealthAdapter } from "../adapters/health.adapter";

export declare namespace HealthService {
  type Shape = {
    ping(): Effect.Effect<void>
  }
}

export class HealthService extends Context.Tag("@services/HealthService")
<
  HealthService,
  HealthService.Shape
>() {
  static Live = Layer.effect(
    HealthService,
    Effect.gen(function* (_) {
      const adapter = yield* _(HealthAdapter);

      return HealthService.of({
        ping() {
          return adapter.health()
        }
      })
    })
  )
}