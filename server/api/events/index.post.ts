import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  const { name, description, startDate, endDate } = await readBody(event);

  const newEvent = await event.context.prisma.event.create({
    data: {
      name,
      description,
      startDate,
      endDate,
    },
  });
  return newEvent;
});
