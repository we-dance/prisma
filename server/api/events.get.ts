export default defineEventHandler(event => event.context.prisma.event.findMany({
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
  where: {
    startDate: {
      gte: new Date('2023-04-03')
    },
    endDate: {
      lte: new Date('2023-04-09')
    }
  },
  take: 100
}))
