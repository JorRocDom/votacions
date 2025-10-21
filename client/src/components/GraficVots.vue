<template>
    <div style="height: 300px;">
      <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { computed, ref, onMounted } from 'vue'
  import { useAppStore } from '@/stores/app'
  import { Bar } from 'vue-chartjs'
  import { 
    Chart as ChartJS, 
    Title, 
    Tooltip, 
    Legend, 
    BarElement, 
    CategoryScale, 
    LinearScale 
  } from 'chart.js'
  
  // Registrem els components de Chart.js
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const store = useAppStore()
  const loaded = ref(false) // Per evitar problemes de renderitzat inicial
  
  // Dades reactives per al gràfic
  const chartData = computed(() => ({
    labels: ['Opció A', 'Opció B', 'Opció C', 'Opció D'],
    datasets: [
      {
        label: 'Vots',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        // Enllacem les dades directament a l'array de vots de Pinia
        data: store.votos 
      }
    ]
  }))
  
  // Opcions de configuració del gràfic
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Amaguem la llegenda
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Assegurem que l'eix Y només mostri enters
          precision: 0
        }
      }
    }
  }
  
  // Ens assegurem que el gràfic es munti només al client
  onMounted(() => {
    loaded.value = true
  })
  </script>