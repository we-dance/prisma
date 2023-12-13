import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma

  let lng, lat

  const { type, dance, cityName, lng: reqLng, lat: reqLat, distance = 10000 } = getQuery(event)

  if (!reqLng) {
    const city = await prisma.profile.findFirst({
      where: {
        username: cityName
      }
    })

    lng = city.lng
    lat = city.lat
  } else {
    lng = Number(reqLng)
    lat = Number(reqLat)
  }

  const venues = await prisma.$queryRaw`
    SELECT
      ROUND(earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(lat, lng))::NUMERIC, 2) AS distance,
      id,
      name,
      photo,
      username
    FROM "Profile"
    WHERE ROUND(earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(lat, lng))::NUMERIC, 2) < ${distance}
    AND type = 'Venue'
    ORDER BY distance;
  `

  const where: any = {
    startDate: {
      gte: new Date('2023-01-01')
    },
    venue: {
      is: {
        id: {
          in: venues.map(venue => venue.id)
        }
      }
    }
  }

  if (type) {
    where.type = type
  }

  if (dance) {
    where.styles = {
      some: {
        hashtag: dance
      }
    }
  }

  const events = await prisma.event.findMany({
    where,
    include: {
      venue: true,
      organizer: true,
      styles: true
    },
    orderBy: [
      {
        startDate: 'asc'
      }
    ],
    take: 10
  })

  const organisers = await prisma.profile.findMany({
    where: {
      city: {
        is: {
          username: cityName
        }
      },
      type: 'Organiser'
    }
  })

  return {
    events, venues, organisers
  }
})
