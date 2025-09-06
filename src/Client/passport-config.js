const localStrategy = require('passport-local').Strategy
const bcrypt=require('bcrypt')

function initialize(passport, getUserByEmail,getUserById){
    const AuthenticateUser = async(email,password,done)=>{
        const user=getUserByEmail(email)
        if(user==null){
        return done(null,false,{message: 'No user with that email'})
    }

    try{
        if(await bcrypt.compare(password, user.password)){

        }
        else{
            return done(null,false,{message: 'Password incorrect'})
        }

    }catch (e){
        return done(e)

    }
}
    passport.use(new localStrategy({usernameField:'email'},
    authenticateUser))
    passport.serializeUser((user,done)=>done(null, user.id))
    passport.deserializeUser((id,done)=>{
        return done(null, getUserById(id))
    })
}


module.exports = initialize