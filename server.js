// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(express.static('.')); // serve camera-demo.html locally

app.post('/upload', upload.single('snapshot'), (req, res) => {
  if (!req.file) return res.status(400).send('No file');

  // optionally rename to .jpg for convenience
  const target = path.join('uploads', Date.now() + '.jpg');
  fs.rename(req.file.path, target, (err) => {
    if (err) return res.status(500).send('Save error');
    console.log('Saved snapshot to', target);
    res.status(200).send('OK');
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
