const express = require('express')
const app = express()
const port = 3000
const {Client} = require('pg')
const stores = require('./stores.json')

app.get('/', function (req, res) {
  const { storename } = req.query
  console.log(storename)
  const index = stores.findIndex(store => store.name === storename)
  if (index > -1) {
    res.json(stores[index])
  } else {
    res.send('Store not found!')
  }
})

app.delete('/', function (req, res) {
  const { storename } = req.query
  console.log(storename)
  const index = stores.findIndex(store => store.name === storename)
  if (index > -1) {
    stores.splice(index, 1)
    res.send(`Store found! Deleting store with index: ${index}`)
  } else {
    res.send('Store not found!')
  }
})

app.post('/',
  express.json(), // for parsing application/json body in POST
  (req, res) => {
    const { body } = req
    console.log(body)
    stores.push(body)
    res.send('Store added!')
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
//_______________________________________________________________________________________________________________

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "2233360Arman.",
    database: "JUweb"
})

client.connect();

client.query(`select * from venues`, (err, res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;
})
//__________________________________________________________________________________________________________

