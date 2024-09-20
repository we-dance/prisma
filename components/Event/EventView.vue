<script setup>
import { formatDate } from "~/utils/date";
const { t, d } = useI18n();

function can() {
  return true;
}

function isAdmin() {
  return true;
}

defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <div v-if="event.cover" class="relative overflow-hidden rounded-t-md">
      <img :src="event.cover" :alt="event.name" class="w-full" />
    </div>
    <div class="p-4 flex gap-2 border-b border-t">
      <div class="text-center pt-2">
        <div class="text-xl font-bold leading-none text-primary">
          {{ formatDate(event.startDate, "d") }}
        </div>
        <div class="w-12 text-sm">
          {{ formatDate(event.startDate, "MMM") }}
        </div>
        <div class="w-12 text-xs">
          {{ formatDate(event.startDate, "yyyy") }}
        </div>
      </div>
      <div>
        <div class="flex gap-1 text-xs uppercase">
          <div class="text-primary">
            {{ event.type }}
          </div>
          <div>·</div>
          <div>
            {{ event.styles.map((style) => style.name).join(" • ") }}
          </div>
        </div>
        <h1 class="text-2xl font-bold leading-none">{{ event.name }}</h1>
        <div class="mt-1 flex gap-1 text-xs">
          <div>
            {{ formatDate(event.startDate, "iii") }}
          </div>
          <div>
            {{ formatDate(event.startDate, "HH:mm") }}
            <span v-if="event.endDate">
              &mdash; {{ formatDate(event.endDate, "HH:mm") }}</span
            >
          </div>
          <div>·</div>
          <div>
            {{ t("guests", guestCount, { count: guestCount }) }}
          </div>
          <div>·</div>
          <div>
            {{ t("views", event.viewsCount, { count: event.viewsCount }) }}
          </div>
        </div>
      </div>
    </div>
    <a
      v-if="event.venue"
      :href="event.venue.url"
      target="_blank"
      class="cursor-pointer block border-b py-2 px-4 hover:bg-gray-200"
      @click="$track('event_open_map')"
    >
      <div class="flex items-center justify-start leading-tight">
        <Icon name="heroicons-outline:location-marker" class="mr-4 h-4 w-4" />
        <div>
          <h4 class="font-bold">
            {{ event.venue?.name
            }}<span v-if="event.venue?.room"> • {{ event.venue.room }}</span>
          </h4>
          <div class="text-gray-700">
            {{ event.venue?.formatted_address }}
          </div>
        </div>
      </div>
    </a>

    <div
      v-if="event.online === 'Yes'"
      class="flex w-full items-center justify-start border-b py-2 px-4 leading-tight"
    >
      <TIcon name="youtube" class="mr-4 h-4 w-4" />
      <div>{{ t("eventView.online") }}</div>
    </div>

    <div
      v-if="event.price || event.link"
      class="flex w-full items-center justify-start border-b py-2 px-4 leading-tight"
    >
      <TIcon name="ticket" class="mr-4 h-4 w-4" />
      <div class="flex w-full justify-between items-center">
        <div>{{ event.price }}</div>
        <div>
          <template v-if="event.link">
            <TButton
              v-if="event.link.includes('https://www.tickettailor.com/')"
              type="link"
              class="text-xs text-primary hover:no-underline"
              :label="t('event.getTicket')"
              @click="ticketTailorPopup = true"
            />
            <TButton
              v-else
              type="link"
              :href="event.link"
              target="_blank"
              class="text-xs text-primary hover:no-underline"
              :label="t('event.getTicket')"
            />
          </template>
        </div>
      </div>
    </div>
    <div
      v-if="event.limit"
      class="flex w-full items-center justify-start border-b py-2 px-4 leading-tight"
    >
      <UserGroupIcon class="mr-4 w-4 text-black" />
      <div class="flex w-full justify-between items-center">
        <div v-if="eventLimit.roleBased">
          {{ t("event.limitRoles", eventLimit) }}
        </div>
        <div v-else>
          {{ t("event.limitTotal", eventLimit) }}
        </div>
      </div>
    </div>
    <WTeaser
      v-if="event.lottery"
      title="Dance Lottery"
      button="Win Ticket"
      :href="event.lottery"
      class="w-full"
      background="bg-red-100"
    />
    <div
      v-if="event.specialOffer"
      class="flex w-full items-center justify-start border-b py-2 px-4 leading-tight"
    >
      <TIcon name="fire" class="mr-4 h-4 w-4 text-primary" />
      <div class="flex w-full justify-between text-primary">
        <div>{{ event.specialOffer }}</div>
      </div>
    </div>

    <div id="tabs" class="grid grid-cols-3 gap-4 max-w-4xl mx-auto p-4">
      <a
        href="#reviews"
        class="p-4 space-y-1 bg-light rounded shadow"
        @click="$track('event_see_reviews')"
      >
        <h3 class="text-2xl font-extrabold text-center">
          {{ reviewsAvg ? reviewsAvg : "" }}★
        </h3>
        <p v-if="reviewsCount" class="text-center text-xs">
          {{ reviewsCount }} reviews
        </p>
        <p v-else class="text-center text-xs">Recommend</p>
      </a>
      <a
        v-if="
          can('edit', 'events', doc) || (event.artists && event.artists.length)
        "
        href="#artists"
        class="p-4 space-y-1 bg-light rounded shadow"
        @click="$track('event_see_artists')"
      >
        <h3 class="text-2xl font-extrabold text-center">
          {{ event.artists ? event.artists.length || "?" : "?" }}
        </h3>
        <p class="text-center text-xs">Artists</p>
      </a>
      <a
        href="#guests"
        class="p-4 space-y-1 bg-light rounded shadow"
        @click="$track('event_see_guests')"
      >
        <h3 class="text-2xl font-extrabold text-center">
          {{
            event.star && event.star.usernames ? event.star.usernames.length : 0
          }}
        </h3>
        <p class="text-center text-xs">Guests</p>
      </a>
    </div>

    <div class="flex w-full justify-between text-xs text-center p-4 pb-0">
      <div>{{ t("event.attendCallToAction") }}</div>
    </div>

    <div
      class="top-0 z-40 flex flex-wrap justify-center items-center gap-2 bg-white p-4 shadow"
      :class="can('edit', 'events', doc) ? '' : 'sticky'"
    >
      <TReaction
        type="primary"
        toggled-class="bg-green-500 hover:bg-green-800"
        :label="t('event.attend')"
        :toggled-label="t('event.attending')"
        icon="CheckIcon"
        toggled-icon="CheckIcon"
        field="star"
        class="rounded-full"
        hide-count
        :item="doc"
      />
      <TEventBookmark
        :event-id="event.id"
        :event="doc"
        show-label
        type="secondary"
        :label="t('event.save')"
        :toggled-label="t('event.saved')"
        size="4"
      />
      <TDropdown>
        <TButton
          type="context"
          :href="calendarLink"
          label="Add to Google Calendar"
          class="text-xs"
          @click="$track('event_add_to_calendar')"
        />

        <TCardActions
          :id="event.id"
          collection="events"
          :item="doc"
          type="context"
          icon=""
          @click="$track('event_report')"
        />
      </TDropdown>
    </div>
    <div v-if="isGoing" class="border-b border-t bg-white p-4">
      <TPreview v-if="event.confirmation" :content="event.confirmation" />

      <div class="flex flex-col md:flex-row justify-center items-center gap-2">
        <TButton
          v-if="event.paypal"
          icon="favorite"
          :href="event.paypal"
          :label="t('event.paypal.action')"
        />
      </div>
    </div>

    <TPopup
      v-if="ticketTailorPopup"
      title="Buy Ticket"
      @close="ticketTailorPopup = false"
    >
      <WTicketTailor :href="event.link" />
    </TPopup>

    <div class="grid grid-cols-1">
      <div class="md:border-l">
        <div
          v-if="can('edit', 'events', doc)"
          class="space-y-2 p-4 border-b bg-orange-100"
        >
          <h3 class="text-xs font-bold uppercase">Moderator Tools</h3>
          <div class="flex flex-wrap gap-2">
            <TButton
              type="secondary"
              icon="edit"
              :to="localePath(`/events/${event.id}/edit`)"
              :label="t('eventView.dropdown.edit')"
            />

            <TButton
              v-if="event.seriesId"
              type="secondary"
              icon="edit"
              :to="localePath(`/events/${event.seriesId}/edit`)"
              label="Edit Series"
            />

            <TButton
              type="secondary"
              icon="copy"
              :to="localePath(`/events/${event.id}/copy`)"
              :label="t('eventView.dropdown.copy')"
            />

            <TButton
              v-if="can('edit', 'events', doc)"
              type="secondary"
              icon="delete"
              label="Delete"
              @click="deleteEvent()"
            />
          </div>
          <div v-if="event.promotion !== 'completed'" class="text-sm">
            Promote event for free on WeDance Instagram.
            <div v-if="event.promotion === 'failed'">
              <div class="text-red-500">
                Promotion failed: {{ event.promotionError }}
              </div>
              <div>
                Please
                <a
                  class="underline text-primary"
                  href="mailto:support@wedance.vip"
                  >contact support</a
                >
                to resolve the issue.
              </div>
            </div>
          </div>

          <TButton
            v-if="event.promotion === 'requested'"
            label="Promoting..."
            class="rounded-full"
          />
          <div v-else-if="event.promotion === 'completed'" class="text-sm">
            Event announcement is published on
            <a class="underline text-primary" :href="event.instagram.messageUrl"
              >Instagram</a
            >
          </div>
          <TButton
            v-else
            icon="trending"
            label="Promote"
            class="rounded-full"
            @click="
              softUpdate(event.id, {
                promotion: 'requested',
              });
              $track('event_promote');
            "
          />
          <TButton
            v-if="isAdmin() && event.promotion === 'completed'"
            label="Reset"
            class="rounded-full"
            @click="
              softUpdate(event.id, {
                promotion: '',
              })
            "
          />
        </div>
      </div>
    </div>

    <section class="p-4 border-t border-primary">
      <div class="space-y-2">
        <div class="flex justify-between">
          <h3 class="uppercase text-xs text-primary font-extrabold">Updates</h3>
          <TButton
            :label="
              can('edit', 'events', doc) ? 'Post an update' : 'Ask a question'
            "
            @click="
              addComment = true;
              can('edit', 'events', doc)
                ? $track('event_post_update')
                : $track('event_ask_question');
            "
          />
        </div>

        <TCommentsInline
          :item="doc"
          autoload
          :hide-form="!addComment"
          placeholder="Share an update or ask a question"
        />
      </div>
    </section>

    <section
      v-if="
        event.org &&
        (!venueProfile || event.org.username !== venueProfile.username)
      "
      id="organiser"
      class="p-4 border-t border-primary"
    >
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">Organiser</h3>
        <WProfile
          :username="event.org.username"
          :fallback="event.org"
          hide-role
          class="border-none"
        />
      </div>
    </section>

    <section v-if="venueProfile" id="venue" class="p-4 border-t border-primary">
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">Venue</h3>
        <WProfile
          :username="venueProfile.username"
          :fallback="venueProfile"
          hide-role
          class="border-none"
        />

        <div>
          <div v-if="event.venue && event.venue.map" class="bg-gray-100 p-4">
            <div class="mb-4 text-sm font-bold leading-none text-gray-700">
              {{ t("eventView.venueMap") }}
            </div>
            <img :src="event.venue.map" alt="Venue Map" class="mt-4" />
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="event.description"
      id="about"
      class="p-4 border-t border-primary"
    >
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">About</h3>
        <TPreview :content="event.description" />
      </div>
    </section>

    <section id="artists" class="p-4 border-t border-primary">
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">
          {{ t("event.artists") }}
        </h3>
        <TButton
          v-if="can('edit', 'events', doc)"
          type="primary"
          label="Edit Artists"
          @click="editingArtists = true"
        />
        <TPopup
          v-if="editingArtists"
          title="Edit Artists"
          @close="editingArtists = false"
        >
          <div class="max-w-md max-h-[80vh] py-4 overflow-y-scroll">
            <TInputArray
              v-model="artists"
              :children="{ component: 'TInputProfile' }"
            />
            <div class="flex justify-end mt-4">
              <TButton
                type="primary"
                label="Save"
                @click="saveArtists(artists)"
              />
            </div>
          </div>
        </TPopup>
        <div v-else-if="event.artists && event.artists.length">
          <div
            v-for="profile in event.artists"
            :key="`artist-${profile.username}`"
          >
            <WProfile
              v-if="profile"
              :username="profile.username"
              :fallback="profile"
              hide-role
            />
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="(agenda && agenda.items) || can('edit', 'events', doc)"
      id="program"
      class="p-4 border-t border-primary"
    >
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">Program</h3>
        <TAgendaEditor
          v-model="agenda"
          :editor="can('edit', 'events', doc)"
          :parent="doc"
          @save="saveAgenda(agenda)"
        />
      </div>
    </section>

    <section id="guests" class="p-4 border-t border-primary">
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">
          {{ t("event.guests") }}
        </h3>

        <div v-if="event.star && event.star.usernames">
          <div
            v-if="guests.followersCount || guests.leadersCount"
            class="text-xs pt-0"
          >
            <span>{{
              t("followersCount", guests.followersCount, {
                count: guests.followersCount,
              })
            }}</span>
            <span>·</span>
            <span>{{
              t("leadersCount", guests.leadersCount, {
                count: guests.leadersCount,
              })
            }}</span>
            <span>·</span>
            <span v-if="can('edit', 'events', doc) && event.checkin">
              Present: {{ event.checkin.count || 0 }}
            </span>
          </div>
          <div v-if="!uid" class="flex justify-center p-4">
            <TButton
              type="link"
              allow-guests
              :to="localePath(`/signin?target=${$route.path}`)"
              >{{ t("event.guestsHidden") }}</TButton
            >
          </div>
          <div v-else>
            <div
              v-for="username in event.star.usernames"
              :key="`guest-${username}`"
            >
              <WProfile :username="username">
                <div v-if="can('edit', 'events', doc)" slot="actions">
                  <TReaction
                    :username="username"
                    type="primary"
                    toggled-class="bg-green-500 hover:bg-green-800"
                    icon="PlusIcon"
                    toggled-icon="CheckIcon"
                    field="checkin"
                    class="rounded-full"
                    hide-count
                    :item="doc"
                  />
                </div>
              </WProfile>
            </div>
            <div v-if="!event.star.count">There are no other guests yet.</div>
          </div>
        </div>
        <div v-else class="text-xs text-center">There are no guests yet</div>
      </div>
    </section>

    <section id="reviews" class="p-4 border-t border-primary">
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">Sponsored</h3>
        <AdEventView track="event_click_ad" />
      </div>
    </section>

    <section
      v-if="event.org && event.org.username"
      id="reviews"
      class="p-4 border-t border-primary"
    >
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">Reviews</h3>
        <TReviewList :profile="event.org" :reviews="reviews" />
      </div>
    </section>

    <section
      v-if="event.org && event.org.username"
      id="reviews"
      class="p-4 border-t border-primary"
    >
      <div class="space-y-2">
        <h3 class="uppercase text-xs text-primary font-extrabold">Source</h3>
        <div class="flex flex-col gap-4">
          <template v-if="isAdmin()">
            <div
              v-for="item in history"
              :key="item.date + item.username"
              class="text-xs"
            >
              <TAvatar photo name :uid="item.uid">
                <span>•</span>
                <div>{{ dateDiff(item.date) }}</div>
                <template v-if="item.invitedBy">
                  <span>•</span>
                  <TAvatar photo name :uid="item.invitedBy" />
                </template>
              </TAvatar>
              <div class="mt-1 text-xs text-gray-700">
                {{ item.action }} the event
              </div>
            </div>
          </template>

          <div v-if="event.updatedBy" class="text-xs">
            <TAvatar photo name :uid="event.updatedBy">
              <span>•</span>
              <div>{{ dateDiff(event.updatedAt) }}</div>
            </TAvatar>
            <div class="mt-1 text-xs text-gray-700">updated the event</div>
          </div>

          <TEventCreator :doc="doc" />
        </div>
      </div>
    </section>

    <TPopup
      v-if="announcementPopupVisible"
      title="Promote for free"
      @close="announcementPopupVisible = false"
    >
      <div class="w-64 space-y-2 py-4">
        <TButton
          v-if="event.telegram && event.telegram.messageUrl"
          allow-guests
          :href="event.telegram.messageUrl"
          label="Telegram"
          type="nav"
        />
        <TButton
          v-if="event.instagram && event.instagram.messageUrl"
          allow-guests
          :href="event.instagram.messageUrl"
          label="Instagram"
          type="nav"
        />

        <template v-if="can('edit', 'events', doc)">
          <TButton
            v-if="!event.telegram || !event.telegram.state"
            label="Promote on Telegram"
            type="nav"
            @click="
              softUpdate(event.id, {
                telegram: { state: 'requested', requestedAt: +new Date() },
              })
            "
          />
          <TButton
            v-else-if="event.telegram && event.telegram.state === 'requested'"
            label="Telegram..."
            type="nav"
          />

          <TButton
            v-if="!event.instagram || !event.instagram.state"
            label="Promote on Instagram"
            type="nav"
            @click="
              softUpdate(event.id, {
                instagram: { state: 'requested', requestedAt: +new Date() },
              })
            "
          />
          <TButton
            v-else-if="event.instagram && event.instagram.state === 'requested'"
            label="Instagram..."
            type="nav"
          />
        </template>

        <template v-if="isAdmin()">
          <TButton
            type="nav"
            class="red-500"
            label="Reset Telegram"
            @click="softUpdate(event.id, { telegram: {} })"
          />
          <TButton
            type="nav"
            class="red-500"
            label="Reset Instagram"
            @click="softUpdate(event.id, { instagram: {} })"
          />
        </template>
      </div>
    </TPopup>

    <TPopup v-if="ticketPopup" title="Ticket" @close="ticketPopup = false">
      <div class="mx-auto max-h-screen max-w-md overflow-y-scroll py-4">
        <div>Reserved as {{ getRsvp(item.id).participant.name }}</div>
      </div>
    </TPopup>

    <TPopup
      v-if="reservationPopup"
      title="Get Ticket"
      @close="reservationPopup = false"
    >
      <div class="mx-auto max-h-screen max-w-md overflow-y-scroll py-4">
        <div v-if="reservationPopup === 'reserve'">
          <div>
            <TForm
              v-model="account"
              allow-guests
              :fields="reservationFields"
              :submit-label="
                t('eventView.reservationPopup.reserve.submitLabel')
              "
              class="mt-4 space-y-4"
            >
              <template v-if="!uid" slot="buttons">
                <TButton
                  allow-guests
                  :to="localePath(`/signin?target=${this.$route.fullPath}`)"
                  :label="t('eventView.reservationPopup.reserve.label')"
                />
              </template>
            </TForm>
          </div>
        </div>
        <div v-if="reservationPopup === 'finish'" class="p-4">
          <template v-if="item.link">
            <h2 class="mb-4 font-bold">
              {{ t("eventView.reservationPopup.finish.title") }}
            </h2>
            <TButton class="mt-4 mr-4" type="danger" :href="item.link">{{
              t("eventView.reservationPopup.finish.btn")
            }}</TButton>
          </template>
          <template v-else>
            <h2 class="mb-4 font-bold">
              {{ t("eventView.reservationPopup.finish.title") }}
            </h2>
            <p v-if="uid">
              {{ t("eventView.reservationPopup.finish.description") }}
            </p>
            <p v-else>
              {{ t("eventView.reservationPopup.finish.reminder") }}
            </p>
            <div v-if="uid">
              <TButton
                :href="calendarLink"
                :label="t('eventView.reservationPopup.finish.calendar')"
                class="mt-2"
              />
            </div>
          </template>
        </div>
      </div>
    </TPopup>
  </div>
</template>
