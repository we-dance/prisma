import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../prisma";
import { Client, AddressType } from "@googlemaps/google-maps-services-js";

async function getSlug(locality: string, region?: string): Promise<string> {
  let slug = locality
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const existingLocality = await prisma.city.findFirst({
    where: { slug },
  });

  if (existingLocality && region) {
    slug = `${region}-${locality}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  const existingRegion = await prisma.city.findFirst({
    where: { slug },
  });

  if (existingRegion) {
    let counter = 1;
    while (
      await prisma.city.findFirst({ where: { slug: `${slug}-${counter}` } })
    ) {
      counter++;
    }
    slug = `${slug}-${counter}`;
  }

  return slug;
}

export const citiesRouter = router({
  search: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        countryCode: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { query, countryCode } = input;

      const countries = await prisma.country.findMany();

      let where: any = {};
      if (countryCode) {
        where.countryCode = {
          equals: countryCode,
        };
      }

      if (query) {
        where.OR = [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            slug: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            region: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            country: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ];
      }

      const cities = await prisma.city.findMany({
        include: {
          country: true,
        },

        where,

        orderBy: {
          membersCount: "desc",
        },
        take: 5,
      });

      return {
        countries,
        cities,
      };
    }),

  getOrCreateSlug: publicProcedure
    .input(
      z.object({
        placeId: z.string(),
        label: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { placeId, label } = input;

      let city = await prisma.city.findUnique({
        where: { placeId },
        select: { slug: true },
      });

      if (city) {
        return { slug: city.slug };
      }

      const client = new Client({});
      try {
        const response = await client.placeDetails({
          params: {
            place_id: placeId,
            key: useRuntimeConfig().googleMapsApiKeyBackend,
            language: "en" as const,
          },
          timeout: 5000,
        });

        if (!response.data.result) {
          throw new Error("No results found for the given place ID");
        }

        const result = response.data.result;
        const country = result.address_components?.find((component) =>
          component.types.includes(AddressType.country)
        );
        const countryCode = country?.short_name ?? "";

        const region =
          result.address_components?.find((component) =>
            component.types.includes(AddressType.administrative_area_level_1)
          )?.long_name ?? "";

        const cityName =
          result.address_components?.find((component) =>
            component.types.includes(AddressType.locality)
          )?.long_name ?? label;

        const slug = await getSlug(cityName, region);

        city = await prisma.city.create({
          data: {
            placeId,
            name: cityName,
            region,
            slug,
            lat: result.geometry?.location.lat ?? 0,
            lng: result.geometry?.location.lng ?? 0,
            country: {
              connectOrCreate: {
                where: { code: countryCode },
                create: {
                  code: countryCode,
                  name: country?.long_name ?? "",
                },
              },
            },
          },
          select: { slug: true },
        });

        return { slug: city.slug };
      } catch (error) {
        console.error("Google Maps API error:", error);

        if (error instanceof Error) {
          throw new Error(`Google Maps API error: ${error.message}`);
        } else {
          throw new Error(
            "Unknown error occurred while fetching place details"
          );
        }
      }
    }),
});
