import { Hono } from "hono";

import { authRouter } from "./auth/router";

export const mainRouter = new Hono()
.route("/auth",authRouter);

export type AppType = typeof mainRouter;