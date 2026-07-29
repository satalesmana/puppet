import { connectDB } from '~/server/utils/connectDB'

export default defineEventHandler(async (event) => {
  // Skip static assets if necessary
  const path = getRequestURL(event).pathname

  if (
    path.startsWith('/_nuxt') ||
    path.startsWith('/favicon') ||
    path.startsWith('/public')
  ) {
    return
  }

  await connectDB()
})
