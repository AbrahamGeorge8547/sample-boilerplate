import mongoose, { connect } from "mongoose";
import config from "../config";


let db: any;

const connectDB = async () => {
    try {
        const mongoURI: any = config.mongodb.url
        const options: any = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await connect(mongoURI, options);
    } catch (err: any) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};


export default connectDB;