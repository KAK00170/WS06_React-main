const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(req.app.locals.publicDir, 'index.html'));
});

module.exports = router;