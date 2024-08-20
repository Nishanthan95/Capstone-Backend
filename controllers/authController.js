const User = require('../models/User');
const { generateToken, hashPassword, comparePassword } = require('../config/auth');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = generateToken(newUser);

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
