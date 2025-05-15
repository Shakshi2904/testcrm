const authService = require("../services/authService");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role_id } = req.body;
        const user = await authService.signupService({ name, email, password, role_id });
        res.json({ message: "Signup successful! Please sign in." });
    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.signinService({ email, password });
        res.json({ 
            token: result.token, 
            userId: result.userId, 
            role: result.role, 
            message: "Signin successful!" 
        });
    } catch (err) {
        console.error("Signin Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};