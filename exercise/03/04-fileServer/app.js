const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const path = require('path')

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path)
  console.log('__dirname=', __dirname) // 根目錄
  console.log('fpath=', fpath) // file path 檔案路徑 (根目錄 + 檔案名稱)
  const fstat = await fs.promises.stat(fpath)
  console.log('fstat=', fstat)
  if (fstat.isFile()) {
    let type = path.extname(fpath) // 檔案類型與副檔名相同
    console.log('type=', type)
    ctx.type = type // 檔案類型
    console.log('ctx.type=', ctx.type)
    ctx.body = fs.createReadStream(fpath) // 用串流方式傳回
  }
})

app.listen(3000)
console.log('server run at http://localhost:3000/')

