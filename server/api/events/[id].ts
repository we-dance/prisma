export default defineEventHandler((event) => {
  const { id } = event.context.params

  return event.context.prisma.event.findFirst({
    where: {
      id
    },
    include: {
      venue: true,
      organizer: true,
      styles: true
    }
  })
})
