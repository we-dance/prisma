import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { title } = await readBody(event)

  await event.context.prisma.event.create({
    data: {
      createdAt: new Date(),
      title,
      authorId: 1
    }
  })

  return {
    success: true
  }
})
