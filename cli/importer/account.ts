import { PrismaClient } from "./../../node_modules/.prisma/client";
import { getDateOrNow, getDateOrNull } from "../utils/date";

const prisma = new PrismaClient();

export async function exportAccounts() {
  const users = await prisma.user.findMany({
    where: { isDeleted: false },
    include: { profile: true },
  });
  let output = "id;name;email";

  for (const user of users) {
    output += `\n${user.id};${
      user.name || user.profile?.name || user.profile?.username
    };${user.email}`;
  }

  return output;
}

export async function addAccount(account: any, user: any, suspended: any) {
  const existingUser = await prisma.user.findFirst({
    where: { id: account.id },
  });
  if (!user) {
    return {
      state: "failed",
      error: "no_user",
      id: account.id,
      email: account.email,
    };
  }
  if (existingUser) {
    return {
      state: "ignored",
      id: existingUser.id,
    };
  }

  try {
    const data = {
      id: account.id,
      name: account.name || "",
      email: account.email,
      emailVerified: user.emailVerified || false,
      hash: user.passwordHash || "",
      salt: user.salt || "",
      firebaseId: account.id,
      createdAt: getDateOrNow(account.createdAt),
      updatedAt: getDateOrNow(account.updatedAt),
      lastLoginAt: getDateOrNow(account.lastLoginAt),
      isDeleted: !!suspended,
      deletedAt: getDateOrNull(suspended?.deletedAt),
      deletedReason: suspended?.reason || "",
    };
    await prisma.user.create({
      data,
    });
    return {
      state: "created",
      id: account.id,
    };
  } catch (exception: any) {
    if (exception.meta?.target[0] === "email") {
      return {
        state: "failed",
        id: account.id,
        error: "duplicate_email",
        email: account.email,
      };
    }
    throw exception;
  }
}
