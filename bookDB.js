const {MongoClient}=require('mongodb');
const url='mongodb://127.0.0.1:27017';
const client=new MongoClient(url);
async function connection() {
    let result=await client.connect();
    var database=result.db('evento');
    let coll=database.collection('booking');
    console.log("Connection succesfully");
    // coll.insertOne({name:'prathmesh', id:123});
    // let record=await coll.find({name:'suyash'}).toArray();
    // console.log(record[1].name);
    return coll;
}
// connection();
module.exports=connection;