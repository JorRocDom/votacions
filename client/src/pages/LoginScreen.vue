<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card width="400" class="pa-5">
            <v-card-title class="text-center text-h5">Sistema de Votacions</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-text-field v-model="username" label="Usuari" prepend-icon="mdi-account" required></v-text-field>
                    <v-text-field v-model="password" label="Contrasenya" type="password" prepend-icon="mdi-lock"
                        required></v-text-field>
                    <v-alert v-if="error" type="error" density="compact" class="mb-4">
                        Credencials incorrectes (user / 123)
                    </v-alert>
                    <v-btn type="submit" color="primary" block>Entrar</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const username = ref('')
const password = ref('')
const error = ref(false)

const router = useRouter()
const store = useAppStore()

function handleLogin() {
    if (username.value === 'user' && password.value === '123') {
        store.setLoggedIn(true)

        router.push('/votacions')
    } else {
        error.value = true
    }
}

</script>