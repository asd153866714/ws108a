const serve = require('koa-static')
const KoaRouter = require('koa-router')
const Koa = require('koa')
const koaBody =require('koa-body')
const app = new Koa()
const router = new KoaRouter

app.use(serve(__dirname))
app.use(koaBody())
app.use(router.routes())

router
.get('/test', async(ctx) => {
    await ctx.redirect("test.html")
    ctx.body = 'AJAX fetch GET test!'
})
.post('/post', async(ctx) => {
    let p_data = ctx.request.body
    console.log("test:", p_data)
    ctx.body = 'AJAX fetch POST success!'
})


app.listen(3000)

console.log('server run at http://localhost:3000/')