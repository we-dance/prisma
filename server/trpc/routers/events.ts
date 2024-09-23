import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";
import { TRPCError } from "@trpc/server";

async function loadCity(
  cityCode?: string,
  reqLng?: number,
  reqLat?: number,
  distance?: number
) {
  let venues = [];

  const { lng, lat, city } = await getCoordinates(cityCode, reqLng, reqLat);

  if (lng && lat && distance) {
    venues = await getVenues(lat, lng, distance);
  }

  return {
    city,
    lng,
    lat,
    venues,
  };
}

async function getCoordinates(
  cityCode?: string,
  reqLng?: number,
  reqLat?: number
) {
  let city;
  let lng;
  let lat;

  if (cityCode) {
    console.log("cityCode", cityCode);
    city = await prisma.city.findFirst({
      where: {
        slug: cityCode,
      },
    });

    if (city) {
      lng = city.lng;
      lat = city.lat;
    }
  }

  if (reqLng && reqLat && !lng) {
    lng = reqLng;
    lat = reqLat;
  }

  return {
    city,
    lng,
    lat,
  };
}

function getWhere(
  start: string,
  anywhere = false,
  venues: any[],
  type?: string[],
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
    where.type = {
      in: type,
    };
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
          venue: {
            include: {
              city: true,
            },
          },
          organizer: true,
          styles: true,
          guests: {
            include: {
              profile: true,
            },
          },
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
  overview: publicProcedure
    .input(
      z.object({
        city: z.string().optional(),
        country: z.string().optional(),
        start: z.string(),
        style: z.string().optional(),
        distance: z.number().optional(),
        lat: z.number().optional(),
        lng: z.number().optional(),
        type: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const {
        type,
        style,
        city: cityCode,
        lng: reqLng,
        lat: reqLat,
        start,
        distance = 10000,
      } = input;

      const { lng, lat, city, venues } = await loadCity(
        cityCode,
        reqLng,
        reqLat,
        distance
      );

      const festivalTypes = ["Festival", "Congress", "Weekender"];
      const courseTypes = [
        "Course",
        "Workshop",
        "Festival",
        "Congress",
        "Weekender",
      ];
      const partyTypes = [
        "Party",
        "Other",
        "Show",
        "Concert",
        "Festival",
        "Congress",
        "Weekender",
      ];

      const parties = await prisma.event.findMany({
        cacheStrategy: {
          ttl: 60 * 5,
          swr: 60,
        },
        where: getWhere(start, !city, venues, partyTypes, style),
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

      const classes = await prisma.event.findMany({
        cacheStrategy: {
          ttl: 60 * 5,
          swr: 60,
        },
        where: getWhere(start, !city, venues, courseTypes, style),
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

      const festivals = await prisma.event.findMany({
        cacheStrategy: {
          ttl: 60 * 5,
          swr: 60,
        },
        where: getWhere(start, true, [], festivalTypes, style),
        include: {
          venue: {
            include: {
              city: true,
            },
          },
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
        city,
        lat,
        lng,
        festivals,
        parties,
        classes,
      };
    }),
  list: publicProcedure
    .input(
      z.object({
        city: z.string().optional(),
        country: z.string().optional(),
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

      const events = await prisma.event.findMany({
        cacheStrategy: {
          ttl: 60 * 5,
          swr: 60,
        },
        where: getWhere(start, false, venues, type, style),
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
