import {MongoClient} from 'mongodb';
// import appConfig from '../appConfig.js';

// const {mongoUrl} = appConfig;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'testDbSeed';

 async function main () {
  await client.connect()
  console.log(`Database connected successfully to server`);
  const db = client.db(dbName);
  return 'done.';
}


export default main;