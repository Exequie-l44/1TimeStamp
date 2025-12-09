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

// ========= RUTA SIN PARÁMETRO: FECHA ACTUAL =========
app.get("/api", (req, res) => {
  const now = new Date();

  return res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// ========= RUTA CON PARÁMETRO: TIMESTAMP =========
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;

  let date;

  // Si todos los caracteres son dígitos, lo tomamos como timestamp en milisegundos
  if (/^\d+$/.test(dateParam)) {
    const timestamp = parseInt(dateParam, 10);
    date = new Date(timestamp);
  } else {
    // Si no, lo interpretamos como string de fecha
    date = new Date(dateParam);
  }

  // Si la fecha no es válida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta correcta
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Puerto para Render (usa process.env.PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
