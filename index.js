const express = require('express')
const ModelClass = require('./model.js');
const storeJson = require('./stores.json');
const app = express()
let Model = null;
const port = 3000;

app.get('/setup', async (req, res) => {
  await Model.setup(storeJson);
  res.json({success: true});
});

app.get('/', async (req, res) => {
  const stores = await Model.getAllStores();
  res.json(stores);
})

const startServer = async () => {
  Model = new ModelClass();
  await Model.init();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
