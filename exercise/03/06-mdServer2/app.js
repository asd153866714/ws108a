const Koa = require('koa');
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt()

const app = new Koa();
const path = require('path');
const extname = path.extname;

app.use(async function (ctx) {
  const fpath = path.join(__dirname, ctx.path);
  const fstat = await fs.promises.stat(fpath);
  console.log('fpath=', fpath) // 檔案路徑
  if (fstat.isFile()) {
    let ext = extname(fpath) // 檔案副檔名
    console.log('ext=', ext)
    if (ext === '.md') {
      let md = await fs.promises.readFile(fpath, 'utf8')
      let html = mdRender(md) // 函數包括了markdown-it 和html css 的外觀
      ctx.type = '.html'
      ctx.body = html
    } else {
      ctx.type = ext
      ctx.body = fs.createReadStream(fpath)
    }
  }
})

if (!module.parent) {
  app.listen(3000)
  console.log('server run at http://localhost:3000/')
}

function mdRender(md) { // 使用css美化md
  return `
<html>
<head>
  <link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body>
${mdit.render(md)} 
</body>
</html>
  `
} // 樣板字串 可以嵌入函式