import mongoose from "mongoose";
import 'colors';
//function to connect to the database

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Database ${mongoose.connection.host} `.gray.bold);
  } catch (error) {
    console.log("DB Error", error);
  }
};
// Export the connectDb function to be used in other files
export default connectDb;