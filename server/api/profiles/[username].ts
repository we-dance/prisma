export default defineEventHandler((event) => {
  const { username } = event.context.params

  return event.context.prisma.profile.findFirst({
    where: {
      username
    },
    include: {
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
