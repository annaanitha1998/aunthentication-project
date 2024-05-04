const express = require('express')
const {connectDb} = require("./database");
const userRoute = require('./routes/user');
const {errorHandler} = require('./utils/middleware')
const {logger} = require('./utils/middleware')
const cors = require('cors')

const dotEnv = require('dotenv').config();
const PORT = process.env.PORT;

const initializeServer = async() => {
    await connectDb();
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use('/api/user', userRoute);
    app.use(errorHandler);

    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
      });
}

initializeServer();