import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// read .env file
import dotenv from "dotenv";
dotenv.config();

const app = express();

// setup routes
import postRouter from "./routes/posts.js";
app.use('/posts', postRouter)


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// Setup database
const connectionKey = process.env.CONNECTION_URL,
  port = process.env.PORT || 5000;

mongoose
  .connect(connectionKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));
  })
  .catch((e) => console.log(e.message));

  mongoose.set('useFindAndModify', false)