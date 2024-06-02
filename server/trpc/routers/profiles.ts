import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";

export const profilesRouter = router({
  get: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;

      return await prisma.profile.findFirst({
        where: {
          username,
        },
        include: {
          _count: {
            select: {
              subscribers: true,
            },
          },
          eventsCreated: {
            take: 5,
            orderBy: [
              {
                startDate: "desc",
              },
            ],
          },
        },
      });
    }),
});
