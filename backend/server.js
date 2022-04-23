const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const userSchema = require('./models/user');
const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: './credentials.env' });
const cors = require('cors');

app.use(cors({
    credentials: true,
    origin:["http://localhost:3000", "https://keen-curran-83f4bf.netlify.app"]
}))

app.use(fileUpload());

app.use(express.json({ limit: "50mb" }));
const router = require('./routes/authRoutes');
app.use(router);
const PORT = process.env.PORT || 3001;

connectDB(app, PORT);


