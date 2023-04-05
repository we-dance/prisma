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
      console.log(`event(${result.id}) #${result.error} <${result.ref}>`)
    }
  }
}

export async function importProfiles () {
  const profiles = await getProfiles()

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
