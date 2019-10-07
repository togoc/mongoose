const fs = require("fs")
const multer = require('multer')
const students = require("./mongoose/students")
const express = require("express")
const app = express()
const bodyparser = require('body-parser');


// 在Express 中 没有内置获取表单POST请求体的API，这里我们需要使用一个第三方的包 ：body-parser
//req.body 识别
app.use(bodyparser.urlencoded({ extende: true }));
app.use(bodyparser.json())


//处理"multipart/form-data"类型文件(post上传的)
app.use(multer({ dest: './dist' }).array('picture'));  //此处的array('file')对应html部分的name


app.use("/", express.static(__dirname + '/static'))
app.use("/static", express.static("static"))
app.use("/dist", express.static("dist"))

app.post("/files", function (rq, rs) {
    fs.renameSync(__dirname + "/dist/" + rq.files[0].filename, __dirname + "/dist/" + rq.files[0].originalname)
    console.log(rq)
    rs.send({
        code: 1,
        url: "/dist/" + rq.files[0].originalname
    })
})


app.post("/addStudent", function (rq, rs) {
    let tgc = new students(rq.body)
    console.log(rq.body.name, rq.body.pic)
    students.find({ name: rq.body.name }, "name", function (err, docs) {
        if (!err) {
            console.error(docs);//返回数组
        } else {
            //保存到数据库
            console.log(err)
            rs.send({ code: 0, msg: "数据库出错" })
        }
        if (docs.length == 0) {
            console.log("集合为空!正在尝试添加数据!")
            tgc.save(function (err) {
                if (!err) {
                    console.log("save ok 添加成功!")
                    students.find(function (err, res) {
                        rs.send(res)
                    })
                } else {
                    console.log("can not save!")
                    rs.send({ code: 0 })
                }
            })

        } else {
            console.log("集合不为空!添加失败!")
            rs.send({ code: 0 })
        }
    })
})




app.get("/list", function (rq, rs) {
    students.find(function (err, res) {
        rs.send(res)
    })
})

app.get("/remove", function (rq, rs) {
    let name = rq.query.name
    students.deleteOne({ name }, function (res) {
        console.log("已删除名字为 " + name + " 的数据库记录")
    })
    rs.send({ code: 1 })
})



app.listen('8989', function () {
    console.log("端口8989已经开启")
})