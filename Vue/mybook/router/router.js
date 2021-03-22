//导入express
const express = require('express')

//使用express路由
const router = express.Router()

//导入方法
const routerMethods = require('./router/book')

//查询图书列表
router.get('/', routerMethods.getAllBooks)

//添加图书
router.post('/', routerMethods.addBook)

//编辑图书
router.put('/toEdit/:id', routerMethods.editBook)

//删除图书
router.delete('/:id', routerMethods.deleteBook)

//查看图书是否存在
router.get('/:name', routerMethods.checkName)

//导出路由模块
module.exports = router