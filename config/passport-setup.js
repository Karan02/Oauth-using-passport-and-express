const passport = require("passport")
const User = require("../models/user-modal")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("./keys")

// takes from passport callback, and give it to cookie
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
//takes from browser sent cookie 
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>done(null,user))
})
passport.use(new GoogleStrategy({
    //options for strategy
    callbackURL:"http://localhost:3000/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
    //passport callback fn
    
    //check user exist in DB
    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
            console.log("user exist already",currentUser)
                //pass to serializeUser

            done(null,currentUser)
        }else{
            // console.log("profile._json.image.url",profile._json.picture)
            new User({
                username:profile.displayName,
                googleId:profile.id,
                thumbnail:profile._json.picture
            }).save().then((newUser)=>{
                console.log("saved user")
                //pass to serializeUser
                done(null,newUser)
            })
        }
    })

    
})
)