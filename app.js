const express = require("express")
const app = express()
const authRoutes = require("./routes/auth-routes")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const key = require("./config/keys")
const passport = require("passport")
const profileRoutes = require("./routes/profile-routes")
mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true})
mongoose.connection.once('open',function () {
    console.log('Connected');
}).on('error',function (error) {
    console.log('CONNECTION ERROR:',error);
});

app.set("view engine","ejs")
app.use(cookieSession({
    maxAge:24 * 60 *60 *1000,
    keys:[key.google.session.cookieKey]
}))
//cookie setup
//initialize passport
app.use(passport.initialize())
app.use(passport.session())
//set routes

app.use("/auth",authRoutes)
app.use("/profile",profileRoutes)


app.get("/",(req,res)=>{
    res.render("home",{user:req.user})
})

app.listen(3000,()=>{
    console.log("Listening on 3000")
})