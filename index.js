const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.json());



const dbUser ='bulbulDb';
const pass = 'jND6YxpByQyJlp4y';
const uri = "mongodb+srv://bulbulDb:jND6YxpByQyJlp4y@cluster0-v1qtx.mongodb.net/test?retryWrites=true&w=majority";

let client = new MongoClient(uri, { useNewUrlParser: true });


const users =["Bulbul", "Shakil", "Babul", "Sumi", "Shahana", "Sanjida"];


app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.find({name: "Mobile"}).limit(10).toArray((err, documents) => {
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
        });
});

app.get('/fruits/apple', (req, res)=> {
    res.send({fruit: "apple", Quantity: 1000, Price: 10000});
})

app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    const name = users[id];
    res.send({name, id});
})

//post

app.post('/addProduct', (req, res)=> {
        client = new MongoClient(uri, { useNewUrlParser: true });
        //you can save to database
        const product =req.body;
        client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.insertOne(product, (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
        });
});



app.listen(3000, ()=> console.log("listening to port 3000"));