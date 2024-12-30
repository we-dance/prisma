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
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const post = await prisma.post.delete({
        where: { id: input },
      });

      return post;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        styleId: z.number(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          styleId: input.styleId,
          authorId: input.authorId,
          slug: new Date().toISOString(),
        },
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

      return post;
    }),
});
