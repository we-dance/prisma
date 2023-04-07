import { getQuery } from 'h3'

export default defineEventHandler((event) => {
  const { type } = getQuery(event)

  return event.context.prisma.profile.findMany({
    where: {
      type
    },
    include: {
      _count: {
        select: {
          profiles: true
        }
      }
    },
    orderBy: {
      profiles: {
        _count: 'desc'
      }
    },
    take: 100
  })
})
