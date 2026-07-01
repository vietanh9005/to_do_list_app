import mongoose from "mongoose";

const connectDB = async () => {
    const connectionString =
        process.env.MONGODB_CONNECTION_STRING ||
        process.env.MONOGODB_CONNECTION_STRING;

    if (!connectionString) {
        throw new Error("Missing MONGODB_CONNECTION_STRING environment variable");
    }

    try {
        await mongoose.connect(connectionString);

        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
