// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";
// import { dirname } from 'path';

// // /* CONFIGURATIONS */
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // dotenv.config();
// // const app = express();
// // app.use(express.json());
// // app.use(helmet());
// // app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// // app.use(morgan("common"));
// // app.use(bodyParser.json({ limit: "30mb", extended: true }));
// // app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// // app.use(cors());
// // app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// // /* FILE STORAGE */
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "public/assets");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname);
// //   },
// // });
// // const upload = multer({ storage });

// // /* ROUTES WITH FILES */
// // app.post("/auth/register", upload.single("picture"), register);
// // app.post("/posts", verifyToken, upload.single("picture"), createPost);

// // /* ROUTES */
// // app.use("/auth", authRoutes);
// // app.use("/users", userRoutes);
// // app.use("/posts", postRoutes);

// // /* MONGOOSE SETUP */
// // const PORT = process.env.PORT || 6001;
// // mongoose
// //   .connect(process.env.MONGO_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => {
// //     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

// //     /* ADD DATA ONE TIME */
// //     // User.insertMany(users);
// //     // Post.insertMany(posts);
// //   })
// //   .catch((error) => console.log(`${error} did not connect`));




import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js"; // route folder where we have the path and the routes for every type of auth feature 
    /* we didn't do it for `add.post("/auth/register", upload.single("picture"), register);` this should normally be in the above auth 
    file, because we need the `upload` - which is to be set in the index file.
    */
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";

// to properly set the paths
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";
import { dirname } from 'path';

// CONFIGURATIONS --> all the middleware (something that runs between different requests/responses)
const __filename = fileURLToPath(import.meta.url); // --> to grab the file url, specifically when we use modules
const __dirname = path.dirname(__filename); // --> only when we use the type 'modules'
dotenv.config(); // --> to use .env files
const app = express();
app.use(express.json()); // --> invoke to use middleware
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // for Cross Origin
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true })); // limit even after extended
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // --> This invokes the CROSS ORIGIN SHARING POLICIES
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // store assets (images, etc) locally.

// FILE STORAGE ****** FROM GITHUB REPO OF MULTER ******
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets")
    },
    // filename: function(req, file, cb) {
    //     cb(null, file.originalname)
    // }
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
      }
});
// // // configure multer storage
// // const storage = multer.diskStorage({
// //     filename: function(req, file, cb) {
// //       cb(null, Date.now() + file.originalname);
// //     }
// //   });

const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
    /*      route that      middleware: upload the      controller: logic of saving user
            we are going    picture locally into the    into the DB, the functionalities
            to hit           public/assets folder
                            (occurs before the actual
                                logic -- register)       */  
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRoutes); // --> helps set up routes and keep our files organised.
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));

/*  ************************************ */

// import express from "express";
// const app = express();
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { dirname } from 'path';


// const port = process.env.PORT || 6001;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(express.static(__dirname + '/public'));

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });