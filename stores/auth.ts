export const useAuth = defineStore('auth', {
  state: () => ({
    isLoggedIn: true
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
