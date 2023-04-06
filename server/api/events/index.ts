import { getQuery } from 'h3'

export default defineEventHandler((event) => {
  const { startDate, endDate } = getQuery(event)

  return event.context.prisma.event.findMany({
    where: {
      startDate: {
        gte: new Date(startDate)
      },
      endDate: {
        lte: new Date(endDate)
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
    take: 100
  })
})
