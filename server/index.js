require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./routers/auth.js');
const postRouter = require('./routers/post')
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = async () => {
    try {
        console.log("Connectingggg......");
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learing.jwdjz.mongodb.net/mern-learing?retryWrites=true&w=majority`, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        })
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
    }
}
connectDB();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter);





const PORT =  process.env.PORT ||  8000;
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });


