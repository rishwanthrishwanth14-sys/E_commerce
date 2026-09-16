
const userModel = require("../models/userModels");

const {
    hashPassword,
    comparePassword, 
    generateToken
} = require("../services/authService")


//create user
const createUser = async (req, res) => {

    try {

        const {
            firstname,
            lastname,
            email,
            password,
            userType,
            image,
            status,
            createdBy
        } = req.body;

        // VALIDATION
        if (!firstname) {
            return res.status(400).json({
                success: false,
                message: "Firstname is required"
            });
        }

        if (!lastname) {
            return res.status(400).json({
                success: false,
                message: "Lastname is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const hashedPassword = await hashPassword(password);
        console.log({
            firstname,
            lastname,
            email,
            password,
            hashedPassword,
            userType,
            image,
            status,
            createdBy
        });

        // MODEL
        const result = await userModel.createOneUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            userType: userType ?? 2,
            image,
            status: status ?? 1,
            createdBy
        });


        // RESPONSE
        res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: result.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
        });
    }
};

//get all user 

const getUsers = async (req, res) => {

    try {
        const users = await userModel.getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "faild to fetch user",
            error: error.message
        });
    }
};

// get user by id
const getUserById = async (req, res) => {

    try {
        const user = await userModel.getUserById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        });
    }
};

//updte user

const updateUser = async (req, res) => {

    try {

        const {
            firstname,
            lastname,
            email,
            userType,
            image,
            status,
            updatedBy
        } = req.body;
        const result = await userModel.updateUserById(
            req.params.userId,
            {
                firstname,
                lastname,
                email,
                userType,
                image,
                status,
                updatedBy
            }
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "user updated successfuly"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        });
    }
};

//delete user 

const deleteUser = async (req, res) => {
    try {
        const loggedUserId = req.user.userId 
        const logggedUserType = req.user.userType

        // normal user cannot delete other users 
        // user type 0 is admin
            if (logggedUserType !== 1) {
                return res.status(403).json({
                    success: false,
                    message: "access denied"
                })
            }

        const result = await userModel.deleteUserByUserId(
            req.params.userId,
            loggedUserId
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }

};

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // VALIDATION
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }


        // GET USER BY EMAIL
        const user = await userModel.getUserByEmail(email);


        // CHECK USER
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // COMPARE PASSWORD
        const isPasswordValid = await comparePassword(
            password,
            user.password
        );


        // WRONG PASSWORD
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // GENERATE JWT
        const token = generateToken({
            userId: user.userId,
            userType: user.userType,
            isUser: true
        });

        // SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
}
