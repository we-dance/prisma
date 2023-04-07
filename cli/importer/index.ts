import { sortBy } from 'lodash'
import { getProfiles } from '../provider/profiles'
import { getAccounts } from '../provider/accounts'
import { getEvents } from '../provider/events'
import { addEvent } from './event'
import { addProfile } from './profile'
import { addAccount } from './account'

export async function importAccounts () {
  const accounts = await getAccounts()

  for (const account of accounts) {
    const result = await addAccount(account)
    if (result.state === 'failed') {
      console.log(`account(${result.id}) #${result.error} <${result.ref}>`)
    }
  }
}

export async function importProfiles () {
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

  const profiles = allProfiles.filter((p: any) => p.type !== 'City')

  for (const profile of profiles) {
    await addProfile(profile)
  }
}

export async function importEvents () {
  const events = await getEvents()

  for (const event of events) {
    const result = await addEvent(event)
    if (result.state === 'failed') {
      console.log(`event(${result.id}) #${result.error} <${result.ref}>`)
    }
  }
}
