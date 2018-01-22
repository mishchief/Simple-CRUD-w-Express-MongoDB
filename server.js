const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

// Connecting to MongoDB
var db

MongoClient.connect('your-mongodb-url', (err, database) => {
  if (err)
    return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

// setting up ejs engine
app.set('view engine', 'ejs')

//middleware
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

// folder structure
app.use(express.static('public'))

// GET
app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {messages: result})
  })
})

// POST
app.post('/messages', (req, res) => {
  db.collection('messages').save(req.body, (err, result) => {
    if (err)
      return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

// PUT
app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.targetName}, {
    $set: {
      name: req.body.name,
      message: req.body.message
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// DELETE
app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete(
    {name: req.body.name},
    (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'The message has been deleted'})
  })
})
