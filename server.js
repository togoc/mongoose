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
    students.find(function (err, res) {
        rs.send({ code: 1, res, url: "/dist/" + rq.files[0].originalname })
    })
})
/**
 * 递归创建文件夹
 * @param {string} str 输入一个有关路径的字符串
 */
function new_dir(str) {
    let array = str.replace(/^\/*|\/*$/g, "").split('/')
    let dir = __dirname
    for (let i = 0; i < array.length; i++) {
        dir += "/" + array[i]
        console.log(dir)
        if (fs.existsSync(dir)) {
            continue
        } else {
            fs.mkdirSync(dir)
        }
    }
}
/**
 * (不能用于包含文件夹的dir)
 * @param {string} str 输入一个文件夹地址删除里面的文件
 */
function dlete_files(str) {
    fs.readdirSync(str).forEach(function (el, index) {
        if (fs.existsSync(str + "/" + el)) {
            if (el.indexOf(".") != -1)
                fs.unlinkSync(str + "/" + el)
        }
    })
}
app.post("/addStudent", function (rq, rs) {
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
            // 头像处理
            if (rq.body.pic) {
                // 处理路径
                new_dir('/static/images/head')
                if (fs.existsSync(__dirname + "/dist/" + rq.body.pic)) {
                    fs.renameSync(__dirname + "/dist/" + rq.body.pic, __dirname + "/static/images/head/h_" + rq.body.name + "." + rq.body.pic.split(".")[1])
                    rq.body.pic = "/static/images/head/" + "h_" + rq.body.name + "." + rq.body.pic.split(".")[1]
                    //移动之后清空"dist文件夹
                    dlete_files(__dirname + '/dist/')
                }
            }

            let tgc = new students(rq.body)
            tgc.save(function (err) {
                if (!err) {
                    console.log("save ok 添加成功!")
                    students.find({}, function (err, res) {
                        rs.send({ code: 1, res })
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
        rs.send({ code: 1, res })
    })
})

app.get("/remove", function (rq, rs) {
    let name = rq.query.name
    students.deleteOne({ name }, function (res) {
        if (rq.query.pic != "/static/images/h_unknown.png")
            if (fs.existsSync(__dirname + rq.query.pic)) {
                fs.unlinkSync(__dirname + rq.query.pic)
            }
        console.log("已删除名字为 " + name + " 的数据库记录")
    })
    students.find({}, function (err, res) {
        rs.send({ code: 1, res })
    })
})


app.get("/test", function (rq, rs) {
    console.log(rq.query)
    rs.send("ok")
})
app.post("/test", function (rq, rs) {
    console.log(rq.body.name)
    rs.send("ok")
})

app.listen('8989', function () {
    console.log("端口8989已经开启")
})