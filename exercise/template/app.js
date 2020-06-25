const Koa = require('koa')
const KoaRouter = require('koa-router')
const views = require('koa-views')

const app = new Koa
const router = new KoaRouter

// 在 router 之前啟動
// 選擇資料夾, 要轉換的格式
app.use(views('views', {map:{html:'ejs'}}))
app.use(router.routes())

router.get("/", async (ctx) => {
    await ctx.render('index',{
        title: "EJS test", n: 10
    })
})

app.listen(3000)
console.log("server run at http://localhost:3000")