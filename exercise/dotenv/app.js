const Koa = require('koa')

const app = new Koa()

require('dotenv').config()

app.use(ctx => {
    console.log(
        'DB_USER:', process.env.DB_USER,
        '\nDB_PASS:', process.env.DB_PASS)
    ctx.body = 'dotenv test, checkout terminal'
})

app.listen(process.env.PORT)
console.log('Server run at http://localhost:3000')