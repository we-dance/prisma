import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";
import { z } from "zod";

export const stylesRouter = router({
  list: publicProcedure.query(async () => {
    const styles = await prisma.danceStyle.findMany({
      include: {
        videos: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            videos: true,
          },
        },
      },
      orderBy: {
        videos: {
          _count: "desc",
        },
      },
    });

    return styles;
  }),
  get: publicProcedure
    .input(z.object({ hashtag: z.string(), userId: z.string().optional() }))
    .query(async ({ input }) => {
      const style = await prisma.danceStyle.findUnique({
        where: { hashtag: input.hashtag },
        include: {
          videos: true,
        },
      });

      const votes = await prisma.vote.findMany({
        where: {
          createdById: input.userId,
        },
        select: {
          winnerId: true,
          loserId: true,
        },
      });

      return { style, votes };
    }),
});
