import { getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const {
    lng: longitude,
    lat: latitude,
    distance: distanceInKm,
  } = getQuery(event);

  const lng = Number(longitude);
  const lat = Number(latitude);
  const distance = Number(distanceInKm);

  const events = await prisma.$queryRaw`
  SELECT *
  FROM "Event"
  WHERE "venueId" IN (
    SELECT "Profile"."id"
    FROM "Profile"
    WHERE ST_Distance(
      ST_MakePoint(${lng}, ${lat})::geography,
      ST_MakePoint("Profile"."lng", "Profile"."lat")::geography
    ) <= (${distance} * 80000)
  );
  `;

  return events;
});
