// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection URI
require('dotenv').config();

// Export the connect function
async function connect() {
  const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
    //   strict: true,
      deprecationErrors: true,
      useCreateIndex: true
    }
  });

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client; // Return the connected client
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Throw the error to handle it outside
  }
}

module.exports = connect;
