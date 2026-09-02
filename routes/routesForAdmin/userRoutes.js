const express = require("express");

const router = express.Router();

const userController = require("../../controllers/userController");
const { authenticate, isAdmin } = require("../../middleware/authMiddleware");


router.post("/api/user", userController.createUser);

router.post("/api/user/login",userController.loginUser);

router.get("/api/users",authenticate,isAdmin, userController.getUsers);

router.get("/api/user/:userId",authenticate,isAdmin, userController.getUserById);

router.put("/api/user/:userId",authenticate,isAdmin, userController.updateUser);

router.delete("/api/user/:userId",authenticate,isAdmin ,userController.deleteUser);

 
module.exports = router;