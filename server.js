const students = require("./mongoose/students")
const express = require("express")
const app = express()
const bodyparser = require('body-parser');


// 在Express 中 没有内置获取表单POST请求体的API，这里我们需要使用一个第三方的包 ：body-parser
//req.body 识别
app.use(bodyparser.urlencoded({ extende: true }));
app.use(bodyparser.json())

app.use("/", express.static(__dirname + '/static'))
app.use("/static", express.static("static"))










app.post("/addStudent", function (rq, rs) {
    let tgc = new students(rq.body)

    students.find({ name: rq.body.name }, "name", function (err, docs) {
        if (!err) {
            console.error(docs);//返回数组
        } else {
            //保存到数据库
            console.log(err)
            rs.send('错误')
        }
        if (docs.length == 0) {
            console.log("集合为空!正在尝试添加数据!")
            tgc.save(function (err) {
                if (!err) {
                    console.log("save ok!")
                } else {
                    console.log("can not save!")
                }
            })
        } else {
            console.log("集合不为空!添加失败!")
        }
    })
    console.log(rq.body)
    rs.send('ok')
})



app.listen('8989', function () {
    console.log("端口8989已经开启")
})