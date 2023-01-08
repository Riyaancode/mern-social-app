// const express = require('express');
// const router = express.Router();
// const multer  = require('multer')


// require('../db/conn');
// const Users = require('../model/UsersSchema')




// const Storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../client/src/uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: Storage }).single('booksImage')


// router.get('/', (req, res) => {
//     res.send('This is home from router');
// })

// router.post('/register', async (req, res) => {



//     try {
//         const {firstName,lastName,email,password,dateofBirth} = req.body;

//         if (!firstName || !lastName || !email || !password || !dateofBirth) {
//             return res.status(422).json({ error: "Please filled the all field" });
//         }
//         const userExist = await Users.findOne({ email: email })

//         if (userExist) {
//             return res.status(422).json({ error: "Email already exist!" });
//         }

//         const user = new Users({ firstName, lastName, email, password, friends, location, occupation, dateofBirth });

//         const userReg = await user.save();




//         if (userReg) {
//             res.status(201).json({ messa: "user registered sucessfully" });
//         }
//     } catch (error) {
//         console.log(error)
//     }

// })


// router.post('/signin', async (req, res) => {

//     try {
//         const { email, password } = req.body
//         if (!email || !password) {
//             return res.status(400).json({ error: 'please fill the data' })
//         }

//         const userLogin = await Users.findOne({ email: email });
//         console.log(userLogin);

//         if (!userLogin) {
//             res.json({ error: 'Please Signup first!' });
//         } else {

//             if (password == userLogin.password) {
//                 res.send(req.body)
//                 res.json({ message: 'user signing sucessfully!' });
//             } else {
//                 res.json({ error: 'incorrect password' });
//             }


//         }


//     } catch (error) {
//         console.log(error);
//     }
// })


// router.post('/addpostsdata', async (req, res) => {

//     console.log(req.body)
//     res.status(200).json(req.body)

// })




// module.exports = router;