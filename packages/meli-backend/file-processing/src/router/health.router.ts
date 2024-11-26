import { HealthService } from "../services/health.service";
import { Express, pipe } from "../support/express";
import { loggerMiddleware } from "../support/logs";

const ping = Express.gen(function*(_){
    const service = yield* _(HealthService);
    const { response } = yield* _(Express.DefaultContext)

    yield* _(service.ping())

    response.send("ping")
})

const router = pipe(
    Express.makeRouter(),
    Express.use(loggerMiddleware),
    Express.classic.get("/classic", (_, res) => res.send("All is good in the hood")),
    Express.get('/ping', ping)
)

export const HealthRouter = Express.makeModule("/health", router);
