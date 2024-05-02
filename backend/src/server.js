const express = require('express')
const {connectDb} = require("./database");
const userRoute = require('./routes/user');
const {errorHandler} = require('./utils/middleware')

const dotEnv = require('dotenv').config();
const PORT = process.env.PORT;

const initializeServer = async() => {
    await connectDb();
    const app = express();

    app.use(express.json());
    app.use('/api/user', userRoute);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
}

initializeServer();