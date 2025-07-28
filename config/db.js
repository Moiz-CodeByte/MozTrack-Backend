const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI environment variable is not set');
            process.exit(1);
        }

        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Add connection error handler
        mongoose.connection.on('error', err => {
            console.error(`MongoDB connection error: ${err}`);
        });
        
        // Add disconnection handler
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
        
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        console.error('Full error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
