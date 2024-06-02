import { router } from "../trpc";
import { eventsRouter } from "./events";
import { profilesRouter } from "./profiles";

export const appRouter = router({
  events: eventsRouter,
  profiles: profilesRouter,
});

export type AppRouter = typeof appRouter;
