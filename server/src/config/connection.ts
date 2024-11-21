import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/pet_social_network_db');  // The end part is the database name. If it does not exist, it will be created

export default mongoose.connection;