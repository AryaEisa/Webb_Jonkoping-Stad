const express = require('express');
const cors = require('cors'); // Import cors module

const app = express();
const port = 3000;

const ModelClass = require('./model.js');
const Model = new ModelClass();

// Use cors middleware to enable CORS
app.use(cors());

app.get('/', async (req, res) => {
  const stores = await Model.getStores();
  res.json(stores);
});

app.get('/venues', async (req, res) => {
  const stores = await Model.getStores();
  res.json(stores);
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


const server = async () => {
  await Model.connectDatabase();
  await Model.setupDatabase();

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

server();