const WebSocket = require('ws')
const http = require('http')
const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const port = process.env.PORT || 3000
const VOTOS_FILE = path.join(__dirname, 'votos.json')

// Funció per llegir els vots del fitxer
function readVotos() {
  try {
    if (fs.existsSync(VOTOS_FILE)) {
      const data = fs.readFileSync(VOTOS_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (err) {
    console.error("Error llegint votos.json:", err)
  }
  // Si el fitxer no existeix o hi ha un error, inicialitza
  return [0, 0, 0, 0]
}

// Funció per guardar els vots al fitxer
function saveVotos(votos) {
  try {
    fs.writeFileSync(VOTOS_FILE, JSON.stringify(votos, null, 2))
    console.log("Vots desats:", votos)
  } catch (err) {
    console.error("Error desant votos.json:", err)
  }
}

// Inicialitzem els vots llegint del fitxer
let votos = readVotos()

// Creem un servidor HTTP bàsic
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Servidor de WebSockets actiu.\n')
});

// Creem el servidor de WebSockets
const wss = new WebSocket.Server({ server })

// Funció per enviar els vots actualitzats a TOTS els clients
function broadcastVotos() {
  const data = JSON.stringify(votos)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', (ws) => {
  console.log('Client connectat')

  // Enviar l'estat actual dels vots al nou client
  ws.send(JSON.stringify(votos))

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message)
      
      // Quan rebem un missatge de vot
      if (data.type === 'vote' && data.option >= 0 && data.option < 4) {
        // Actualitzem el recompte
        votos[data.option]++
        
        // Guardem a votos.json
        saveVotos(votos)
        
        // Enviem l'estat actualitzat a TOTS els clients
        broadcastVotos()
      }
    } catch (err) {
      console.error('Error processant el missatge:', err)
    }
  })

  ws.on('close', () => {
    console.log('Client desconnectat')
  })
})

server.listen(port, () => {
  console.log(`Servidor escoltant al port ${port}`)
})