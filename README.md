# mongoose
## 安装mongoDB
* `sudo apt-get install mongodb`
* 添加防注入

    ```  
        let reg = /<|>|%|\\|"|=|'|{|}|!|\?|\(|\)|\*/;
        for (let i in obj) {
            if (obj[i] == "") {
                delete obj[i]
            }
            else {
                obj[i] = obj[i].trim()
                if (reg.test(obj[i])) {
                    alert("数据类型错误: " + '"' + obj[i].match(reg) + '"')
                    console.log(obj[i].match(reg))
                    return
                }
                if (/\s{3}/.test(obj[i])) {
                    alert("空格太多了: " + obj[i])
                    return
                }
            }
        }
    ```
* 添加上传图片
    * 删除暂存的图片
        ```
        /**
        * (无法删除文件夹)
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
        ```
    *  存图片防止目录不存在
        ```
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
        ```

## 数据库基本操作
[实例地址](http:182.254.195.126:8989)

![](static/images/home.png)
