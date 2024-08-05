import { PrismaClient } from "./../../node_modules/.prisma/client";
import { getDate, getDateOrNow } from "../utils/date";
import { getNormalizedString, getSlug } from "../utils/slug";

const prisma = new PrismaClient();

async function addVenue(venue: any, cityId: string, creatorProfileId: string) {
  if (!venue?.place_id) {
    return {
      state: "failed",
      error: "empty",
      id: null,
    };
  }

  const existingVenue = await prisma.profile.findFirst({
    where: { id: venue.place_id },
  });
  if (existingVenue) {
    return {
      state: "ignored",
      id: existingVenue.id,
    };
  }

  const data: any = {
    id: venue.place_id,
    name: venue.name,
    username: venue.place_id,
    bio: "",
    formattedAddress: venue.formatted_address,
    mapUrl: venue.url,
    lng: venue.geometry?.location?.lng,
    lat: venue.geometry?.location?.lat,
    placeId: venue.place_id,
    phone: venue.international_phone_number,
    type: "Venue",
  };

  const city = await prisma.profile.findFirst({
    where: { placeId: cityId, type: "City" },
  });
  if (city) {
    data.cityId = city.id;
  }

  const creator = await prisma.user.findFirst({
    where: { id: creatorProfileId },
  });
  if (creator) {
    data.createdById = creator.id;
  }

  const result = await prisma.profile.create({
    data,
  });

  return {
    state: "created",
    id: result.id,
  };
}

export async function addEvent(event: any) {
  const existingEvent = await prisma.event.findFirst({
    where: { id: event.id },
  });
  if (existingEvent) {
    return {
      state: "ignored",
      id: existingEvent.id,
    };
  }

  if (!event.name) {
    return {
      state: "failed",
      error: "no_name",
      id: event.id,
    };
  }

  if (!event.startDate) {
    return {
      state: "failed",
      error: "no_start_date",
      id: event.id,
    };
  }

  if (!event.endDate) {
    return {
      state: "failed",
      error: "no_end_date",
      id: event.id,
    };
  }

  let creatorId = "";
  if (event.createdBy) {
    const creator = await prisma.profile.findFirst({
      where: { id: event.createdBy },
    });
    if (!creator) {
      return {
        state: "failed",
        error: "creator_not_found",
        id: event.id,
        ref: event.createdBy,
      };
    }

    creatorId = creator.id;
  }

  const organizer = await prisma.profile.findFirst({
    where: { username: event.org?.username },
  });
  if (!organizer) {
    return {
      state: "failed",
      error: "organizer_not_found",
      id: event.id,
      ref: event.org?.username,
    };
  }
  const organizerId = organizer.id;

  const venueId = (await addVenue(event.venue, event.place, creatorId)).id;
  if (!venueId) {
    return {
      state: "failed",
      error: "no_venue",
      id: event.id,
      ref: event.address,
    };
  }

  const connectStyles: any[] = [];
  if (event.styles) {
    const hashtags = Object.keys(event.styles);
    for (const hashtag of hashtags) {
      const style = await prisma.danceStyle.upsert({
        where: { hashtag },
        create: { name: hashtag, hashtag },
        update: { name: hashtag },
      });

      connectStyles.push({ id: style.id });
    }
  }

  const slug = getSlug(event.name);

  const data = {
    id: event.id,
    slug,
    createdAt: getDateOrNow(event.createdAt),
    updatedAt: getDateOrNow(event.updatedAt),
    name: getNormalizedString(event.name),
    published: true,
    styles: {
      connect: connectStyles,
    },
    startDate: getDate(event.startDate),
    endDate: getDate(event.endDate),
    description: event.description || "",
    type: event.eventType,
    cover: event.cover || "",
    price: event.price || "",
    creatorId,
    organizerId,
    venueId,
    firebaseId: event.id,
  };

  try {
    const result = await prisma.event.create({
      data,
    });

    return {
      state: "created",
      id: result.id,
    };
  } catch (exception) {
    return {
      state: "failed",
      error: "invalid_prisma_event_create",
      id: event.id,
      exception,
    };
  }
}
