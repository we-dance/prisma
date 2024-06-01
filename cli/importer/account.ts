import { PrismaClient } from '@prisma/client'
import { getDateOrNow } from '../utils/date'

const prisma = new PrismaClient()

export async function addAccount (account: any, user: any) {
  const existingUser = await prisma.user.findFirst({ where: { id: account.id } })
  if (!user) {
    return {
      state: 'failed',
      error: 'no_user',
      id: account.id,
      email: account.email
    }
  }
  if (existingUser) {
    return {
      state: 'ignored',
      id: existingUser.id
    }
  }

  try {
    const data = {
      id: account.id,
      name: account.name || '',
      email: account.email,
      emailVerified: user.emailVerified || false,
      hash: user.passwordHash || '',
      salt: user.salt || '',
      firebaseId: account.id,
      createdAt: getDateOrNow(account.createdAt),
      updateAt: getDateOrNow(account.updateAt),
      lastLoginAt: getDateOrNow(account.lastLoginAt)
    }
    await prisma.user.create({
      data
    })
    return {
      state: 'created',
      id: account.id
    }
  } catch (exception: any) {
    if (exception.meta?.target[0] === 'email') {
      return {
        state: 'failed',
        id: account.id,
        error: 'duplicate_email',
        email: account.email
      }
    } else {
      return {
        state: 'failed',
        id: account.id,
        error: 'invalid_prisma_account_create',
        email: account.email,
        exception
      }
    }
  }
}
