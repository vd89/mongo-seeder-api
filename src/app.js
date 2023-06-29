import express from 'express';
import mongoSeeder from './dbSeeder/mongoSeeder.js';

const app = express()

const testRes = (req,res) => {
  try {
    const testData = {
      testDetails: 'The test is working fine ',
    };
    return res.json({ message: 'SUCCESS', data: testData });
  } catch (e) {
    console.error(e)
  }
 }
mongoSeeder()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/' , testRes);

export default app
