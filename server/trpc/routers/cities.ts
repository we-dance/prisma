import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";

export const citiesRouter = router({
  search: publicProcedure
    .input(z.object({ countryCode: z.string().optional() }))
    .query(async ({ input }) => {
      const { countryCode } = input;

      if (!countryCode) {
        const countries = await prisma.country.findMany();

        return {
          countries,
          cities: [],
        };
      }

      const cities = await prisma.city.findMany({
        include: {
          country: true,
        },
        where: {
          countryCode: {
            equals: countryCode,
          },
        },
        orderBy: {
          subscribersCount: "desc",
        },
        take: 5,
      });

      return {
        countries: [],
        cities,
      };
    }),
});
