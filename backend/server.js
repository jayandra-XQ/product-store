import express from 'express';
import dotenv from "dotenv"
import mongoose from'mongoose';

import productRoutes from './routes/product.route.js'

dotenv.config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err)=> {
  console.error(err.message);
  process.exit(1);
})

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})

app.use("/api/products", productRoutes)

