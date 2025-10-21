<template>
    <v-card class="pa-4 text-center">
      <v-card-title>{{ label }}</v-card-title>
      <v-card-text>
        <div class="text-h4 font-weight-bold">{{ vots }}</div>
        <div class="text-caption">vots</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" block @click="emetreVot">
          <v-icon left>mdi-vote</v-icon>
          Votar
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  // 3.a: Definim les props que rebrà (vots)
  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    vots: {
      type: Number,
      required: true
    }
  })
  
  // 3.b: Definim els esdeveniments que emetrà (votar)
  const emit = defineEmits(['votar'])
  
  function emetreVot() {
    emit('votar')
  }
  </script>