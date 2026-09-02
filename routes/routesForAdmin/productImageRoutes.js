const express = require("express");

const router = express.Router();

const productImageController = require("../../controllers/productImageController");

const{
    authenticat,
    isAdmin
}=require("../../middleware/authMiddleware");

router.post("/api/uplode")