<template>
  <section
    class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header pb-8 page-header"
  >
    <h1
      class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-tight"
    >
      Choose Your Dance
    </h1>
    <span class="max-w-[750px] text-center text-lg font-light text-foreground">
      Discover the most popular dances and select your favorite
    </span>

    <Carousel class="relative w-full max-w-md">
      <CarouselContent>
        <CarouselItem v-for="(_, index) in 5" :key="index">
          <div class="p-1">
            <Card class="overflow-hidden">
              <CardContent class="flex justify-center p-0">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/4nJfpQ3kCbw?si=jxXE6G0CnC7n4Y3f"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </CardContent>
              <CardHeader class="gap-y-0">
                <CardTitle> Bachata </CardTitle>
                <CardDescription>
                  <div class="text-xs mb-2">30 members • 200 events</div>
                  The Cuban danzón of the 1890s was refashioned into the Cuban
                  son of the 1920s by the incorporation of more Afro-Cuban dance
                  elements—such as hip isolation, the tornillo (a man’s pivot on
                  a single foot as he fully flexes the support leg)—and the
                  discarding the descanso
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Join Community</Button>
              </CardFooter>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </section>
</template>
