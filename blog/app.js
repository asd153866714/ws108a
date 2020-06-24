const V = require("./view");
const M = require("./model");
const Koa = require('koa')
var KoaRouter = require('koa-router')
var koaLogger = require('koa-logger')
const koaBody = require('koa-body')

const app = new Koa()
const router = new KoaRouter()

app.use(koaLogger())
app.use(koaBody())

app.use(router.routes())

router
.get('/', list)
.get('/post/new', add)
.get('/post/:id', show)
.post('/create', create)
.get('/delete/:id', remove)

async function list(ctx) {
    const posts = await M.list()
    console.log(posts)
    ctx.body = await V.list(posts)
}

async function add(ctx) {
    ctx.body = await V.new()
}

async function show(ctx) {
    const id = ctx.params.id
    console.log('id:', id)
    const post = await M.get(id)
    if (post) {
        ctx.body = await V.show(post)
    }
    else {
        ctx.status = 404
    }
    // if (!post) ctx.throw(404, 'invalid post id')
    // ctx.body = await V.show(post)
}

async function create(ctx) {
    const post = ctx.request.body
    await M.add(post)
    ctx.redirect('/')
}

async function remove(ctx){
    const id = ctx.params.id
    await M.remove(id)
    ctx.redirect('/')
}

(async function (){
    await M.open()
    app.listen(3000)
    console.log('Server run at http://localhost:3000')
}())