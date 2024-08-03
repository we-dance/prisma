import CyrillicToTranslit from "cyrillic-to-translit-js";
import { PrismaClient } from "@prisma/client";
import { getDateOrNow, getDateOrNull } from "../utils/date";
import lookup from "country-code-lookup";
import { getLogger } from "../utils/logger";

const prisma = new PrismaClient();

export async function addCitySubscribers(profile: any) {
  let created = 0;
  let failed = 0;
  let ignored = 0;
  const errors: any[] = [];

  const usernames = profile.watch?.usernames || [];
  for (const username of usernames) {
    const subscriberProfile = await prisma.profile.findFirst({
      where: { firebaseUsername: username, claimed: true },
    });
    if (!profile.cityPlaceId) {
      failed++;

      errors.push({
        error: "city not found",
        state: "failed",
        profileId: profile.id,
        profileUsername: profile.username,
        subscriberUsername: username,
      });

      continue;
    }
    if (!subscriberProfile?.id) {
      ignored++;

      errors.push({
        error: "subscriber not found",
        state: "ignored",
        profileId: profile.id,
        profileUsername: profile.username,
        subscriberUsername: username,
      });

      continue;
    }

    try {
      await prisma.citySubscriber.create({
        data: {
          cityId: profile.cityPlaceId,
          profileId: subscriberProfile.id,
        },
      });
    } catch (error: any) {
      if (error.code === "P2003") {
        ignored++;

        errors.push({
          state: "ignored",
          error: "subscriber duplicate",
          profileId: profile.id,
          profileUsername: profile.username,
          subscriberUsername: username,
        });
        continue;
      }
    }

    created++;
  }

  return {
    created,
    failed,
    errors,
    ignored,
  };
}

export async function addFollowers(profile: any) {
  let created = 0;
  let failed = 0;
  let ignored = 0;
  const errors: any[] = [];

  const usernames = profile.watch?.usernames || [];
  for (const username of usernames) {
    const subscriberProfile = await prisma.profile.findFirst({
      where: { firebaseUsername: username, claimed: true },
    });
    if (!subscriberProfile?.id) {
      failed++;

      errors.push({
        error: "follower not found",
        state: "failed",
        profileId: profile.id,
        profileUsername: profile.username,
        subscriberUsername: username,
      });

      continue;
    }

    if (profile.id === subscriberProfile.id) {
      ignored++;

      errors.push({
        state: "ignored",
        error: "self follower",
        profileId: profile.id,
        profileUsername: profile.username,
        subscriberUsername: username,
      });

      continue;
    }

    try {
      await prisma.profileFollower.create({
        data: {
          profileId: profile.id,
          followerId: subscriberProfile.id,
        },
      });
    } catch (error: any) {
      if (error.code === "P2003") {
        ignored++;

        errors.push({
          state: "ignored",
          error: "follower duplicate",
          profileId: profile.id,
          profileUsername: profile.username,
          subscriberUsername: username,
        });

        continue;
      }
    }

    created++;
  }

  return {
    created,
    failed,
    errors,
    ignored,
  };
}

function getCountryInternetCode(name: string) {
  const countryMap: any = {
    Türkiye: "tr",
    "Cabo Verde": "cv",
  };

  if (countryMap[name]) {
    return countryMap[name];
  }

  const countryLookup = lookup.byCountry(name);
  if (!countryLookup) {
    throw new Error(`Country not found: ${name}`);
  }

  return countryLookup.internet.toLowerCase();
}

export async function getCountryCode(name: string) {
  let country = await prisma.country.findFirst({
    where: { name },
  });

  if (country) {
    return country.code;
  }

  const code = getCountryInternetCode(name);

  country = await prisma.country.findFirst({
    where: { code },
  });

  if (country) {
    return country.code;
  }

  const result = await prisma.country.create({
    data: {
      code,
      name,
    },
  });

  return result.code;
}

export async function addCity(profile: any) {
  if (profile.username === "Travel") {
    return {
      state: "ignored",
      id: profile.id,
    };
  }

  if (!profile.location) {
    return {
      state: "failed",
      error: "city has no location",
      username: profile.username,
      cityPlaceId: profile.cityPlaceId,
      id: profile.id,
    };
  }

  if (!profile.location.country) {
    return {
      state: "failed",
      error: "city has no country",
      username: profile.username,
      cityPlaceId: profile.cityPlaceId,
      id: profile.id,
    };
  }

  if (!profile.location.locality) {
    return {
      state: "failed",
      error: "city has no locality",
      username: profile.username,
      cityPlaceId: profile.cityPlaceId,
      id: profile.id,
    };
  }

  const existingPlaceId = await prisma.city.findFirst({
    where: { id: profile.location.place_id },
  });

  if (!!existingPlaceId) {
    return {
      state: "ignored",
      id: existingPlaceId.id,
    };
  }

  const region = profile.location.region;
  const country = profile.location.country;
  const locality = profile.location.locality;

  let slug = getSlug(locality);

  let existingLocality = await prisma.city.findFirst({
    where: { slug },
  });

  if (!!existingLocality) {
    slug = getSlug([region, locality].join("-"));
  }

  let existingRegion = await prisma.city.findFirst({
    where: { slug },
  });

  if (!!existingRegion) {
    return {
      state: "failed",
      error: "slug already exists",
      id: profile.id,
    };
  }

  const data: any = {
    id: profile.location.place_id,
    name: locality,
    region,
    slug,
    countryCode: await getCountryCode(country),
    description: profile.bio,
    lat: profile.location.latitude,
    lng: profile.location.longitude,
    subscribersCount: profile.watch?.count || 0,
    viewsCount: profile.viewsCount || 0,
    createdAt: getDateOrNow(profile.createdAt),
    updatedAt: getDateOrNow(profile.updatedAt),
  };

  const result = await prisma.city.create({ data });
  return {
    state: "created",
    id: result.id,
  };
}

export function getSlug(name: string) {
  // Username must be lowercase
  let result = name.toLowerCase();

  result = CyrillicToTranslit().transform(result);

  if (result.startsWith("http") || result.startsWith("www")) {
    result = result.replace("https://", "");
    result = result.replace("http://", "");
    result = result.replace("www.", "");
    result = result.replace("m.", "");

    const domain = result.split("/")[0];

    const domainList = [
      "facebook.com",
      "instagram.com",
      "fb.me",
      "eventbrite.com",
    ];

    if (domainList.find((d) => domain.includes(d))) {
      result = result.split("/")[1];

      if (!result || result.length < 3) {
        domainList.forEach((d) => {
          result = result.replace(d, "");
        });
      }
    } else {
      result = domain;
    }
  }

  result = result.trim();

  // Replace space with dash
  result = result.replace(/ /g, "-");

  // Replace umlauts with their closest ASCII equivalent
  result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Username cannot have special characters
  result = result.replace(/[^a-z0-9._\-]/g, "");

  // Username cannot have multiple periods in a row
  result = result.replace(/\.{2,}/g, ".");

  // Username cannot end in a period
  result = result.replace(/\.$/, "");

  return result;
}

export async function getUniqueUsername(name: string, count = 1) {
  let result = getSlug(name);

  // Username must be less than 30 characters
  result = result.substring(0, 30);

  // Username must be at least 2 characters
  if (result.length < 2) {
    result += "x";
  }

  if (count > 1) {
    result = result.substring(0, 30 - count.toString().length);
    result = result + count;
    const logger = getLogger("username");
    logger.debug({ name, result });
  }

  // Username must be unique
  const existing = await prisma.profile.findFirst({
    where: { username: result },
  });

  if (existing) {
    return getUniqueUsername(name, count + 1);
  }

  return result;
}

export async function addProfile(profile: any) {
  const existingProfile = await prisma.profile.findFirst({
    where: { id: profile.id },
  });
  const exists = !!existingProfile;

  const username = await getUniqueUsername(profile.username || profile.id);

  const genderMap: any = {
    Male: "he",
    Female: "she",
    Other: "they",
  };

  const pronounce = genderMap[profile.gender || "Other"];

  const data: any = {
    id: profile.id,
    username,
    name: profile.name || username,
    firebaseUsername: profile.username || "",
    pronounce,
    bio: profile.bio || "",
    firebaseId: profile.id,
    createdAt: getDateOrNow(profile.createdAt),
    updatedAt: getDateOrNow(profile.updatedAt),
    lastLoginAt: getDateOrNull(profile.lastLoginAt),
    type: profile.type || "FanPage",
    photo: profile.photo || "",
    website: profile.website || "",
    instagram: profile.instagram || "",
    facebook: profile.facebook || "",
    viewsCount: profile.viewsCount || 0,
    followersCount: profile.watch?.count || 0,
  };

  if (profile.location) {
    data.lat = profile.location.latitude;
    data.lng = profile.location.longitude;
    data.placeId = profile.location.place_id;
  }

  if (profile.place) {
    const city = await prisma.city.findFirst({
      where: { id: profile.place },
    });
    if (city) {
      data.cityId = city.id;
    }
  }

  const user = await prisma.user.findFirst({ where: { id: profile.id } });
  if (user) {
    data.userId = profile.id;
    data.claimed = true;

    if (user.isDeleted) {
      data.isDeleted = true;
      data.deletedAt = user.deletedAt;
      data.deletedReason = user.deletedReason;
    }
  }

  if (data.lastLoginAt) {
    data.claimed = true;
  }

  if (profile.createdBy) {
    const createdBy = await prisma.user.findFirst({
      where: { id: profile.createdBy },
    });
    if (createdBy) {
      data.createdById = createdBy.id;
    }
  }

  const result = await prisma.profile.upsert({
    where: { id: profile.id },
    create: data,
    update: data,
  });

  if (!exists && profile.styles) {
    const hashtags = Object.keys(profile.styles);
    for (const hashtag of hashtags) {
      const style = await prisma.danceStyle.upsert({
        where: { hashtag },
        create: { name: hashtag, hashtag },
        update: { name: hashtag },
      });

      await prisma.experience.create({
        data: {
          profileId: result.id,
          styleId: style.id,
          level: profile.styles[hashtag].level,
          highlighted: profile.styles[hashtag].highlighted ?? true,
        },
      });
    }
  }

  return {
    state: exists ? "updated" : "created",
    id: result.id,
    username: data.username,
    oldUsername: profile.username,
  };
}
