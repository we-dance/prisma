import { PrismaClient } from '@prisma/client'
import { getDateOrNow } from '../utils/date'

const prisma = new PrismaClient()

type UserList = {
  [key: string]: Boolean | UserList;
};

function extractUsernames (obj: UserList, prefix = '') {
  let usernames: string[] = []

  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      usernames = usernames.concat(extractUsernames(obj[key] as UserList, `${key}.`))
    } else {
      usernames.push(prefix + key)
    }
  }

  return usernames
}

export async function addSubscribers (profile: any) {
  let created = 0
  let failed = 0
  const errors: any[] = []

  const usernames = extractUsernames(profile.watch?.list)
  for (const username of usernames) {
    const subscriberProfile = await prisma.profile.findFirst({ where: { username } })
    if (!subscriberProfile?.id) {
      failed++

      errors.push({
        error: 'subscriber_not_found',
        profileId: profile.id,
        profileUsername: profile.username,
        subscriberUsername: username
      })

      continue
    }

    await prisma.subscription.create({
      data: {
        profileId: profile.id,
        subscriberId: subscriberProfile.id
      }
    })

    created++
  }

  return {
    created,
    failed,
    errors
  }
}

export async function addProfile (profile: any) {
  const existingProfile = await prisma.profile.findFirst({ where: { id: profile.id } })
  const exists = !!existingProfile

  const username = profile.username || profile.id

  const data: any = {
    id: profile.id,
    username,
    name: profile.name || username,
    bio: profile.bio || '',
    firebaseId: profile.id,
    createdAt: getDateOrNow(profile.createdAt),
    updateAt: getDateOrNow(profile.updateAt),
    lastLoginAt: getDateOrNow(profile.lastLoginAt),
    type: profile.type || 'FanPage',
    photo: profile.photo || '',
    website: profile.website || '',
    instagram: profile.instagram || '',
    facebook: profile.facebook || ''
  }

  if (profile.location) {
    data.lat = profile.location.latitude
    data.lng = profile.location.longitude
    data.placeId = profile.location.place_id
  }

  if (profile.type === 'City') {
    data.placeId = profile.cityPlaceId
  }

  const city = await prisma.profile.findFirst({ where: { placeId: profile.place, type: 'City' } })
  if (city) {
    data.cityId = city.id
  }

  const user = await prisma.user.findFirst({ where: { id: profile.id } })
  if (user) {
    data.userId = profile.id
    data.claimed = true
  }

  if (profile.createdBy) {
    const createdBy = await prisma.user.findFirst({ where: { id: profile.createdBy } })
    if (createdBy) {
      data.createdById = createdBy.id
    }
  }

  const result = await prisma.profile.upsert({ where: { id: profile.id }, create: data, update: data })

  if (!exists && profile.type !== 'City' && profile.styles) {
    const hashtags = Object.keys(profile.styles)
    for (const hashtag of hashtags) {
      const style = await prisma.danceStyle.upsert({
        where: { hashtag },
        create: { name: hashtag, hashtag },
        update: { name: hashtag }
      })

      await prisma.experience.create({
        data: {
          profileId: result.id,
          styleId: style.id,
          level: profile.styles[hashtag].level,
          highlighted: profile.styles[hashtag].highlighted ?? true
        }
      })
    }
  }

  return {
    state: exists ? 'updated' : 'created',
    id: result.id
  }
}
