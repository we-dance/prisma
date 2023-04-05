import { PrismaClient } from '@prisma/client'
import { getDateOrNow } from '../utils/date'

const prisma = new PrismaClient()

export async function addAccount (account: any) {
  const existingAccount = await prisma.account.findFirst({ where: { id: account.id } })
  if (existingAccount) {
    return {
      state: 'exists',
      id: existingAccount.id
    }
  }

  try {
    const data = {
      id: account.id,
      name: account.name || '',
      email: account.email,
      firebaseId: account.id,
      createdAt: getDateOrNow(account.createdAt),
      updateAt: getDateOrNow(account.updateAt),
      lastLoginAt: getDateOrNow(account.lastLoginAt)
    }
    await prisma.account.create({
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
        ref: account.email
      }
    } else {
      return {
        state: 'failed',
        id: account.id,
        error: 'invalid_prisma_account_create',
        exception
      }
    }
  }
}
