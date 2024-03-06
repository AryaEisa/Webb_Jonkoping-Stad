const express = require('express');
const cors = require('cors'); // Import cors module
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const ModelClass = require('./model.js');
const Model = new ModelClass();

// Use cors middleware to enable CORS
app.use(cors());
app.use(cookieParser()); // Middleware to parse cookies

app.get('/', async (req, res) => {
  const stores = await Model.getStores();
  res.json(stores);
});

app.get('/venues', async (req, res) => {
  const stores = await Model.getStores();
  res.json(stores);
});
app.get('/login', (req, res) => {
  // You can render a login page or send some data here
  res.send('This is the login page');
});

app.get('/venues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Model.getStoresId(id); 
    res.json(venue);
    console.log("Nice!")
    res.status(200);
  } catch (error) {
    console.error('Error retrieving venue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Student' && password === '12345') {
    res.cookie('token', 'super-secret-cookie', { httpOnly: true });
    res.send('Login successful');
  } else {
    res.status(401).send("Invalid username or password");
  }
});

app.get('/check-user-status', (req, res) => {
  const { token } = req.cookies;
  if (token === 'super-secret-cookie') {
    res.send('User is logged in!');
  } else {
    res.status(401).send('Unauthorized');
  }
});




const server = async () => {
  await Model.connectDatabase();
  await Model.setupDatabase();

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

server();