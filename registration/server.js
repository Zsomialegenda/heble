const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;
const FILENAME = "output.json";

const LOCAL_HOST_ADDRESS = `http://localhost:${PORT}`;

app.use(express.static('public'));
app.use(express.json());

app.post('/write-file', (req, res) => {


  const { content } = req.body;

  if (!content) {
    return res.status(400).send('Content is required');
  }

  fs.writeFile(path.join(__dirname, FILENAME), JSON.stringify(content, null, 2), (err) => {
    if (err) {
      console.error('Failed to write file:', err);
      return res.status(500).send('Failed to write file');
    }
    res.send('File written successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${LOCAL_HOST_ADDRESS}`);
});
