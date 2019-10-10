const mongoose = require('mongoose');
const db = mongoose.connection;


// Build the connection string
var dbURI = 'mongodb://localhost/students';
const options = {
    useNewUrlParser: true //使用客户端
    , useUnifiedTopology: true //报错
    , authSource: "admin",
    user: "togoc",
    pass: "tgc.123"
}
// ,
//     user: "togoc",
//     pass: "tgc.123",

// Create the database connection
mongoose.connect(dbURI, options);


var mongoose = require("./db")

var Schema = mongoose.Schema

//创建集合
var studentsSchema = Schema({
    name: {
        type: String,
        default: "佚名"
    },
    age: {
        type: Number,
        default: 18
    },
    gender: {
        type: String,
        default: "男"
    },
    education: {
        type: String,
        default: "大学本科"
    },
    school: {
        type: String,
        default: "桂林电子科技大学"
    },
    zzmm: {
        type: String,
        default: "团员"
    },
    jod: {
        type: String,
        default: "前端开发"
    },
    native_place: {
        type: String,
        default: "广西壮族自治区"
    },
    phone: {
        type: String,
        default: "0771"
    },
    pic: {
        type: String,
        default: "/static/images/file.gif"
    }
})
// studentSchema.methods.speak = function () {
//     let name = this.name ? "my name is " + this.name : "i don`t have a name."
//     console.log(name)
// }
mongoose.model("students", studentsSchema)
students.find(function (err, res) {
    console.log(res)
})
















// CONNECTION EVENTS
// When successfully connected
db.on('connected', function () {
    console.log('Mongoose 开始连接 ' + dbURI);
});

// If the connection throws an error
db.on('error', function (err) {
    console.log('Mongoose 连接错误 : ' + err);
});
// db.once("open", function () {
//     console.log("Mongoose 集合打开成功!")
// })
db.once("close", function () {
    console.log('Mongoose 断开连接')
})
