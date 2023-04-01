import { collection, getDocs } from 'firebase/firestore'
import { db } from './index'

export function useCollection (name: string) {
  const data = ref([])
  const pending = ref(true)
  const error = ref(false)

  const collectionRef = collection(db, name)

  async function execute () {
    pending.value = true
    try {
      const querySnapshot = await getDocs(collectionRef)
      data.value = querySnapshot.docs
    } catch (e) {
      error.value = e
    }

    pending.value = false
  }

  execute()

  return {
    data,
    pending,
    error
  }
}
