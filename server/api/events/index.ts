import { getQuery } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function findEventsWithinDistance(city:string, lng:number, lat:number, distanceInKm:number) {
    const events = await prisma.$queryRaw`
      SELECT * 
      FROM events 
      WHERE ST_Distance_Sphere(
        ST_MakePoint(${lng}, ${lat}),
        ST_MakePoint(venues_longitude, venues_latitude)
      ) <= ${distanceInKm * 1000}
      AND venues.city = ${city}
    `
    return events; 
}


export default defineEventHandler((event) => {
  const { username } = getQuery(event)



  return event.context.prisma.event.findMany({
    where: {
      startDate: {
        gte: new Date()
      },
      venue: {
        city: {
          username
        }
      }
    },
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
})
