//图书数据
const data = require('./../../data.json')

//导入node核心模块path
const path = require('path')

//导入核心模块fs
const fs = require('fs')

//查询图书中id最大的
let maxBookCode = () => {
    let arr = []
        //通过foreach循环把所有id放入数组中
    data.forEach((item) => {
            arr.push(item.id)
        })
        //apply不仅会调用函数，把数组转化为一个个的值
    return Math.max.apply(null, arr)
}

//把内存中的数据写入到文件中
let writeDataToFile = (res) => {
    fs.writeFile(path.join(__dirname, '../', '../', 'data.json'), JSON.stringify(data, null, 4), (err) => {
        if (err) {
            res.json({
                status: 500
            })
        } else {
            res.json({
                status: 200
            })
        }
    })
}


//查询所有图书
exports.getAllBooks = (req, res) => {
    res.json(data)
}

//添加图书
exports.addBook = (req, res) => {
    //获取表单数据
    let info = req.body;
    let book = {}
    for (let k in info) {
        book[k] = info[k]
    }
    book.data = 2525609975000;
    //id为最大的数加一
    book.id = maxBookCode() + 1
    data.push(book)

    //把内存数据写入到文件当中
    writeDataToFile(res)
}

//编辑图书方法
exports.editBook = (req, res) => {
    let info = req.body
    info.id = req.params.id
    data.some((item) => {
        if (info.id == item.id) {
            for (let k in info) {
                item[k] = info[k]
            }
            return true
        }
    })
    writeDataToFile(res)
}

//删除图书方法
exports.deleteBook = (req, res) => {
    let id = req.params.id
    data.some((item, index) => {
        if (id == item.id) {
            //删除这一项
            data.splice(index, 1)
            return true
        }
    })
    writeDataToFile(res)
}

//图书是否存在方法
exports.checkName = (req, res) => {
    let name = req.params.name
    let flag = false
    data.some(item => {
        if (name == item.name) {
            flag = true
            return true
        }
    })
    if (flag) {
        res.json({
            status: 1
        })
    } else {
        res.json({
            status: 2
        })
    }
}