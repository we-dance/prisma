import { router } from "../trpc";
import { eventsRouter } from "./events";
import { profilesRouter } from "./profiles";
import { citiesRouter } from "./cities";
import { stylesRouter } from "./styles";
import { videosRouter } from "./videos";

export const appRouter = router({
  events: eventsRouter,
  profiles: profilesRouter,
  cities: citiesRouter,
  styles: stylesRouter,
  videos: videosRouter,
});

export type AppRouter = typeof appRouter;
