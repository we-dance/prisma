import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";

export const stylesRouter = router({
  list: publicProcedure.query(async () => {
    const styles = await prisma.danceStyle.findMany({
      orderBy: { membersCount: "desc" },
    });

    return styles.filter((dance) => dance.family !== dance.hashtag);
  }),
});
