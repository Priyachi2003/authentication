//jshint esversion:6
require("dotenv").config();
const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const path=require("path");
//const encrypt=require("mongoose-encryption");
//const md5=require("md5");
const bcrypt=require("bcryptjs");
const saltRounds=10;

const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

mongoose.connect("mongodb://127.0.0.1:27017/userDB",{useNewUrlParser:true});
const userSchema=new mongoose.Schema({
    email:String,
    password:String
});
const User=new mongoose.model("User",userSchema);

console.log(process.env.API_KEY);

 //console.log(md5("1234"));
 //userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields: ["password"]});


app.get("/",function(req,res){
    res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser=new User({
            email:req.body.username,
            password:hash
            //res.send(email,password);
           
        
        });
        newUser.save().then(function(){
            res.render("secrets");
        }).catch(function(err){
            if(err){
                console.log(err);
               }
        })
        
        });
    });
  
//  newUser.save().then(function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.render("secrets");
//         }
//  });

app.post("/login",function(req,res){
 const username=req.body.username;
const password=req.body.password;
// User.findOne({email:username}).then(function(err,founduser){
//     if(err){
//         console.log(err);
//     }
//     else{
//         if(founduser.password==password){
//             res.render("secrets");

//         }
//     }
// })

// });
User.findOne({email:username}).then(function(founduser){
    
if(founduser){
    bcrypt.compare(password,foundUser.password,function(err,result){
        if(result===true){
            res.render("secrets");
        }
    })
}
}).catch(function(err){
    console.log(err);
})
});




app.listen(3000 ,function(req,res){
    console.log("listening to server 3000");
});