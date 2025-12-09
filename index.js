const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// CORS para que freeCodeCamp pueda testear
app.use(cors({ optionsSuccessStatus: 200 }));

// Archivos estáticos
app.use("/public", express.static(path.join(__dirname, "public")));

// Página principal
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// Ruta de ejemplo del boilerplate
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// ========= /api  (SIN PARÁMETRO: fecha actual) =========
app.get("/api", (req, res) => {
  const now = new Date();

  res.json({
    unix: now.getTime(),      // Number
    utc: now.toUTCString()    // String tipo "Fri, 25 Dec 2015 00:00:00 GMT"
  });
});

// ========= /api/:date  (CON PARÁMETRO) =========
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Si son solo dígitos, lo tratamos como timestamp en ms
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam, 10));
  } else {
    // Si no, como string de fecha
    date = new Date(dateParam);
  }

  // Fecha inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Fecha válida
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Puerto (Render usa process.env.PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
