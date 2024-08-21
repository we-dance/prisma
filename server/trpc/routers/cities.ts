import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";

export const citiesRouter = router({
  search: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        countryCode: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { query, countryCode } = input;

      const countries = await prisma.country.findMany();

      let where: any = {};
      if (countryCode) {
        where.countryCode = {
          equals: countryCode,
        };
      }

      if (query) {
        where.OR = [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            slug: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            region: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            country: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ];
      }

      const cities = await prisma.city.findMany({
        include: {
          country: true,
          _count: {
            select: {
              profiles: true,
            },
          },
        },

        where,

        orderBy: {
          profiles: {
            _count: "desc",
          },
        },
        take: 5,
      });

      return {
        countries,
        cities,
      };
    }),
});
