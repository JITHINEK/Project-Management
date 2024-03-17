const jwt = require('jsonwebtoken');

const User = require('../model/user');
const { hashData, compareData } = require('../utils/bcrypt');

module.exports.signIn = async (req, res) => {
    try {

        const { userId, password } = req.body;

        if (!userId || !password)
            return res.status(401).json({ error: 'Missing credentials!' });

        const existingUser = await User.findOne({ $or: [{ userId }] });
        if (!existingUser)
            return res.status(404).json({ error: 'User with the provided userId does not exists' });

        if (!compareData(password, existingUser.password))
            return res.status(401).json({ error: 'Incorrect password' });

        const token = jwt.sign({ userId: existingUser.userId, createdAt: existingUser.createdAt },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '8h' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 8 * 3600 * 1000 });

        return res.status(200).json({
            message: "logged in successfull!!"
        })

    } catch (error) {
        console.log(error.message)
    }
}

module.exports.signUp = async (req, res) => {
    try {
        // Extract user data from request body
        const { userId, name, password, email, mobile, role } = req.body;

        // Validate user input (example)
        if (!userId || !name || !password || !email || !mobile || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the user already exists (using userId or email)
        const existingUser = await User.findOne({ $or: [{ userId }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the provided userId or email already exists' });
        }

        const hashedPassword = await hashData(password)

        // Create a new user instance
        const newUser = new User({
            userId,
            name,
            password: hashedPassword,
            email,
            mobile,
            role
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success message and user data
        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error registering user:', error);
        // Handle errors appropriately
        return res.status(500).json({ error: 'Internal server error' });
    }
};
