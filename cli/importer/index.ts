import { sortBy } from 'lodash'
import { getProfiles } from '../provider/profiles'
import { getAccounts, getUsers, getSuspended } from '../provider/accounts'
import { getEvents } from '../provider/events'
import { addEvent } from './event'
import { addProfile, addSubscribers } from './profile'
import { addAccount } from './account'
import cliProgress from 'cli-progress'
import { getLogger } from '../utils/logger'

export async function importAccounts (multibar: cliProgress.MultiBar) {
  const accounts = await getAccounts()
  const users = getUsers()
  const suspended = getSuspended()

  let created = 0
  let ignored = 0
  let skipped = 0
  let failed = 0

  let collection = 'accounts'
  const logger = getLogger(collection)

  const bar = multibar.create(accounts.length, 0, {
    collection,
    updated: 0
  })

  for (const account of accounts) {
    const user = users.find((u: any) => u.localId === account.id)
    const isSuspended = suspended.find((s: any) => s.uid === account.id)
    bar.increment({ failed, created, skipped, ignored })

    if (isSuspended) {
      skipped++
      continue
    }

    const result = await addAccount(account, user)

    if (result.state === 'created') {
      created++
    }

    if (result.state === 'ignored') {
      ignored++
    }

    if (result.state === 'failed') {
      failed++
      logger.error(result)
    }
  }

  bar.stop()
}

async function importCities(multibar: cliProgress.MultiBar, cities: any[]) {
  const addedCities: any = {}

  let created = 0
  let updated = 0
  let failed = 0

  let collection = 'cities'
  const logger = getLogger(collection)
  const bar = multibar.create(cities.length, 0, {
    collection,
    ignored: 0
  })

  for (const city of cities) {
    bar.increment({ failed, created, updated })

    if (addedCities[city.cityPlaceId]) {
      failed++
      logger.error({
        error: 'city_duplicate',
        type: 'City',
        cityPlaceId: city.cityPlaceId,
        id: city.id,
        username: city.username,
        redirect: addedCities[city.cityPlaceId]
      })
      continue
    }

    if (!city.cityPlaceId && city.username !== 'Travel') {
      failed++

      logger.error({
        error: 'city_no_place_id',
        type: 'City',
        id: city.id,
        username: city.username
      })

      continue
    }

    const result = await addProfile(city)
    if (result.state === 'updated') {
      updated++
    }

    if (result.state === 'created') {
      created++
    }

    addedCities[city.cityPlaceId] = city.username
  }
  bar.stop()
}

export async function importSubscribers(multibar: cliProgress.MultiBar, profiles: any[]) {
  let created = 0
  let failed = 0

  let collection = 'subscribers'
  const logger = getLogger(collection)

  const bar = multibar.create(profiles.length, 0, {
    collection,
    ignored: 0,
    updated: 0
  })

  for (const profile of profiles) {
    const result = await addSubscribers(profile)
    created += result.created
    failed += result.failed

    for (const error of result.errors) {
      logger.error(error)
    }

    bar.increment({ failed, created })
  }
  bar.stop()
}

export async function importProfiles(multibar: cliProgress.MultiBar) {
  const allProfiles = sortBy(await getProfiles(), 'createdAt')
  const cities = allProfiles.filter((p: any) => p.type === 'City')

  await importCities(multibar, cities)

  const profiles = allProfiles.filter((p: any) => p.type !== 'City')

  let created = 0
  let failed = 0
  let updated = 0

  let collection = 'profiles'
  const bar = multibar.create(profiles.length, 0, {
    collection,
    ignored: 0
  })

  for (const profile of profiles) {
    const result = await addProfile(profile)

    if (result.state === 'created') {
      created++
    }

    if (result.state === 'updated') {
      updated++
    }

    bar.increment({ failed, created, updated })
  }
  bar.stop()

  await importSubscribers(multibar, allProfiles)
}

export async function importEvents (multibar: cliProgress.MultiBar) {
  let created = 0
  let updated = 0
  let ignored = 0
  let failed = 0

  const events = await getEvents()
  let collection = 'events'

  const logger = getLogger(collection)
  const bar = multibar.create(events.length, 0, {
    collection
  })

  for (const event of events) {
    const result = await addEvent(event)
    bar.increment({ created, updated, ignored, failed })

    if (result.state === 'created') {
      created++
    }
    if (result.state === 'updated') {
      updated++
    }
    if (result.state === 'ignored') {
      ignored++
    }
    if (result.state === 'failed') {
      failed++
      logger.error(result)
    }
  }

  bar.stop()
}
