//导入express
const express = require('express')

//创建服务
const app = express()

//导入路由
const router = require('./router/router')

//导入bodyParser
const bodyParser = require('body-parser')

//处理post请求
app.use(express.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//挂载路由
app.use('/book', router)

//监听端口
app.listen(3000, function() {
    console.log('server start')
})