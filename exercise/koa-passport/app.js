const { ConnectionBase } = require("mongoose");
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session')
const RedisStore = require('koa-redis')
const app = new Koa()

const passport = require('./passport')
const baseConf = require('./config/base')
const redisConf = require('./config/redis')

