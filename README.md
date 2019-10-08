# mongoose
## 安装mongoDB
* `sudo apt-get install mongodb`

## 部分处理
* 添加favicon.ico:` <link rel="shortcut icon" type="image/x-icon" href="/static/images/favicon.ico" />`
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
                if (fs.existsSync(dir)) {
                    continue
                } else {
                    fs.mkdirSync(dir)
                }
            }
        }
        ```
* 添加显示头像
* 
  ![](static/md_head.png)
* 添加加载效果
* 
  ![](static/images/loading.png)
* 添加异步处理ajax请求
    ```
    /**
   * 
   * @param {string} url 请求地址
   * @param {string} type 请求方式
   * @param {object} data post 发送数据
   * @param {Boolean} processData 发送文件选false,默认true
   * @param {Boolean} contentType 发送文件选false,默认true
   */
    async function ajax(url, type, data, processData, contentType) {
        return await new Promise((resolve, reject) => {
            $.ajax(method).done(
                function (res) {
                    student_list = res.res
                    console.log(res)
                    resolve(res)
                }
            )
        })
    }
    ```




* 问题:删除所有记录后再添加图片显示错误
## 数据库基本操作
[实例地址](http:182.254.195.126:8989)

![](static/images/home.png)
