const mongoose = require('mongoose');

const uri = process.env.DB_URL;

async function run() {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Optional: Timeout for server selection
        });

        // Check if the connection is successful by pinging the database
        await mongoose.connection.db.admin().ping();
        console.log("DB connection. You successfully connected to MongoDB!");
    } catch (error) {
        console.log("DB connection. Failed!", error.message);
    }
}

run().catch(console.error);
