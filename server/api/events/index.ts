import { getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { lng, lat, distance } = getQuery(event);

  const events = await prisma.$queryRaw`
    SELECT *
    FROM "Event"
    WHERE venueId IN (
      SELECT id
      FROM "Profile"
      WHERE ST_Distance_Sphere(
        ST_MakePoint(${lng}, ${lat}),
        ST_MakePoint(lng, lat)
      ) <= ${((distance as number) ?? 50) * 1000}
    );
  `;

  return events;
});
