/**
 * 视频教程 https://www.bilibili.com/video/av21989676
 * (最新版本已经省略了很多安装步骤,直接安装即可使用)
 * 1.0 下载 https://www.mongodb.com/download-center/community
 * 2.0 安装 (注意是否安装可视界面)
 * 3.0 添加系统环境变量 C:\Program Files\MongoDB\Server\4.0\bin
 *      3.1(检验方法cmd 输入mongo)
 * 4.0 新建 data/db 数据库目录
 *      4.1 (测试 cmd 输入 mongod)
 *      4.2 (再打开一个cmd窗口输入mondo)
 *
 * 5.0 修改 data/db 路径输入 mongod --dbpath (空格+地址 data/db结尾) + --port(空格+端口号)
 * 6.0 mongo相当于启动数据库客户端  mongod相当于启动数据库服务器
 * 7.0 基本指令
 *          show dbs
 *          show databases -显示当前所有数据库
 *
 *          use 数据库名 -进入数据库
 *
 *          db  -显示当前所在数据库
 *
 *          show collections  - 显示数据库所有集合
 * 8.0 数据库的CRUD(增删改查)
 *      -插入
 *          db.<collection>.insert(doc)
 *               -向数据库中插入文档
 *               -例子：向test数据库中的，stus集合中插入一个新的学生对象
 *                      {name:"猴子",age:18,gender:"男"}
 *                db.stus.insert({name:"猴子",age:18,gender:"男"})
 *
 *               -插入多个数据用数组 [{},{}]
 *                  自动添加 _id 对象
 *      -查找
 *          db.<collection>.find()
 *               -查询当前集合中的所有文档,返回一个数组,可以通过下标(有length)查询db.<collection>.find()[0]
 *               -例子： db.stus.find({})
 *                  -空或者{}表示查询所有的对象(添加条件)
 *                  -{字段名：值} db.stus.find({name:"猴子",age:18})
 *          db.<collection>.findOne()
 *               -返回满足条件的第一个对象
 *               -可以直接查询对象内容 db.<collection>.findOne().name
 *
 *          (官方文档)https://docs.mongodb.com/manual/reference/method/db.collection.update/#db.collection.update
 *      -更新
 *          db.<collection>.update(查询条件,新对象,{multi:true})(默认只改第一个符合条件的文档,加 multi 等价 updateMany)
 *               -例子：db.stus.update({name:"猴子"},{age:22},{})
 *                  -tips:默认情况会用新对象替换掉旧对象
 *               -仅仅修改：db.stus.update({name:"猴子"},{$set:{gender:"男"}})可用分号添加多个属性
 *               -去除属性：db.stus.update({name:"猴子"},{$unset:{gender:"男"}})可用分号添加多个属性(无论值的内容是什么都会被删除)
 *
 *          db.<collection>.updateMany(查询条件，新对象)
 *               -同时修改多条符合条件的文档
 *
 *          db.<collection>.updateOne(查询条件，新对象)
 *               -同时修改一条符合条件的文档
 *      -删除
 *          db.<collection>.remove(查询条件,true)(默认删除所有满足调条件的对象文档,带第二个参数true只会删除一个,如果第一个参数为空对象{}默认删除集合)
 *              -例子： db.stus.remove({name:"猴子"})
 *          db.<collection>.drop()
 *               -删除集合
 *                  -例子： db.stus.dorp() //stus 会被删除
 *          db.dropDatabase()
 *               -删除数据库
 *                  -例子： db.stus.dorp()
 *------------一般数据库中数据不会被删除所以删除方法很少使用---------
 *              一般会在数据中添加一个字段，来表示数据是否被删除
 *                  {isDel:0}
 *
 *          db.<collection>.deleteOne(查询条件)
 *          db.<collection>.deleteMany(查询条件)
 * 9.0 文档之间的关系
 *      -一对一 (one to one)
 *          - 夫妻(一个丈夫对应一个妻子)
 *          - 在 mongoDB,可以通过内联文档的形式来体现一对一的关系
                db.wifeAndHusband.insert({
                    name:"黄蓉",
                    husband:{
                        name:"郭靖"
                    }
                })
 *              db.wifeAndHusband.find()  name为黄蓉的husband的name只能是郭靖
 *
 *      -一对多 (one to many)/多对一
 *          - 父母  -孩子
 *          - 用户  -订单
 *            -也可通过内联文档来映射一对多,用数组[]存
 *           新建一个用户表, 用户有唯一  _id 属性
 *           再建一个表存订单信息,每个订单对应一个唯一 _id
 *           通过
                var user_id = db.<用户表名>.findOne({条件})._id
                db.<订单表名>.find({user_id:user_id})
 *           查找。
 *
 *      -多对多 (many to many)
 *          - 老师  -学生
 *          - 分类  -商品
 *           新建一个老师表, 用户有唯一  _id 属性
 *           再建一个学生表,每个学生有一个老师数组 有多个老师 _id
 * 10.0 查询语句
 *     (官方文档) https://docs.mongodb.com/manual/reference/operator/query/
 *      -比较
            $eq	    匹配等于指定值的值。
            $gt 	匹配大于指定值的值。
            $gte	匹配大于或等于指定值的值。
            $in	    匹配数组中指定的任何值。
            $lt	    匹配小于指定值的值。
            $lte	匹配小于或等于指定值的值。
            $ne 	匹配所有不等于指定值的值。
            $nin	不匹配数组中指定的任何值
 *      用法：-db.<表名>.find({num:{$lt:200}}) //查询小于num小于200的
 *
 *      -逻辑
            $and	使用逻辑连接查询子句AND将返回与两个子句的条件匹配的所有文档。
            $not	反转查询表达式的效果并返回与查询表达式不匹配的文档。
            $nor	使用逻辑连接查询子句NOR将返回所有无法匹配两个子句的文档。
            $or	    使用逻辑连接查询子句OR将返回与任一子句的条件匹配的所有文档。
 *      用法：-db.<表名>.find({$and:[{条件1},{条件2}]}) //查询小于num小于200的
 *
 * 11.0 sort 查询排序(默认根据_id 排序)
 *     -全部查询
 *          db.<collection>.find({}).sort({键名1：1,键名2：-1}) //先按照键名1排序  1 升序  -1 降序
 *     -部分查询
 *          db.<collection>.find({},{键名1：1,键名2：-1}) //先按照键名1排序  1 升序  -1 降序(只显示相关键名)
 *
 * 12.0 mongoose
 *   (官方文档) https://mongoosejs.com/docs/guide.html
 *      mongoose允许我们通过node来操作mongoDB的模块
 *      mongoose是一个对象文档模型(ODM)库,他对node原生的mongoDB模块进行了
 *      进一步优化封装,并提供了更多的功能。
 *
 *      -下载 mongoose
 *          npm i mongoose --save
 *     - 在项目中引入 mongoose
           const mongoose = require('mongoose')
 *     - 连接 mongoDB 数据库
 *
            mongoose.connect('mongodb://数据库的ip地址：端口号/数据库名', {
                    useNewUrlParser: true
                })
            //如果端口号是默认(27017) 可以省略不写
 *
 *
                const mongoose = require('mongoose')


                mongoose.connect('mongodb://localhost/test', {
                    useNewUrlParser: true //使用客户端
                })



                mongoose.connection.once("open",function(){
                    console.log('数据库连接成功~~~')
                })

                // mongoose.connection.once("close",function(){
                //     console.log('数据库连接断开~~~')
                // })
                //断开数据库, 一般不使用
                // mongoose.disconnect()
 *
 * 13.0 model 方法
 *      (官方文档) https://mongoosejs.com/docs/api/model.html
 *      -model.create(doc(s),[callback])
 *          -用来创建一个或者多个文档并添加到数组中
 *          -参数：
 *              doc(s) 一个的或者多个文档对象
 *              callback 当操作完成以后调用的回调函数
 *
 *      -model.find(conditions,[projection],[options],[callback]) //返回一个数组
 *          conditions:查询条件
 *          projection：投影
 *              -两种方式
 *                      {name:1,_id:0} (1升序  -1倒叙  0 默认)
 *                      "name -_id"  (前面加 - 号代表不显示该项目)
 *          options：查询选项 (skip limit)
 *              -{skip:3,limit:2}
 *                skip代表显示满足条件的第几个开始往后所有满足的
 *                limit 从skip约束的开始共显示几个
 *          callback：回调函数,查询结果会通过回调函数返回(必须带，否则不会查询)
 *
 *      -model.findOne(conditions,[projection],[options],[callback]) //返回第一个满足条件的对象
 *
 *      -model.findById(conditions,[projection],[options],[callback]) //返回第一个满足条件的对象
 *
 *          (官方文档)https://mongoosejs.com/docs/api/model.html#model_Model.update
 *      -model.update(conditions,doc,[options],[callback]) //默认修改第一个满足条件的文档对象 跟model.updateOne()一样
 *          stuModel.updateOne({ name: "唐僧" }, { $set: { age: 22 } },{multi:true}, function(err){})
 *
 *  
 *      -model.remove(conditions,[callback]) //删除所有满足条件的
 *      -model.deleteOne(conditions,[callback]) //删除一个满足条件的
 *      -model.deleteMany(conditions,[callback]) //删除多个满足条件的
 * 
 *      -model.count(conditions,[callback(err,count)]) //所有满足条件的个数
 * 
 * 
 *
 *
 *
 *
 *
 *
 *
 *
 */
