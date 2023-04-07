import { getQuery } from 'h3'

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
