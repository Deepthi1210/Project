const express = require('express')
const app = express()
const port = 3000
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();


app.set("view engine", "ejs");
app.get('/', (req, res) => {
  res.render('Water')
})
app.get('/Login', (req, res) => {
  res.render('Login')
})
app.get('/SignUp', (req, res) => {
  res.render('SignUp')
})
app.get('/Fiji', (req, res) => {
  res.render('Fiji')
})
app.get('/evian', (req, res) => {
  res.render('evian')
})
app.get('/acqua', (req, res) => {
  res.render('acqua')
})
app.get('/eternal', (req, res) => {
  res.render('eternal')
})
app.get('/ice', (req, res) => {
  res.render('ice')
})
app.get('/brands', (req, res) => {
  res.render('brands')
})
app.get('/ethos', (req, res) => {
  res.render('ethos')
})
app.get('/penta', (req, res) => {
  res.render('penta')
})
app.get('/voss', (req, res) => {
  res.render('voss')
})
app.get('/wia', (req, res) => {
  res.render('wia')
})

app.get('/loginsubmit',(req,res) => {
  const email=req.query.email;
  const password=req.query.password;
  db.collection('users')
  .where("email","==",email)
  .where("password","==",password)
  .get()
  .then((docs)=>{
    if(docs.size>0){
      res.render('Water');
    }else{
      res.send("<h1> Login Failed use valid credentials.</h1>");
    }
  })
})
app.get('/Signupsubmit',(req,res) => {
  const firstname=req.query.Firstname;
  const lastname=req.query.Lastname;
  const email=req.query.email;
  const number=req.query.number;
  const password=req.query.password;
  db.collection('users').add({
    name: firstname + lastname,
    email:email,
    number:number,
    password: password,
}).then(()=>{
  res.render("signed");
});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})