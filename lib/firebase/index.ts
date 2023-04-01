import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDiHlGLgzSp69hw2Gb0QfHAoJFEYOBgmYU',
  authDomain: 'wedancedev-aa00e.firebaseapp.com',
  projectId: 'wedancedev-aa00e',
  storageBucket: 'wedancedev-aa00e.appspot.com',
  messagingSenderId: '1040035616886',
  appId: '1:1040035616886:web:178ef690722d12613ee757',
  measurementId: 'G-MFRJ8RFKZW'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
