import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addDanceStyle(danceStyle: any) {
  const data = {
    ...danceStyle,
    hashtag: danceStyle.id,
    partner: danceStyle.parent === "yes",
    group: danceStyle.group === "yes",
    familyOnly: danceStyle.family === "yes",
    active: danceStyle.active === "yes",
    root: danceStyle.root === "yes",
  };

  delete data.id;

  const createdDanceStyle = await prisma.danceStyle.upsert({
    where: { hashtag: data.hashtag },
    update: data,
    create: data,
  });

  return {
    state: "created",
    id: createdDanceStyle.id,
  };
}
