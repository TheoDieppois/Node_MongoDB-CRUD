const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://root:admin@cluster0.6wggo.mongodb.net/airbnb?retryWrites=true&w=majority"; 
let db;
 

MongoClient.connect(URI, function(err, client) {
    if (err)  {
        console.log(err);
        throw err;
    }
    console.log("Connected successfully to server");
    db = client.db("airbnb");
});

app.get('/lieux/', async (req, res) => {
    const lieux = db.collection("lieu").find({}, {"id":1, "name": 1, "description":1}).toArray((err, docs) => {
        if (err) {
            console.log(err)
            throw err
        }
        console.log(docs);
        res.status(200).json(docs)
    });
});

app.get('/lieu/:id', async (req, res) => {
    res.send(req.params.id)
});

app.get('/lieu/:date', async (req, res) => {
    res.send(req.params.id)
});

app.delete('/lieu/:id', (req, res) => {

})

app.put('/lieu/:id', (req, res) => {

})


app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});