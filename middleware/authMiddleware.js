const {
    verifyToken
} = require("../services/authService");
// ============================================================
// AUTHENTICATE
// ============================================================
const authenticate = (req, res, next) => {
    try {
        const authHeader =
            req.headers.authorization;

            console.log(authHeader)
        // CHECK AUTHORIZATION HEADER
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required"
            });
        }
        // EXPECTED FORMAT:
        // Bearer TOKEN

        const parts =
            authHeader.split(" ");
        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });

        }
        const token = parts[1];
        // VERIFY TOKEN
        const decoded = verifyToken(token);
        // STORE USER INFORMATION
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
// ============================================================
// ADMIN ONLY
// ============================================================
const isAdmin = (req, res, next) => {

    // admin routes are reserved for logins that came through the
    // /api/user/login endpoint (the "user" table), never customer logins
    const isAdminToken =
        req.user &&
        req.user.isUser === true &&
        req.user.role !== "customer";

    if (!isAdminToken) {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }
    next();
};

const isCustomer = (req, res, next) => {
    if (
        !req.user ||
        req.user.role !== "customer"
    ) {
        return res.status(403).json({
            success: false,
            message: "Customer access required"
        });
    }
    next();
};

const isOwnerCustomer = (req, res, next) => {
    if (
        !req.user ||   // intha customer info db la iruka nu paka
        req.user.role !== "customer" || // customer oda roll check panni customer ahh irundha matum allow pannum
        !req.user.customerId // 
    ) {
        return res.status(403).json({
            success: false,
            message: "Customer access required"
        });
    }
    if (
        req.params.customerId &&
        Number(req.params.customerId) !== Number(req.user.customerId)
    ) {
        return res.status(403).json({
            success: false,
            message: "You can only access your own data"
        });
    }
    next();
};

module.exports = {
    authenticate,
    isAdmin,
    isCustomer,
    isOwnerCustomer
};