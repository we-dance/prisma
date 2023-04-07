import { sortBy } from 'lodash'
import { getProfiles } from '../provider/profiles'
import { getAccounts } from '../provider/accounts'
import { getEvents } from '../provider/events'
import { addEvent } from './event'
import { addProfile, addSubscribers } from './profile'
import { addAccount } from './account'

export async function importAccounts () {
  console.log('[importing accounts]')
  const accounts = await getAccounts()

  for (const account of accounts) {
    const result = await addAccount(account)
    if (result.state === 'failed') {
      console.log(`account(${result.id}) #${result.error} <${result.ref}>`)
    }
  }
}

export async function importProfiles () {
  console.log('[importing cities]')
  const allProfiles = sortBy(await getProfiles(), 'createdAt')
  const cities = allProfiles.filter((p: any) => p.type === 'City')
  const addedCities: any = {}

  for (const city of cities) {
    if (addedCities[city.cityPlaceId]) {
      console.log(`city(${city.id}) #duplicate <${city.cityPlaceId} @${city.username} -> @${addedCities[city.cityPlaceId]}>`)
      continue
    }

    if (!city.cityPlaceId && city.username !== 'Travel') {
      console.log(`city(${city.id}) #no_city_place_id <@${city.username}>`)
      continue
    }

    await addProfile(city)
    addedCities[city.cityPlaceId] = city.username
  }

  console.log('[importing profiles]')
  const profiles = allProfiles.filter((p: any) => p.type !== 'City')

  for (const profile of profiles) {
    await addProfile(profile)
  }

  console.log('[importing subscribers]')
  for (const profile of allProfiles) {
    await addSubscribers(profile)
  }
}

export async function importEvents () {
  console.log('[importing events]')
  const events = await getEvents()

  for (const event of events) {
    const result = await addEvent(event)
    if (result.state === 'failed') {
      console.log(`event(${result.id}) #${result.error} <${result.ref}>`)
    }
  }
}
