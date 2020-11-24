const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose'); 


const Lieux = require("./model/lieu")
const URI = "mongodb+srv://groupeE:passwordgroupee@cluster0.6wggo.mongodb.net/airbnb?retryWrites=true&w=majority"; 
 

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
.then(() => {
    console.log('MongoDB Connected...')
})
.catch(err => console.log(err))



app.get('/', async (req, res) => {
    await Lieux.find(((err, lieu) => {
        if (err){
            res.send(err); 
        } else {
            res.json(lieu);   
        }
    }))
});

app.get('/:id', async (req, res) => {
    res.send(req.params.id)
});

app.get('/:date', async (req, res) => {
    res.send(req.params.id)
});

app.delete('/:id', (req, res) => {
    
})

app.put('/:id', (req, res) => {
    
})


app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});