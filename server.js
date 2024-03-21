const express=require('express');
const app=express();
const connect=require('./bookDB');
const connect1=require('./msgDB');
const connect2=require('./accDB');
const connect3=require('./accDB');
const body_parser=require('body-parser');
const { render } = require('ejs');
app.use('/assets',express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
// connect();
app.set("view engine", "ejs");

app.get('',(req,res)=>{

    // res.sendFile(__dirname+"/public/log.html");
    res.render("log");
})

app.get('/reg',(req,res)=>{
    res.render("reg");
})
// password campare
app.get('/home',async (req,res)=>{
    let coll=await connect3();
    // console.log(coll);
    let result=await coll.find({username:req.query.username,password:req.query.password}).toArray();
    if(result.length>0) {
       res.render('home')
    }
    res.render("errlog");
})

app.get('/booking',(req,res)=>{
    // res.sendFile(__dirname+"/public/booking.html");
    // // res.redirect
    
    res.render("booking")
})

app.get('/pay',(req,res)=>{
    // res.sendFile(__dirname+"/public/pay.html");
    res.render("pay")
})



app.post('',async (req,res)=>{
    console.log(req.body)
    let coll=await connect();
    coll.insertOne(req.body);
    res.send('succesfully submitted');
})

app.post('/reg',async (req,res)=>{
    console.log(req.body)
    let coll=await connect2();
    coll.insertOne(req.body);
    // res.sendFile(__dirname+"/public/log.html");
    res.render("log")
})

app.post('/home',async (req,res)=>{
    console.log(req.body)
    let coll=await connect1();
    coll.insertOne(req.body);
   
    res.send('succesfully submitted');
})
// price backend calculation start.
app.post('/booking',async (req,res)=>{
    console.log(req.body)
    let coll=await connect();
    coll.insertOne(req.body);
    let bill=req.body.attendees;
    bill=bill*500;

   
    res.render("pay",{total:bill,name:req.body.fullname,email:req.body.email})
})
 // price backend calculation end.



app.listen(5000,()=>{
    console.log("server started")
});