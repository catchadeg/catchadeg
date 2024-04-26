const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

let photos = [];

app.use(bodyParser.json());

app.get('/photos', (req, res) => {
  res.json({ photos });
});

app.post('/photos', (req, res) => {
  const { title, tags, url } = req.body;
  const newPhoto = { title, tags, url };
  photos.unshift(newPhoto);
  res.json(newPhoto);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
