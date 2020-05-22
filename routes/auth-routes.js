const router = require("express").Router()
//google strategy associated with this passport
const passport = require("passport")
const passportSetup = require("../config/passport-setup")

//login auth

router.get("/login",(req,res)=>{
    res.render("login",{user:req.user})
})


//auth logout
router.get("/logout",(req,res)=>{
   //logout with passport
   req.logout()
    res.redirect("/")
})
//auth with google

router.get("/google",passport.authenticate("google",{
    scope: ["profile"]
}))

//callback route for google to redirect
// with this below redirect we get code from google, so we used passport.authenticate below and there it fires callback mentioned in passport-setup
router.get("/google/redirect",passport.authenticate("google"),(req,res)=>{
    // res.send("you reached the callback URI")
    res.redirect("/profile/")
})

module.exports = router