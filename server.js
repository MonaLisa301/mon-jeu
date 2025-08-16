const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir les fichiers du dossier "public"
app.use(express.static("public"));

// Quand un joueur se connecte
io.on("connection", (socket) => {
  console.log("Un joueur s'est connecté :", socket.id);

  // Quand un joueur envoie un message
  socket.on("message", (msg) => {
    console.log("Message reçu :", msg);
    // On renvoie le message à tous les joueurs
    io.emit("message", msg);
  });

  // Quand un joueur se déconnecte
  socket.on("disconnect", () => {
    console.log("Un joueur est parti :", socket.id);
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
