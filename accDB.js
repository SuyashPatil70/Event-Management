const {MongoClient}=require('mongodb');
const url='mongodb://127.0.0.1:27017';
const client=new MongoClient(url);
async function connection() {
    let result=await client.connect();
    var database=result.db('evento');
    let coll=database.collection('account');
    console.log("Connection succesfully");
    return coll;
}
// connection();
module.exports=connection;