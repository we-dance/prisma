<template>
  <div>
    <div class="border-b pb-4 flex flex-col gap-2 bg-white rounded shadow px-4">
      <div class="flex items-start pt-4">
        <div class="w-10 flex-shrink-0">
          <div class="flex items-center space-x-1">
            <div>
              <a href="/Aina" class=""
                ><img
                  src="https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&amp;token=2fc50226-d15c-4a27-a340-0cee1e4bd868"
                  alt="Aina photo"
                  class="rounded-full w-8 h-8"
              /></a>
            </div>
          </div>
        </div>
        <div class="flex-grow">
          <div class="block text-sm leading-tight">
            <div class="flex flex-wrap space-x-1 text-xs">
              <div class="flex items-center space-x-1">
                <div>
                  <a href="/Aina" class="hover:underline font-bold">
                    Aina Kaiser
                  </a>
                </div>
              </div>
              <span>•</span>
              <div>
                <a href="/stories/AZIvGRtz0c3LFk6aqhjQ" class="hover:underline"
                  >about 1 month ago</a
                >
              </div>
            </div>
            <div class="text-xs">published article</div>
          </div>
        </div>
        <div class="relative">
          <div>
            <Button variant="ghost">
              <Icon name="i-heroicons-ellipsis-horizontal" size="24" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold">Changó: Aluya vs A La Metá Steps</h3>
      </div>
      <div class="flex flex-wrap gap-2 items-center">
        <div class="flex flex-wrap items-center bg-gray-100 rounded">
          <Button variant="ghost">
            <Icon name="material-symbols:arrow-upward-rounded" size="24" />
          </Button>
          <div class="text-sm font-medium">0</div>
          <Button variant="ghost">
            <Icon name="material-symbols:arrow-downward-rounded" size="24" />
          </Button>
        </div>
        <Button variant="ghost">
          <Icon name="i-heroicons-chat-bubble-left" size="24" />
          <span>1</span>
        </Button>
      </div>
    </div>
  </div>
</template>
