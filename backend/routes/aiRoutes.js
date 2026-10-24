
const express = require("express");
const router = express.Router();

// Temporary test route
router.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI route is working"
    });
});

module.exports = router;
