const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
var mongoose = require('mongoose'); 


var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
 
var urlmongo = ""; 
 
mongoose.connect(urlmongo, options);
 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
}); 

app.get('/', (req, res) => {
    res.send('Hello world !!');
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});