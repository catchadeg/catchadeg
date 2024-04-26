const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Use the cors middleware with specific options
app.use(cors({
  origin: 'http://2erndin.com', // Replace with the origin of your application
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'photos/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Serve the photos directory statically
app.use('/photos', express.static(path.join(__dirname, 'photos')));

// Handle the photo upload
app.post('/photos', upload.single('photo'), (req, res) => {
  try {
    const photoInfo = {
      url: `https://catchadeg.onrender.com/photos/${req.file.filename}`,
      title: req.body.title,
      tags: req.body.tags.split(',').map(tag => tag.trim())
    };

    // Save the photo information in your preferred data storage (e.g., an array, database)
    // ...

    res.json(photoInfo);
  } catch (error) {
    console.error('Error handling photo upload:', error);
    res.status(500).json({ error: 'An error occurred while uploading the photo.' });
  }
});

// Handle the photo retrieval
app.get('/photos', (req, res) => {
  const photos = fs.readdirSync('photos').map(filename => {
    return {
      url: `https://catchadeg.onrender.com/photos/${filename}`,
      title: 'Photo Title', // You'll need to store this information separately
      tags: ['tag1', 'tag2'] // You'll need to store this information separately
    };
  });

  res.json({ photos });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
