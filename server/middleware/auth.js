import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => { // `next` allows the function to continue.
    try {
        let token = req.header("Authorization"); // from the request from the frontend, we are grabbing the Authorization Header where token will be set.
        if(!token) {
            return res.status(403).send("Access Denied"); // when toke  doesn't exist || we are not even sending the token
        }
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft(); //we want the token to start with 'Bearer' and we will take everything from 7th char to end
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // so that the function will proceed to the next step.
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}