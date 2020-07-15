const Koa = require('koa')
const KoaRouter = require('koa-router')
const koabody = require('koa-body')
const C = require('./get')

var app = new Koa()
const router = new KoaRouter()
app.use(koabody())
app.use(router.routes())

router
.get('/', list)

async function list(){
    let result = await C.list
    console.log("test : ", result)
}

app.listen(3000)
console.log('server run at http://localhost:3000/')