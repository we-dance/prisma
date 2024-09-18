import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";
import { TRPCError } from "@trpc/server";

function getWhere(
  start: string,
  anywhere = false,
  venues: any[],
  type?: string,
  style?: string
) {
  const where: any = {
    startDate: {
      gte: start,
    },
  };

  if (!anywhere) {
    where.venue = {
      is: {
        id: {
          in: venues.map((venue) => venue.id),
        },
      },
    };
  }

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

  return where;
}

async function getVenues(
  lat: number,
  lng: number,
  distance: number
): Promise<any[]> {
  return await prisma.$queryRaw`
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
}

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
        start: z.string(),
        style: z.string().optional(),
        distance: z.number().optional(),
        lat: z.number().optional(),
        lng: z.number().optional(),
        type: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      let lng, lat;

      const {
        type,
        style,
        city,
        country,
        lng: reqLng,
        lat: reqLat,
        start,
        distance = 10000,
      } = input;

      let cityProfile;

      if (!reqLng) {
        cityProfile = await prisma.city.findFirst({
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

      if (!lng || !lat || !cityProfile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "City not found",
        });
      }

      let venues = [];
      try {
        venues = await getVenues(lat, lng, distance);
      } catch (e: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get venues",
          cause: e,
        });
      }
      const where = getWhere(start, false, venues, type, style);

      const events = await prisma.event.findMany({
        cacheStrategy: {
          ttl: 60 * 5,
          swr: 60,
        },
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
        take: 5,
      });

      return {
        cityProfile,
        lng,
        events,
      };
    }),
  listAll: publicProcedure
    .input(
      z.object({
        style: z.string().optional(),
        type: z.string().optional(),
        start: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { type, style, start = new Date() } = input;

      const where = getWhere(start, true, [], type, style);

      const events = await prisma.event.findMany({
        cacheStrategy: {
          ttl: 60 * 5,
          swr: 60,
        },
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
        take: 5,
      });

      return {
        events,
      };
    }),
  search: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ input }) => {
      const { query } = input;

      return await prisma.event.findMany({
        include: {
          venue: true,
          organizer: true,
          styles: true,
        },
        where: {
          startDate: {
            gte: new Date(),
          },
        },
        orderBy: [
          {
            _relevance: {
              fields: ["name", "description"],
              search: query || "",
              sort: "desc",
            },
          },
          {
            startDate: "asc",
          },
        ],
        take: 5,
      });
    }),
});
