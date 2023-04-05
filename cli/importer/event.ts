import { PrismaClient } from '@prisma/client'
import { getDate, getDateOrNow } from '../utils/date'

const prisma = new PrismaClient()

async function addVenue (venue: any, creatorProfileId: string) {
  if (!venue?.place_id) {
    return {
      state: 'failed',
      error: 'empty',
      id: null
    }
  }

  const existingVenue = await prisma.profile.findFirst({ where: { id: venue.place_id } })
  if (existingVenue) {
    return {
      state: 'exists',
      id: existingVenue.id
    }
  }

  const data: any = {
    id: venue.place_id,
    name: venue.name,
    username: venue.place_id,
    bio: '',
    formattedAddress: venue.formatted_address,
    mapUrl: venue.url,
    lng: venue.geometry?.location?.lng,
    lat: venue.geometry?.location?.lat,
    placeId: venue.place_id,
    phone: venue.international_phone_number,
    type: 'Venue'
  }

  const creator = await prisma.account.findFirst({ where: { id: creatorProfileId } })
  if (creator) {
    data.createdById = creator.id
  } else {
    console.log(`venue(${data.id}): creator (${creatorProfileId}) not found`)
  }

  const result = await prisma.profile.create({
    data
  })

  return {
    state: 'created',
    id: result.id
  }
}

export async function addEvent (event: any) {
  const existingEvent = await prisma.event.findFirst({ where: { id: event.id } })
  if (existingEvent) {
    return {
      state: 'exists',
      id: existingEvent.id
    }
  }

  if (!event.name) {
    return {
      state: 'failed',
      code: 'no_name',
      id: event.id
    }
  }

  if (!event.startDate) {
    return {
      state: 'failed',
      error: 'no_start_date',
      id: event.id
    }
  }

  if (!event.endDate) {
    return {
      state: 'failed',
      error: 'no_end_date',
      id: event.id
    }
  }

  let creatorId = ''
  if (event.createdBy) {
    const creator = await prisma.profile.findFirst({ where: { id: event.createdBy } })
    if (!creator) {
      return {
        state: 'failed',
        error: 'creator_not_found',
        id: event.id,
        ref: event.createdBy
      }
    }

    creatorId = creator.id
  }

  const organizer = await prisma.profile.findFirst({ where: { username: event.org?.username } })
  if (!organizer) {
    return {
      state: 'failed',
      error: 'organizer_not_found',
      id: event.id,
      ref: event.org?.username
    }
  }
  const organizerId = organizer.id

  const venueId = (await addVenue(event.venue, creatorId)).id
  if (!venueId) {
    return {
      state: 'failed',
      error: 'no_venue',
      id: event.id,
      ref: event.address
    }
  }

  const data = {
    id: event.id,
    createdAt: getDateOrNow(event.createdAt),
    updatedAt: getDateOrNow(event.updatedAt),
    name: event.name,
    published: true,
    startDate: getDate(event.startDate),
    endDate: getDate(event.endDate),
    description: event.description || '',
    type: event.eventType,
    cover: event.cover || '',
    price: event.price || '',
    creatorId,
    organizerId,
    venueId,
    firebaseId: event.id
  }

  try {
    const result = await prisma.event.create({
      data
    })

    return {
      state: 'created',
      id: result.id
    }
  } catch (exception) {
    console.log(`event(${event.id})`)

    return {
      state: 'failed',
      error: 'invalid_prisma_event_create',
      id: event.id,
      exception
    }
  }
}
