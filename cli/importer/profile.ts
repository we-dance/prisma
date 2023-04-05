import { PrismaClient } from '@prisma/client'
import { getDateOrNow } from '../utils/date'

const prisma = new PrismaClient()

export async function addProfile (profile: any) {
  const existingProfile = await prisma.profile.findFirst({ where: { id: profile.id } })
  if (existingProfile) {
    return {
      state: 'exists',
      id: existingProfile.id
    }
  }

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

  const result = await prisma.profile.create({ data })

  return {
    state: 'created',
    id: result.id
  }
}
