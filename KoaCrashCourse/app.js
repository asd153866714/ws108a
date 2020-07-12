const Koa = require('koa')
const KoaRouter = require('koa-router')
const json = require('koa-json')

const app = new Koa()
const router = new KoaRouter()

// JSON Pretier middleware
app.use(json())

// router