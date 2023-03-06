export default defineEventHandler(event => event.context.prisma.event.findMany())
