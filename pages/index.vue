<template>
  <div>
    <h1 class="text-4xl">
      Welcome to your sidebase app!
    </h1>
    <p>
      Checkout the Prisma ORM demo page here:
      <nuxt-link to="/prisma" class="underline text-blue">
        Click me to test the Prisma ORM setup!
      </nuxt-link>
    </p>
    <p>
      Checkout the page protected by `nuxt-auth` here:
      <nuxt-link to="/protected" class="underline text-blue">
        Click me to test the auth setup!
      </nuxt-link>
    </p>
    <p>
      Checkout the tRPC demo page here:
      <nuxt-link to="/trpc" class="underline text-blue">
        Click me to test the tRPC setup!
      </nuxt-link>
    </p>
  </div>
</template>
