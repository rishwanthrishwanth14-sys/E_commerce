require("dotenv").config();

const cors = require("cors");
const express = require("express");
const userRouter=require("./routes/routesForAdmin/userRoutes");

//admins
const adminCategoryRoutes=require("./routes/routesForAdmin/categoryRoutes");
const adminProductRoutes=require("./routes/routesForAdmin/productRoutes");
const adminCustomerRoutes=require("./routes/routesForAdmin/customerRoutes");
//customer
const customerRoutes=require("./routes/routesForCustomer/customerRoutes");
const orderRoutes = require("./routes/routesForCustomer/orderRoutes");
const customerAddressRoutes = require("./routes/routesForCustomer/customerAddressRoutes");



const {connectDB} = require("./config/db");

const {
    logger,
    requestLogger
} = require("./services/loggerService");


const app = express();

const PORT = process.env.PORT || 2525;


// ============================================================
// BODY PARSER
// ============================================================

app.use(express.json());


// ============================================================
// CORS
// ============================================================

app.use(cors());


// ============================================================
// REQUEST LOGGER
// ============================================================

app.use(requestLogger);


// ============================================================
// TEST ROUTE
// ============================================================

app.use(userRouter )
//for admin
app.use(adminCategoryRoutes);
app.use(adminProductRoutes);
app.use(adminCustomerRoutes);

//customer
app.use(customerRoutes);
app.use(orderRoutes);
app.use(customerAddressRoutes);


app.get("/test", async (req, res) => {
    try {
        // Log something during request
        req.log.info(
            {
                name: "test"
            },
            "Request waiting"
        );

        // Wait for 1 second
        await new Promise(resolve => {
            setTimeout(resolve, 1000);
        });

        res.status(200).json({
            success: true,
            message: "Test completed"
        });

    } catch (error) {
        req.log.error(
            {
                error: error.message
            },
            "Test request failed"
        );
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});


const startServer = async () => {
    try {
        // Connect MySQL / MongoDB
        const result = await connectDB();
        if (!result) {
            logger.error("Database connection failed");
            process.exit(1);
        }
        logger.info("Database connected successfully");
        // Start Express server
        app.listen(
            PORT,
            "0.0.0.0",
            (err) => {
                if (err) {
                    logger.error(
                        {
                            error: err.message
                        },
                        "App start failed"
                    );
                    process.exit(1);
                }
                logger.info(
                    `Server is running on port ${PORT}`
                );
            }
        );
    } catch (error) {
        logger.error(
            {
                error: error.message
            },
            "Server startup failed"
        );
        process.exit(1);
    }
};
startServer();