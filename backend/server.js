const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose'); 


const URI = "mongodb+srv://groupeE:passwordgroupee@cluster0.6wggo.mongodb.net/test?retryWrites=true&w=majority"; 
 
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
.then(() => {
    console.log('MongoDB Connected...')
})
.catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello world !!');
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});