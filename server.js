// 'use strict';

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();


// const PORT = process.env.PORT;
// const server = express();

// server.use(cors());
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


// // ____Schema____________________________________==>

// const BooksAbdallah = new mongoose.Schema({
//     books: [{
//         title: String,
//         description: String,
//     }],
//     email: String,
// });

// // ____Model____________________________________==>

// const BookModel = mongoose.model('Books', BooksAbdallah);

// function seedDataCollection() {

//     const emailGmail = new BookModel({
//         email: 'Abdallah.hamoury@gmail.com',
//         books: [
//             {

//                 title: 'Broken Glass',
//                 description: 'The Congolese writer says he was “trying to break the French language” with Broken Glass – a black comedy told by a disgraced teacher without much in the way of full stops or paragraph breaks',
//             },
//             {
//                 title: 'Girl With the Dragon Tattoo',
//                 description: 'Radical journalist Mikael Blomkvist forms an unlikely alliance with troubled young hacker Lisbeth Salander as they follow a trail of murder and malfeasance connected with one of Sweden’s most powerful families in the first novel of the bestselling Millennium trilogy',
//             }
//         ]

//     })

//     const HotMail = new BookModel({
//         email: 'Abdallah.hamoury@hotmail.com',
//         books: [{
//             title: 'Harry Potter and the Goblet of Fire',
//             description: 'A generation grew up on Rowling’s all-conquering magical fantasies, but countless adults have also been enthralled by her immersive world. Book four, the first of the doorstoppers, marks the point where the series really takes off. The Triwizard Tournament provides pace and tension',
//         }]
//     })
//     emailGmail.save();
//     HotMail.save();
// }
// seedDataCollection()

// server.get('/getBooks', getBooksHandler);

// function getBooksHandler(req, res) {

//     let emailAdress = req.query.email;
//     BookModel.find({ email: emailAdress }, function (err, ownerData) {
//         if (err) {
//             console.log('error in getting the data')
//         } else {
//             console.log(ownerData);
//             res.send(ownerData[0].Books)
//         }
//     })
// }


// server.listen(PORT, () => {
//     console.log(`listening on PORT ${PORT}`);
// })

'use strict'
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const server = express();
server.use(cors());
//books database
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
//Schema 
const bookSchema = new mongoose.Schema({
    books: [{
        title: String,
        description: String,
    }],
    email: String,
});
//Model 
const BooksModel = mongoose.model('Books', bookSchema);
function seedDataCollection() {
    const emailYahoo = new BooksModel({
        email: "abdallah.hamoury@gmail.com",
        books: [
            {
                title: "Idiot Brain",
                description: "Explains What Your Head is Really Up To",
                status: "success",
            },
            {
                title: "Happy Brain",
                description: "investigate what causes happiness, where it comes from, and why we are so desperate to hang onto it.",
                status: "success",
            }
        ]
    })
    const emailGmail = new BooksModel({
        email: "abdallah.hamour@gmail.com",
        books: [{
            title: "The Da Vinci Code",
            description: "mystery thriller novel.",
            status: "complete"
        }]
    })
    emailYahoo.save();
    emailGmail.save();
}
// seedDataCollection();
//localhost:3001/books?email=
server.get('/books', getBooksHandler);
function getBooksHandler(req, res) {
    let emailAdress = req.query.email;
    // console.log(emailAdress);
    BooksModel.find({ email: emailAdress }, function (err, resultData) {
        if (err) {
            console.log('There is no Data for the email address: ' + emailAdress);
        } else {
            console.log("yyyyyyyyyyyyyyyy", resultData[0].books);
            res.send(resultData[0].books);
        }
    })
}
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})