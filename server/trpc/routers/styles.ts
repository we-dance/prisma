import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";
import { z } from "zod";

export const stylesRouter = router({
  list: publicProcedure.query(async () => {
    const styles = await prisma.danceStyle.findMany({
      orderBy: { membersCount: "desc" },
    });

    return styles.filter((dance) => dance.family !== dance.hashtag);
  }),
  get: publicProcedure
    .input(z.object({ hashtag: z.string() }))
    .query(async ({ input }) => {
      const style = await prisma.danceStyle.findUnique({
        where: { hashtag: input.hashtag },
      });

      return style;
    }),
});
