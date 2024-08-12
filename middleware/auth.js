const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Check if the Authorization header is present
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, "secret_token");
        req.user = decoded; // Assuming the token contains user_id and email
        console.log("Authenticated user:", req.user); // Log the decoded token for debugging
        next();
    } catch (err) {
        res.status(401).json({ error: "Token is not valid" });
    }
};

module.exports = auth;
