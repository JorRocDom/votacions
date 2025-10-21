<template>
    <v-container>
      <v-row class="mb-4 align-center">
        <v-col cols="auto">
        </v-col>
        <v-col>
          <h1 class="text-h4">Hola, User!</h1>
          <p class="text-subtitle-1">Vota per la teva opció preferida.</p>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col v-for="(opcio, index) in opcions" :key="index" cols="12" md="3">
          <BotoVotar
            :label="opcio"
            :vots="store.votos[index]" 
            @votar="handleVotar(index)" 
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col>
          <v-card class="mt-8 pa-4">
            <h2 class="text-h5 mb-4 text-center">Resultats en Temps Real</h2>
            <GraficVots />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/stores/app'
  import BotoVotar from '@/components/BotoVotar.vue'
  // Importa el gràfic (el crearem al pas 5)
  import GraficVots from '@/components/GraficVots.vue' // Crearem aquest component
  
  const store = useAppStore()
  const router = useRouter()
  const opcions = ref(['Opció A', 'Opció B', 'Opció C', 'Opció D'])
  
  let ws = null // Variable per guardar la connexió WebSocket
  
  // 3.a: Guàrdia de Ruta
  onMounted(() => {
    if (!store.isLoggedIn) {
      router.push('/')
    } else {
      // 3.c: Connexió WebSocket
      connectWebSocket()
    }
  })
  
  onUnmounted(() => {
    // Tanquem la connexió si l'usuari surt del component
    if (ws) {
      ws.close()
    }
  })
  
  function connectWebSocket() {
    // Canvia 'localhost:3000' per l'adreça del teu servidor si el desplegues
    ws = new WebSocket('http://200.234.234.222') 
  
    ws.onopen = () => {
      console.log('Connectat al servidor WebSocket')
    }
  
    ws.onmessage = (event) => {
      // Quan rebem dades noves, actualitzem Pinia
      const nousVots = JSON.parse(event.data)
      store.setVotos(nousVots)
      console.log('Vots actualitzats:', nousVots)
    }
  
    ws.onclose = () => {
      console.log('Desconnectat del servidor WebSocket')
    }
  
    ws.onerror = (error) => {
      console.error('Error de WebSocket:', error)
    }
  }
  
  // 3.b: Gestió de l'esdeveniment 'votar'
  function handleVotar(index) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Enviem el vot al servidor
      const missatge = {
        type: 'vote',
        option: index
      }
      ws.send(JSON.stringify(missatge))
    } else {
      console.error('WebSocket no està connectat.')
    }
  }
  </script>