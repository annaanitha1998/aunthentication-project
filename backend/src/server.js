const express = require('express')
const {connectDb} = require("./database");

const dotEnv = require('dotenv').config();
const PORT = process.env.PORT;

const initializeServer = async() => {
    await connectDb();
    const app = express();

    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
}

initializeServer();