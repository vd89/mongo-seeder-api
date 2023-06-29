import casual from 'casual';
import { MongoClient } from 'mongodb'
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function mongoSeeder() {
    // Connection URL
    const uri = "mongodb://admin-user:admin-password@localhost:27017/testDbSeed?authSource=admin";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,

    });
    // Database Name
    const dbName = 'testDbSeed';
    try {
        const connections = await client.connect();
        await connections.db(dbName).dropCollection("kitty-litter-time-series");
        await connections.db(dbName).dropCollection("users");
        const collection =  connections.db(dbName).collection("kitty-litter-time-series");

        let timeSeriesData = [];
        const userCollection =  connections.db(dbName).collection('users');
        let users=[];
        for (let i = 0; i < 500000; i++) {
            const user ={
                name: casual.first_name,
                lastName: casual.last_name,
                email: casual._email(),
                password: casual.password,
                country: casual.country,
                city: casual.city,
            }
            users.push(user)
        }

        for (let i = 0; i < 500000; i++) {
            const firstName = casual.first_name;
            const lastName = casual.last_name;
            let newDay = {
                cat: casual.word,
                owner: {
                    email: casual.email,
                    firstName,
                    lastName,
                },
                events: [],
            };

            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newEvent = {
                    timestamp_event: casual.date(),
                    weight: randomIntFromInterval(14,16),
                }
                newDay.events.push(newEvent);
            }
            timeSeriesData.push(newDay);
        }
        await collection.insertMany(timeSeriesData);
        await userCollection.insertMany(users)
        console.log("Database seeded! :)");
        await client.close();
    } catch (err) {
        console.log(err);
    }
}

export default mongoSeeder;