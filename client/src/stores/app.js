import { ref, computed } from 'vue' // Torna a importar 'computed'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
    // State
    const loggedIn = ref(false)
    const votos = ref([0, 0, 0, 0])

    // Getters
    const isLoggedIn = computed(() => loggedIn.value)

    // Actions
    function setLoggedIn(status) {
        loggedIn.value = status
    }

    function setVotos(nousVots) {
        votos.value = nousVots
    }

    return {
        votos,
        isLoggedIn,
        setLoggedIn,
        setVotos
    }
})