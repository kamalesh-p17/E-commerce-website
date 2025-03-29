import mongoose from "mongoose";

const connectDB = async () => {
    try{
      const connectionInstance = await mongoose.connect(`${process.env.db}/e-commerce`);
      console.log("Mongoodb connection success");
    }
    catch(err){
      console.log(`Mongodb connection error \nError : ${err}`);
      process.exit(1);
    }
  }

  export default connectDB;