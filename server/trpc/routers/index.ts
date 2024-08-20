import { router } from "../trpc";
import { eventsRouter } from "./events";
import { profilesRouter } from "./profiles";
import { citiesRouter } from "./cities";

export const appRouter = router({
  events: eventsRouter,
  profiles: profilesRouter,
  cities: citiesRouter,
});

export type AppRouter = typeof appRouter;
