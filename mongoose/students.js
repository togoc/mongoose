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
        default: "/static/images/h_unknown.png"
    }
})
// studentSchema.methods.speak = function () {
//     let name = this.name ? "my name is " + this.name : "i don`t have a name."
//     console.log(name)
// }
module.exports = mongoose.model("students", studentsSchema)