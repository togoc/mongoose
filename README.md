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

## 数据库基本操作
[实例地址](http:182.254.195.126:8989)

![](static/images/home.png)
