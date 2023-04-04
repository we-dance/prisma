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
  ]
}))
