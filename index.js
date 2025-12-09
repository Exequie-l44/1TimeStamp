
  

// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS para que freeCodeCamp pueda testear
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta base (no es obligatoria pero ayuda para ver que está vivo)
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// Ruta principal del proyecto:
// /api/:date?  -> el parámetro date es opcional
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;

  // 1) Si NO mandan parámetro (/api), debe devolver la fecha actual
  if (!dateParam) {
    date = new Date();
  } else {
    // 2) Si todos los caracteres son dígitos, lo tomamos como timestamp en milisegundos
    if (/^\d+$/.test(dateParam)) {
      const timestamp = parseInt(dateParam, 10);
      date = new Date(timestamp);
    } else {
      // 3) Si no, lo interpretamos como string de fecha
      date = new Date(dateParam);
    }
  }

  // 4) Si la fecha no es válida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5) Respuesta correcta
  return res.json({
    unix: date.getTime(),        // número en milisegundos
    utc: date.toUTCString()      // ej: "Fri, 25 Dec 2015 00:00:00 GMT"
  });
});

// Puerto para Render (usa process.env.PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
