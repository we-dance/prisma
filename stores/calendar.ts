export const useCalendar = defineStore('calendar', {
  state: () => ({
    data: [] as any[]
  }),

  actions: {
    load () {
      this.data = []

      this.data.push({
        id: '61clJo5oEdhNtnZBYYZB',
        name: 'Salsa Cubana at Kult',
        createdAt: new Date('2023-04-01T18:15:00'),
        startDate: new Date('2023-04-01T20:00:00'),
        type: 'Party',
        styles: ['Salsa'],
        price: '10 EUR',
        venue: { name: 'Kult' },
        org: { username: 'MontunoClub' },
        cover: 'https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2F16e50323-c2cd-4f3e-b559-f82d77ca969a?alt=media&token=df46becb-a5e1-42f2-a405-2e091a6aef52'
      })

      this.data.push({
        id: 'tpJJpg490KKy6SQ45z8I',
        name: 'Try Salsa',
        createdAt: new Date('2023-04-01T18:15:00'),
        startDate: new Date('2023-05-01T19:00:00'),
        type: 'Party',
        styles: ['Salsa'],
        price: 'pay as you wish',
        venue: { name: 'Kult' },
        org: { username: 'MontunoClub' },
        cover: 'https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2Faa6d768c-a066-491e-aaa9-1288c0dad421?alt=media&token=120e23fb-95b7-495f-94b2-9a310cfea9bc'
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCalendar, import.meta.hot))
}
