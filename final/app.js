const M = require('./model')
const Koa = require('koa')
var serve = require('koa-static')
const session = require('koa-session')
var KoaRouter = require('koa-router')
var koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const views = require('koa-views')


var app = new Koa()
const router = new KoaRouter()

app.use(views('view', {map:{html:'ejs'}})) // 使用 ejs midleware(模板引擎) **要放在router啟動之前**
app.use(koaLogger())
app.use(koaBody())
app.use(router.routes())
app.use(serve(__dirname + '/public'));

app.keys = ['*@&))9kdjafda;983'] 
const CONFIG = { 
  key: 'd**@&(_034k3q3&@^(!$!',
  maxAge: 86400000
}

app.use(session(CONFIG, app))

router
.get('/', async (ctx) => { // 問題: 前端無法隨著 userID 改變 登入/登出 圖示
    let title = 'ejs test'
    let userid = ctx.session.userID
    await ctx.render('index',{
        title, userid
    })
})

.get('/register', async (ctx) => { // ejs 渲染頁面
    await ctx.render('register',{})
})

.post('/register', register)

.get('/login', async (ctx) => {
    await ctx.render('login',{})
})
.post('/login', login)

.get('/error', async (ctx)=> { // 問題: 尋找類似 alert() 的方式, 不用重新切換頁面
    await ctx.render('error',{})
})

.get('/logout',logout)


async function register(ctx){
    const userData = ctx.request.body
    await M.add(userData)
    ctx.redirect('/')
}  

async function login(ctx){
    let {id, password} = ctx.request.body
    console.log("login()_msg:",id,password)
    if ( await M.get(id,password) != null){
        ctx.session.userID = id
        ctx.redirect('/')
        console.log('login success')
    }
    else {
        ctx.redirect('/error')
    }
}

async function logout(ctx){
    console.log("logout test")
    ctx.session.userId = undefined
    ctx.redirect('/')
}

async function main() {
    await M.open()
    app.listen(3000)
    console.log("server run at http://localhost:3000/")
}

main()


