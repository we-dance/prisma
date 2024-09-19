import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";

export const stylesRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.danceStyle.findMany();
  }),
});
