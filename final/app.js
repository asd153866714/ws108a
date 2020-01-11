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

app.keys = ['*@&))9kdjafda;983'] 
const CONFIG = { 
  key: 'd**@&(_034k3q3&@^(!$!',
  maxAge: 86400000
}
app.use(session(CONFIG, app)) // session 要放在 router 前面

app.use(router.routes())
app.use(serve(__dirname + '/public'));

router
.get('/', async (ctx) => { // render要顯示的頁面
    ctx.session.error = undefined
    ctx.session.error_r = undefined
    
    let userid = ctx.session.userID
    console.log('ctx.session.userID:',userid)
    await ctx.render('index',{ // render index.html
        userid
    })
})

.get('/register', async (ctx) => {
    let message = ctx.session.error_r
    await ctx.render('register',{
        message
    })
})

.post('/register', register)

.get('/login', async (ctx) => {
    let message = ctx.session.error
    await ctx.render('login',{
        message
    })
})
.post('/login', login)

.get('/logout',logout)

.get('/cart', async (ctx) =>{
    await ctx.render('cart')
})

.get('/test',async (ctx) =>{
    await ctx.render('test')
})


async function register(ctx){
    const userData = ctx.request.body // 取得頁面的資料 (帳號，密碼)
    console.log("register:",userData)

    if (await M.get(userData.id) == null){ // 確認帳號是否重複 **await 確保 M.get()讀取完資料
        console.log("userdata:",M.get(userData.id))
        await M.add(userData)
        console.log("sign up success!")
        ctx.redirect('/')
    }
    else {
        ctx.session.error_r = "帳號已被使用"
        ctx.redirect('/register')
    }
}  

async function login(ctx){
    let {id, password} = ctx.request.body
    console.log("login()_msg:",id,password)

    let find_login =  await M.get(id)

    if (find_login != null){ // 確認使用者資料是否存在

        if (find_login.password == password){ // 確認密碼
            ctx.session.userID = id
            ctx.session.error = undefined
            console.log('login success')
            ctx.redirect('/')
        }

        else {
            ctx.session.error = "密碼錯誤"
            ctx.redirect('/login')
        }
    }
    else {
        ctx.session.error = "用戶不存在"
        ctx.redirect('/login')
    }
}

async function logout(ctx){
    console.log("logout test")
    ctx.session.userID = undefined // 清除 session 紀錄的登入資料
    ctx.redirect('/')
}

async function main() {
    await M.open()
    app.listen(3000)
    console.log("server run at http://localhost:3000/")
}

main()


