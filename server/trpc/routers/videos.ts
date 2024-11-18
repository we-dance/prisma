import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const videosRouter = router({
  add: publicProcedure
    .input(
      z.object({
        url: z.string(),
        createdById: z.string(),
        styleId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.video.create({
        data: input,
      });
    }),
  vote: publicProcedure
    .input(
      z.object({
        winnerId: z.string(),
        loserId: z.string(),
        createdById: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingVote = await ctx.prisma.vote.findFirst({
        where: {
          OR: [
            {
              AND: [
                { winnerId: input.winnerId },
                { loserId: input.loserId },
                { createdById: input.createdById },
              ],
            },
            {
              AND: [
                { winnerId: input.loserId },
                { loserId: input.winnerId },
                { createdById: input.createdById },
              ],
            },
          ],
        },
      });

      if (existingVote) {
        await ctx.prisma.vote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            winnerId: input.winnerId,
            loserId: input.loserId,
          },
        });
        return;
      }

      await ctx.prisma.vote.create({
        data: input,
      });
    }),
});
