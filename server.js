'use strict'
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json()); 
const BookSchema = require("./BookSchema");

mongoose.connect(process.env.MONGO_APP , { useNewUrlParser: true, useUnifiedTopology: true });
// 'mongodb://localhost:27017/test'

//Model 
const BooksModel = mongoose.model('Books', BookSchema);

server.get('/test', testHandler);
server.get('/books', getBooksHandler);
server.post('/addBook', addBookHandler);
server.delete('/deletBook/:bookId', deletBookHandler);
server.put('/updateBook/:bookId', updateBookHandler);


function testHandler(req, res) {
    res.send('all good')
}
//localhost:3001/books?email=
function getBooksHandler(req, res) {
    let emailAdress = req.query.email;
    BooksModel.find({ email: emailAdress }, function (err, resultData) {
        if (err) {
            console.log('There is no Data for the email address: ' + emailAdress);
        } else {
            console.log("yyyyyyyyyyyyyyyy", resultData);
            res.send(resultData);
        }
    })
}
async function addBookHandler(req, res) {
    console.log(req.body);
    // { title: "abd",  description: "This Book is for  managment",  status: "On Stock",  email: "abuataabooood@yahoo.com" }
    let { title, description, status,email } = req.body; //Destructuring assignment .
    await BooksModel.create({ title, description, status,email });
    // await BookModel.create(req.body)
    getBooksHandler(req,res); // send data to frontEnd
}

async function deletBookHandler(req,res) {
    console.log('inside deletBookHandler func');
    console.log(req.params.bookId);
    let emailOwner= req.query.email;

    let bookId = req.params.bookId;
    BooksModel.remove({_id:bookId},(error,deletedBook)=>{
        if(error) {
            console.log('error in deleteing the data')
        } else {
            console.log('data deleted', deletedBook)
            BooksModel.find({email: emailOwner},function(err,data){
                if(err) {
                    console.log('error in getting the data')
                } else {
                    console.log(data);
                    res.send(data);
                }
            })
        }
    })
}
async function updateBookHandler(req,res) { // another way https://github.com/LTUC/amman-301d29/blob/master/class-14/demo/react-mongoose/backend/server.js
    console.log('inside updateBookHandler func');
    let bookId = req.params.bookId;
    let { title, description, status,email }=req.body;
    console.log(req.body);
    BooksModel.findByIdAndUpdate(bookId, { title , description, status, email },(error,updatedData)=>{//updatedDatais for one obj just 
        if(error) {
            console.log('error in updating the data')
        } else {
            console.log("Data updated!");
            
            BooksModel.find({email: req.body.email},function(err,data){
                if(err) {
                    console.log('error in getting the data')
                } else {
                    res.send(data);
                }
            })
        }
    })
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})