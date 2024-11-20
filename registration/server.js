const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;
const FILENAME = "output.json";

const LOCAL_HOST_ADDRESS = `http://localhost:${PORT}`;

app.use(express.static('public'));
app.use(express.json());

function ensureJsonFileIsValid(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8'); 
  }
}


app.post('/write-file', (req, res) => {
  const { content } = req.body;

  if (!content || !content.user || !content.user.email) {
    return res.status(400).send('Invalid request: User data with a unique email is required');
  }

  const filePath = path.join(__dirname, FILENAME);

  ensureJsonFileIsValid(filePath);

  fs.readFile(filePath, 'utf-8', (readErr, data) => {
    if (readErr) {
      console.error('Error reading file:', readErr);
      return res.status(500).send('Failed to read the file');
    }

    let usersArray;
    try {
      usersArray = data.trim() ? JSON.parse(data) : []; 
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return res.status(500).send('Invalid JSON in the file');
    }

    const userExists = usersArray.some(user => user.user.email === content.user.email);

    if (userExists) {
      return res.status(409).send('User already exists');
    }

    usersArray.push(content);

    fs.writeFile(filePath, JSON.stringify(usersArray, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
        return res.status(500).send('Failed to write to the file');
      }
      res.send('User added successfully');
    });
  });
});



app.listen(PORT, () => {
  console.log(`Server is running at ${LOCAL_HOST_ADDRESS}`);
});
