// Timestamp Microservice

// Sin parámetro -> fecha actual
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Con parámetro -> /api/:date
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Si es solo números, lo tratamos como timestamp en milisegundos
  if (/^-?\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    // Si no, lo tratamos como string de fecha (ej: 2015-12-25)
    date = new Date(dateParam);
  }

  // Fecha inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta válida
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// index.js
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// ⬇⬇⬇ PEGÁS ACÁ EL CÓDIGO NUEVO DE /api y /api/:date ⬇⬇⬇
// ...
// ⬆⬆⬆ ESTE BLOQUE NUEVO ⬆⬆⬆

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
