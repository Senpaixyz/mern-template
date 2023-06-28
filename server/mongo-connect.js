const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_cluster = process.env.DB_CLUSTER;
const db_name = process.env.DB_NAME;

const uri = `mongodb+srv://${db_username}:${db_password}@${db_cluster}.3atacpl.mongodb.net/?retryWrites=true&w=majority`;

const mongoose_uri = `mongodb+srv://${db_username}:${db_password}@${db_cluster}.3atacpl.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const mongoose_connect = (query) => {
  try{
      return new Promise((resolve,reject) => {
            mongoose.connect(
              mongoose_uri, 
              {
                useNewUrlParser: true,
                useUnifiedTopology: true
              }
            );
            const db = mongoose.connection;
            db.on("error", console.error.bind(console, "Mongoose Connection Error: "));
            db.once("open", function () {
              console.log("Mongoose Connected Starting to Query...");
              resolve(query());
            });
      });
  }
  catch(e){
    throw new Error(e);
  }
}

async function execute(callback){
  return new Promise(async (resolve, reject) => {
      try {
        const queryResult = await mongoose_connect(callback);
        resolve(queryResult);
      } 
      catch(e){
        reject(e);
      }
      finally{
        await client.close();
      }
  });

}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(db_name).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {run, execute}

