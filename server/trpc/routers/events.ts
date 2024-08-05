import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";

export const eventsRouter = router({
  get: publicProcedure
    .input(z.object({ shortId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.event.findFirst({
        where: {
          shortId: input.shortId,
        },
        include: {
          venue: true,
          organizer: true,
          styles: true,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        venueId: z.string(),
        organizerId: z.string(),
        styles: z.array(z.string()),
        cover: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        type: z.string(),
        creatorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        name,
        startDate,
        endDate,
        venueId,
        organizerId,
        styles,
        cover,
        creatorId,
        description,
        type,
        price,
      } = input;

      return await prisma.event.create({
        data: {
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          venueId,
          organizerId,
          creatorId,
          description,
          type,
          cover,
          price,
          styles: {
            connect: styles.map((style) => ({
              hashtag: style,
            })),
          },
        },
      });
    }),
  list: publicProcedure
    .input(
      z.object({
        city: z.string(),
        country: z.string(),
        style: z.string().optional(),
        distance: z.number().optional(),
        lat: z.number().optional(),
        lng: z.number().optional(),
        type: z.string().optional(),
        start: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      let lng, lat;
      let venues;

      const {
        type,
        style,
        city,
        country,
        lng: reqLng,
        lat: reqLat,
        distance = 10000,
        start = new Date(),
      } = input;

      if (!reqLng) {
        const cityProfile = await prisma.city.findFirst({
          where: {
            slug: city,
            countryCode: country,
          },
        });

        if (cityProfile) {
          lng = cityProfile.lng;
          lat = cityProfile.lat;
        }
      } else {
        lng = Number(reqLng);
        lat = Number(reqLat);
      }

      if (lng) {
        venues = await prisma.$queryRaw`
    SELECT
      ROUND(earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(lat, lng))::NUMERIC, 2) AS distance,
      id,
      name,
      photo,
      username
    FROM "Profile"
    WHERE ROUND(earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(lat, lng))::NUMERIC, 2) < ${distance}
    AND type = 'Venue'
    ORDER BY distance;`;
      } else {
        venues = await prisma.profile.findMany({
          where: {
            type: "Venue",
          },
        });
      }

      const where: any = {
        startDate: {
          gte: start,
        },
        venue: {
          is: {
            id: {
              in: venues.map((venue) => venue.id),
            },
          },
        },
      };

      if (type) {
        where.type = type;
      }

      if (style) {
        where.styles = {
          some: {
            hashtag: style,
          },
        };
      }

      return await prisma.event.findMany({
        where,
        include: {
          venue: true,
          organizer: true,
          styles: true,
        },
        orderBy: [
          {
            startDate: "asc",
          },
        ],
        take: 10,
      });
    }),
});
