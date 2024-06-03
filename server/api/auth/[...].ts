import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { FirebaseScrypt } from "firebase-scrypt";
import { NuxtAuthHandler } from "#auth";
import * as z from "zod";

const prisma = new PrismaClient();

const firebaseParameters = {
  memCost: 14,
  rounds: 8,
  saltSeparator: String(process.env.FIREBASE_SALT_SEPARATOR),
  signerKey: String(process.env.FIREBASE_SIGNER_KEY),
};

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session: async ({ session }) => {
      const email = session.user.email;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const scrypt = new FirebaseScrypt(firebaseParameters);

        const isValid = await scrypt.verify(
          credentials.password,
          user.salt,
          user.hash
        );

        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
    CredentialsProvider.default({
      id: "register",
      name: "register",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(input: any) {
        const schema = z.object({
          username: z.string().min(2).max(50),
          email: z.string().email(),
          password: z.string().min(8),
        });

        const result = schema.safeParse(input);

        if (!result.success) {
          const errorMessages = result.error.errors
            .map((err) => `${err.path.join(".")}: ${err.message}`)
            .join(", ");
          throw new Error(`Validation error: ${errorMessages}`);
        }

        const credentials = result.data;

        const scrypt = new FirebaseScrypt(firebaseParameters);
        const salt = Buffer.from(String(Math.random()).slice(7)).toString(
          "base64"
        );

        const hash = await scrypt.hash(credentials.password, salt);

        let user;
        try {
          user = await prisma.user.create({
            data: {
              name: credentials.username,
              email: credentials.email,
              hash,
              salt,
            },
          });
        } catch (error: any) {
          if (error.code === "P2002") {
            throw new Error("Email already in use");
          }

          throw error;
        }

        let profile;
        try {
          profile = await prisma.profile.create({
            data: {
              username: credentials.username,
              bio: "",
              name: credentials.username,
              type: "Dancer",
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          });
        } catch (error: any) {
          throw error;
        }

        return user;
      },
    }),
  ],
});
