const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/public', express.static(path.join(__dirname, 'public')));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

router.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

module.exports = router;
