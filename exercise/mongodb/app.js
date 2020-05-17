const Koa = require('koa')
const KoaRouter = require('koa-router')
const koabody = require('koa-body')
const L = require('./test')

var app = new Koa()
const router = new KoaRouter()
app.use(koabody())
app.use(router.routes())

router
.get('/', list)

async function list(){
    let result = await L.findOne({user_id: 'bill'})
    console.log("test : ", result)
}

app.listen(3000)