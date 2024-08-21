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
  list: publicProcedure
    .input(z.object({ city: z.string(), country: z.string() }))
    .query(async ({ input }) => {
      const { city, country } = input;

      const cityProfile = await prisma.city.findFirst({
        where: {
          slug: city,
          countryCode: country,
        },
      });

      const venues = await prisma.profile.findMany({
        where: {
          // id: {
          //   equals: "ChIJW8LuYO51nkcRZqoW2f9yn8c",
          // },
          // city: {
          //   slug: city,
          // },
        },
        include: {
          eventsHosted: {
            take: 1,
            include: {
              venue: true,
              organizer: true,
              styles: true,
            },
            where: {
              startDate: {
                gte: new Date(),
              },
            },
            orderBy: [
              {
                startDate: "asc",
              },
            ],
          },
        },
        orderBy: {
          eventsHosted: {
            _count: "desc",
          },
        },
        take: 5,
      });

      return {
        cityProfile,
        venues,
      };
    }),
});
