const mongoose = require('mongoose');
const db = mongoose.connection;


// Build the connection string
// var dbURI = 'mongodb://182.254.195.126:27017/students';
var dbURI = 'mongodb://localhost:27017/students';
const options = {
    useNewUrlParser: true //使用客户端
        ,
    useUnifiedTopology: true //报错
        ,
    authSource: "admin",
    user: "root",
    pass: "tgc.123"
}

// Create the database connection
mongoose.connect(dbURI, options);

// CONNECTION EVENTS
// When successfully connected
db.on('connected', function() {
    console.log('Mongoose 开始连接 ' + dbURI);
});

// If the connection throws an error
db.on('error', function(err) {
    console.log('Mongoose 连接错误 : ' + err);
});
// db.once("open", function () {
//     console.log("Mongoose 集合打开成功!")
// })
db.once("close", function() {
    console.log('Mongoose 断开连接')
})

module.exports = mongoose;