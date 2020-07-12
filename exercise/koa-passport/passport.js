const passport = require('koa-passport')
const { use } = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    console.log('serializeUser:',user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser:', id)
    var user = {id: 1, username: 'admin', password: '123456'}
    done(null, user)
})

passport.use(new LocalStrategy({
  // usernameField: 'email',
  // passwordField: 'passwd'    
}, (username, password, done) => {
    console.log('LocalStrategy', username, password)
    var user = {id: 1, username: username, password: password}
    done(null, user, {msg: 'this is a test'})
}))

module.exports = passport