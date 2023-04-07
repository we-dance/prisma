export default defineEventHandler((event) => {
  const { username } = event.context.params

  return event.context.prisma.profile.findFirst({
    where: {
      username
    },
    include: {
      _count: {
        select: {
          subscribers: true
        }
      },
      eventsCreated: {
        take: 5,
        orderBy: [
          {
            startDate: 'desc'
          }
        ]
      }
    }
  })
})
