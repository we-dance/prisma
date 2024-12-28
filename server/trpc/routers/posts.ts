import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const postsRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          styleId: z.number().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const posts = await prisma.post.findMany({
        include: {
          style: {
            select: {
              name: true,
              hashtag: true,
            },
          },
          author: {
            select: {
              name: true,
              username: true,
              photo: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          styleId: input?.styleId ? input.styleId : { not: null },
        },
      });

      return posts;
    }),
  get: publicProcedure.input(z.string()).query(async ({ input }) => {
    const post = await prisma.post.findUnique({
      where: { id: input },
      include: {
        style: {
          select: {
            name: true,
            hashtag: true,
          },
        },
        author: {
          select: {
            name: true,
            username: true,
            photo: true,
          },
        },
      },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    return post;
  }),
});
