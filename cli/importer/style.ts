import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addDanceStyle(danceStyle: any) {
  const existingDanceStyle = await prisma.danceStyle.findFirst({
    where: { hashtag: danceStyle.id },
  });

  if (existingDanceStyle) {
    return {
      state: "ignored",
      id: existingDanceStyle.hashtag,
    };
  }

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

  const createdDanceStyle = await prisma.danceStyle.create({
    data,
  });

  return {
    state: "created",
    id: createdDanceStyle.id,
  };
}
