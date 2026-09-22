require("dotenv").config();

const cors = require("cors");
const express = require("express");
const path = require("path");

// Admin routes
const adminCategoryRoutes = require("./routes/routesForAdmin/categoryRoutes");
const adminProductRoutes = require("./routes/routesForAdmin/productRoutes");
const adminCustomerRoutes = require("./routes/routesForAdmin/customerRoutes");
const adminProductImageRoutes = require("./routes/routesForAdmin/productImageRoutes");
const adminOrderRoutes = require("./routes/routesForAdmin/orderRoutes");
const userRoutes = require("./routes/routesForAdmin/userRoutes");

// Customer routes
const customerRoutes = require("./routes/routesForCustomer/customerRoutes");
const orderRoutes = require("./routes/routesForCustomer/orderRoutes");
const customerAddressRoutes = require("./routes/routesForCustomer/customerAddressRoutes");
const productRoutes = require("./routes/routesForCustomer/productRoutes");
const cartRoutes = require("./routes/routesForCustomer/cartRouts");

const { connectDB } = require("./config/db");
const { logger, requestLogger } = require("./services/loggerService");

const app = express();
const PORT = process.env.PORT || 2525;

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use(express.json());
app.use(cors());
app.use(requestLogger);

// Admin
app.use(userRoutes);
app.use(adminCategoryRoutes);
app.use(adminProductRoutes);
app.use(adminCustomerRoutes);
app.use(adminProductImageRoutes);
app.use(adminOrderRoutes);

// Customer
app.use(customerRoutes);
app.use(orderRoutes);
app.use(customerAddressRoutes);
app.use(productRoutes);
app.use(cartRoutes);

app.get("/test", async (req, res) => {
    try {
        req.log.info({ name: "test" }, "Request waiting");

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        res.status(200).json({
            success: true,
            message: "Test completed"
        });
    } catch (error) {
        req.log.error(
            { error: error.message },
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
        const result = await connectDB();

        if (!result) {
            logger.error("Database connection failed");
            process.exit(1);
        }

        logger.info("Database connected successfully");

        app.listen(PORT, "0.0.0.0", (error) => {
            if (error) {
                logger.error(
                    { error: error.message },
                    "App start failed"
                );
                process.exit(1);
            }

            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error(
            { error: error.message },
            "Server startup failed"
        );
        process.exit(1);
    }
};

startServer();
