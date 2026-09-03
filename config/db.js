const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
const { logger } = require("../services/loggerService");

const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: Number.parseInt(process.env.MYSQL_CONNECTION_LIMIT) || 10,
    queueLimit: 0
});

const connectDB = async () => {
    try {
        //sql connection 
        const connection = await mysqlPool.getConnection();
        console.log("MySql connected");
        connection.release();

        //mongo db 
        await mongoose.connect(process.env.MONGO_URI,{
           dbName : process.env.MONGO_DB 
        });
        logger.info("MongoDB connected");
        logger.info("Both db connected");
        return true
    } catch (error) {
        console.log("data base connection faild", error.message);
        return false
    }
}

module.exports = {
    mysqlPool,
    connectDB, 
}
