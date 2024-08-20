import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";

export const profilesRouter = router({
  search: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ input }) => {
      const { query } = input;

      return await prisma.profile.findMany({
        where: {
          OR: [
            {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              bio: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          followersCount: "desc",
        },
        take: 5,
      });
    }),
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
