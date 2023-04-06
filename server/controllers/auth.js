import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
    // async because we are making calls to the mongo database - it's like an API call. req, res: provide us with data from the frontend and to the frontend respectively.
export const register = async(req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body;
        const salt = await bcrypt.genSalt(); // we create a random 'salt' provided by `bcrypt` (encryption) - to encrypt password
        const passwordHash = await bcrypt.hash(password, salt);

        /*  - encrypt the password; 
            - save it;
            - when the user tries to log in, user provides password which will be salted again and compared to stored salt
            - if correct, we provide the JWT
        */
        const newUser = new User({ 
            firstName, 
            lastName, 
            email, 
            password: passwordHash, 
            picturePath, 
            friends, 
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // send the user back if there are no errors. -- the frontend receives the information.
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// LOGGING IN --> AUTHENTICATION
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if(!user) {
            return res.status(400).json({ msg: `User ${email} does not exist.`});
        } 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: "Invalid password"}); 
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // the secret string is used to _____________
        delete user.password; // so that the password is not sent back again to the frontend
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// AUTHORISATION - blocks certain features for non logged-in user.
