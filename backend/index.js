const express=require("express");
const dotEnv=require("dotenv").config();
const mongoose=require("mongoose");
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes');
const path=require('path');
const cors=require('cors');

const app=express()
const port=process.env.PORT || 4000;

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);//use the models,routers,controllers 
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

const rawMongoUrl = (process.env.MONGO_URL || '').trim().replace(/,$/, '');
const mongoUrl = rawMongoUrl && rawMongoUrl.includes('mongodb') ? rawMongoUrl : 'mongodb://127.0.0.1:27017/foodie';

const connectMongo = async (uri, label) => {
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected successfully (${label})`);
    return true;
  } catch (error) {
    console.error(`MongoDB connection failed (${label}):`, error.message);
    return false;
  }
};

(async () => {
  const connected = await connectMongo(mongoUrl, 'configured');
  if (!connected) {
    await connectMongo('mongodb://127.0.0.1:27017/foodie', 'local fallback');
  }
})();

app.listen(port,()=>{console.log(`server connected at ${port}`)})

app.use('/info',(req,res)=>{res.send("<h1>Hi! This is Srinath</h1>")})