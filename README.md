# prisma-app

This is a [sidebase merino](https://sidebase.io/) app created by running `npm create sidebase@latest`. This project uses the following technologies for a great developer- and user-experience:

-   [TypeScript](https://www.typescriptlang.org/)
-   [Nuxt 3](https://nuxt.com)
-   Prisma ORM
-   nuxt-auth
-   tRPC 10
-   Tailwind CSS
-   Naive UI
-   GitHub Actions based CI

## How to get going?

This is a straight-forward setup with minimal templating and scaffolding. The options you selected during the sidebase CLI setup are all here though. Good places to continue reading are:

-   [the First Steps documentation](https://sidebase.io/sidebase/usage)
-   [our discord](https://discord.gg/auc8eCeGzx)

Some tasks you should probably do in the beginning are:

-   [ ] replace this generic README with a more specific one
-   [ ] install the Vue Volar extension
-   [ ] enable [Volar takeover mode](https://nuxt.com/docs/getting-started/installation#prerequisites) to ensure a smooth editor setup
-   [ ] Prisma: Edit your `prisma/prisma.schema` to your liking
-   [ ] Prisma: Run `npx prisma db push` to sync the schema to your database after changing the schema
-   [ ] Prisma: Run `npx prisma generate` to re-generate the client after changing the schema
-   [ ] Auth: Configure your auth providers to the [NuxtAuthHandler](./server/api/auth/[...].ts)
-   [ ] Auth, optional: Enable global protection by setting `enableGlobalAppMiddleware: true` in [your nuxt.config.ts](./nuxt.config.ts). Delete the logal middleware in the [protected.vue](./pages/protected.vue) page if you do

### Setup

Make sure to install the dependencies:

```bash
npm install
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

# AWS Lambda deployment example

[Deployment Guide](https://www.prisma.io/docs/guides/deployment/deploying-to-aws-lambda)

## Download manually

```bash
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/deployment-platforms/aws-lambda
cd aws-lambda
```

The Serverless configuration file includes a package pattern that excludes all Prisma Engine binaries but the one relevant for the Lambda runtime. You can read more in our [documentation](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-aws-lambda#package-pattern-in-serverlessyml).
