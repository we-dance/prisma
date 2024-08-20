import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";

export const citiesRouter = router({
  search: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ input }) => {
      const { query } = input;

      return await prisma.city.findMany({
        include: {
          country: true,
        },
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          subscribersCount: "desc",
        },
        take: 5,
      });
    }),
});
