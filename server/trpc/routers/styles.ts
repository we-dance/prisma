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
  battle: publicProcedure
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
  get: publicProcedure
    .input(z.object({ hashtag: z.string(), userId: z.string().optional() }))
    .query(async ({ input }) => {
      const styleData = await prisma.danceStyle.findUnique({
        where: { hashtag: input.hashtag },
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
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

      const style = {
        ...styleData,
        stats: {
          posts: "1.5K",
          views: "154.5K",
          upvotes: "10.8K",
          members: "7.2K",
        },
        moderators: [
          {
            name: "Alex Razbakov",
            role: "Admin",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2F85cc5d77-6212-4707-85e0-24bdf72b1c7c?alt=media&token=2872dc07-fa22-46b7-8f0e-41c935fc6345",
          },
        ],
        members: [
          {
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
            name: "Aina",
          },
          {
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2F85cc5d77-6212-4707-85e0-24bdf72b1c7c?alt=media&token=2872dc07-fa22-46b7-8f0e-41c935fc6345",
            name: "Alex Razbakov",
          },
        ],
      };

      return { style, votes };
    }),
});

// name: "Casino",
//   video: "https://www.youtube.com/watch?v=R7E9cNydevg",
//   description:
//     "Welcome to Casino Dance Community! Join us to learn Casino, share your experiences and connect with fellow dancers passionate about this vibrant style 💃",
//   stats: {
//     posts: "1.5K",
//     views: "154.5K",
//     upvotes: "10.8K",
//     members: "7.2K",
//   },
//   moderators: [
//     {
//       name: "Alex Razbakov",
//       role: "Admin",
//       avatar:
//         "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2F85cc5d77-6212-4707-85e0-24bdf72b1c7c?alt=media&token=2872dc07-fa22-46b7-8f0e-41c935fc6345",
//     },
//   ],
//   popular: true,
//   members: [
//     {
//       avatar:
//         "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
//       name: "Aina",
//     },
//     {
//       avatar:
//         "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2F85cc5d77-6212-4707-85e0-24bdf72b1c7c?alt=media&token=2872dc07-fa22-46b7-8f0e-41c935fc6345",
//       name: "Alex Razbakov",
//     },
//     // ... more members
//   ],
