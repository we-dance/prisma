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
    SELECT ROUND(earth_distance(ll_to_earth(${lng}, ${lat}), ll_to_earth(lat, lng))::NUMERIC, 2) AS distance, id FROM "Profile"
    WHERE earth_distance(ll_to_earth(${lng}, ${lat}), ll_to_earth(lat, lng)) < ${distance}
    ORDER BY distance;
  `

  const where: any = {
    startDate: {
      gte: new Date()
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

  const eventsWithDistance = events.map(event => ({
    ...event,
    distance: venues.find(venue => venue.id === event.venue.id).distance
  }))

  return eventsWithDistance
})
