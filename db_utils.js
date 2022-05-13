const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '.env') }) 
const { MongoClient, ServerApiVersion } = require('mongodb');

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION};

async function dbCommand(action, arg) {
    const uri = `mongodb+srv://${userName}:${password}@cluster0.5h3xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    if (action === "insert") {
        await insert(client, arg);
    } else if (action === "findAll") {
        return await findAll(client);
    } else if (action === "delete") {
        return await del(client, arg);
    }
}

async function insert(client, info) {

    try {
        await client.connect();
        await client.db(databaseAndCollection.db)
                    .collection(databaseAndCollection.collection)
                    .insertOne(info);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function findAll(client) {
    try {
        await client.connect();
        let filter = {};
        const cursor = client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .find(filter);
        const res = await cursor.toArray();
        return res;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function del(client, eventName) {
    try {
        await client.connect();
        return await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .deleteMany({event_name: eventName});
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
module.exports = { dbCommand }