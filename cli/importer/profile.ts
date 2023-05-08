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
  if (!profile.watch?.list) {
    return
  }

  if (!profile.id) {
    return
  }

  const usernames = extractUsernames(profile.watch?.list)
  for (const username of usernames) {
    const subscriberProfile = await prisma.profile.findFirst({ where: { username } })
    if (!subscriberProfile) {
      console.log(`profile(@${profile.username}) #subscriber_not_found <${username}>`)
      continue
    }

    if (!subscriberProfile.id) {
      continue
    }

    await prisma.subscription.create({
      data: {
        profileId: profile.id,
        subscriberId: subscriberProfile.id
      }
    })
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
    type: profile.type,
    photo: profile.photo || '',
    website: profile.website || '',
    instagram: profile.instagram || '',
    facebook: profile.facebook || ''
  }

  if (profile.type === 'City') {
    data.placeId = profile.cityPlaceId
  }

  const city = await prisma.profile.findFirst({ where: { placeId: profile.place, type: 'City' } })
  if (city) {
    data.cityId = city.id
  }

  const account = await prisma.account.findFirst({ where: { id: profile.id } })
  if (account) {
    data.accountId = profile.id
    data.claimed = true
  }

  if (profile.createdBy) {
    const createdBy = await prisma.account.findFirst({ where: { id: profile.createdBy } })
    if (createdBy) {
      data.createdById = createdBy.id
    } else {
      console.log(`profile(${profile.id} @${profile.username}): creator(${profile.createdBy}) not found`)
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
