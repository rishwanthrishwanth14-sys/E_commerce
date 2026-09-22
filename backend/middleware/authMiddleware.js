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

         const parts = authHeader.trim().split(/\s+/);
        if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
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
        return next();
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
    console.log("ADMIN CHECK:", req.user);
    if (
        !req.user ||
        req.user.isUser !== true ||
        req.user.role !== "user"
    ) {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }

    return next();
};

const isCustomer = (req, res, next) => {
    if (
        !req.user ||
        req.user.role !== "customer" ||
        !req.user.customerId
    ) {
        return res.status(403).json({
            success: false,
            message: "Customer access required"
        });
    }
    return next();
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
    return next();
};

module.exports = {
    authenticate,
    isAdmin,
    isCustomer,
    isOwnerCustomer
};