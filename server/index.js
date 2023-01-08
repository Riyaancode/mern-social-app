const dotenv = require('dotenv');
const express = require('express');
const postRoutes = require('./router/post')
const userRoutes = require('./router/users')
const friendRequestRoutes = require('./router/friendrequest')
const Users = require('./model/UsersSchema')
const app = express();
var cors = require('cors');

const multer = require('multer')
dotenv.config({ path: "./config.env" });

require('./db/conn');

app.use(express.json());
app.use(cors());

app.use("/post", postRoutes)
app.use("/users", userRoutes);
app.use("/friendrequest", friendRequestRoutes);


app.get('/', (req, res) => {
    res.send('This is home');
})




const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: Storage }).single('image')



app.post('/register', async (req, res) => {

    upload(req, res, async (err) => {
        if (!err) {

            const { firstName, lastName, email, password, dateofBirth, location, occupation } = req.body;
            const image = req.file.originalname;

            if (!firstName || !lastName || !email || !password || !dateofBirth || !location || !occupation || !image) {
                return res.status(422).json({ error: "Please filled the all field" });
            }

            try {

                const userExist = await Users.findOne({ email: email })

                if (userExist) {
                    return res.status(422).json({ error: "Email already exist!" });
                }

                const user = new Users({ firstName, lastName, email, password, image, dateofBirth, location, occupation });

                const userReg = await user.save();




                if (userReg) {
                    res.status(200).json(user);
                }
            } catch (error) {
                console.log(error)
            }

        } else {
            console.log(err)
        }
    })

})


app.post('/signin', async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'please fill the data' })
        }

        const userLogin = await Users.findOne({ email: email });
        console.log(userLogin);

        if (!userLogin) {
            res.status(404).json({ error: 'Please Signup first!' });
        } else {

            if (password == userLogin.password) {
                // res.status(200).send(req.body)
                res.status(200).json(userLogin);
            } else {
                res.status(404).json({ error: 'incorrect password' });
            }


        }


    } catch (error) {
        console.log(error);
    }
})



app.listen(4000, () => {
    console.log('server listen on port 4000')
})