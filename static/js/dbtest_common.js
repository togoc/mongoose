let student_list = []
/**
 * 传入一个对象,删除值为空的属性且去除属性名左右空格,并返回
 * (添加防注入)
 * @param {object} obj 传入的对象
 */
function fixData(obj) {
    let reg = /<|>|%|\\|"|=|'|{|}|!|\?|\(|\)|\*/;
    let url = "/addStudent"
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
    $.ajax({
        url,
        type: "post",
        data: obj
    }).done(function (res) {
        //保存返回
        student_list = res
        console.log(res)
        if (res.code == 0) {
            console.log(res)
            alert("已存在")
            return
        }
        let form_table = $(".form_table")
        let i = res.length - 1
        let html =
            ` <tr>
                    <td>${res[i].name}</td>
                    <td>${res[i].gender}</td>
                    <td>${res[i].age}</td>
                    <td>${res[i].education}</td>
                    <td>${res[i].native_place}</td>
                    <td>${res[i].phone}</td>
                    <td>${res[i].zzmm}</td>
                    <td>${res[i].jod}</td>
                    <td>${res[i].school}</td>
                    <td><input type="button" value="x"></td>
                    </tr>`
        form_table.append(html)
    })
}

function save() {
    let picture_name = document.querySelector("#file_input").files
    let pic = ""
    if (picture_name[0])
        console.log(pic = picture_name[0].name)
    let name = document.querySelector(".name").value.replace(/\s*/g, "")
    let gender = document.querySelector(".gender").value
    let age = document.querySelector(".age").value
    let education = document.querySelector(".education").value
    let native_place = document.querySelector(".native_place").value
    let phone = document.querySelector(".phone").value
    let jod = document.querySelector(".jod").value
    let school = document.querySelector(".school").value
    let zzmm = document.querySelector(".zzmm").value
    if (name == "") {
        alert("名字不能为空!")
        return
    }
    let obj = {
        name, gender, age, education, native_place, phone, jod, school, zzmm, pic
    }
    fixData(obj)
    $("#file_input").val("")
    console.log(picture_name)
}

/**
 * 显示数据库内容
 * @param {array} array 传入一个数组数据
 */
function showDocument(array) {
    let form_table = $(".form_table")
    let html = ''
    for (let i = 0; i < array.length; i++) {
        html +=
            ` <tr>
                    <td>${array[i].name}</td>
                    <td>${array[i].gender}</td>
                    <td>${array[i].age}</td>
                    <td>${array[i].education}</td>
                    <td>${array[i].native_place}</td>
                    <td>${array[i].phone}</td>
                    <td>${array[i].zzmm}</td>
                    <td>${array[i].jod}</td>
                    <td>${array[i].school}</td>
                    <td><input type="button" value="x"></td>
                    </tr>`

    }
    form_table.append(html)
    form_table.hide()
    form_table.show(500)
}

function startLoad() {
    let url = "/list"
    $.ajax({ url }).done(
        function (res) {
            // 登录返回
            student_list = res
            console.log(res)
            showDocument(res)
        }
    )
}

/**
 * @param {string} name 根据名字删除数据库中对应项
 */
function remove(obj) {

    let url = "/remove?name=" + obj.name + "&pic=" + obj.pic
    $.ajax({ url }).done(
        function (res) {
            student_list = res.res
            if (res.code == 1) {
                // alert("删除成功!")
            }
        }
    )
}



window.onload = function () {
    /**
     * 初始化,清空输入和删除绑定
     */
    var host = this.location.host
    console.log(host)
    var personal = document.querySelector("#personal")
    var reset = document.querySelector(".reset")
    let load_pic = $(".load_pic")
    reset.addEventListener("click", (evet) => {
        personal.reset()
    })
    $(".form_table").click(function (evet) {
        if (evet.target.nodeName.toUpperCase() == "INPUT") {
            $(evet.target.closest('tr')).hide(500)
            remove(student_list[evet.target.closest('tr').rowIndex - 1])
        }

    })
    $(".form_table").mouseover(function (evet) {
        // 表格单元格TD元素有 cellIndex 属性。
        // 表格行TR元素有rowIndex属性。
        if (evet.target.nodeName.toUpperCase() == "INPUT") {
            console.log(`${student_list[evet.target.closest('tr').rowIndex - 1]}`)
            load_pic.css("background-image", `url(${student_list[evet.target.closest('tr').rowIndex - 1].pic})`)
            load_pic.animate({ left: evet.pageX + 60, top: evet.pageY - 60 }).animate({ opacity: 1 })
        }

    })
    $(".form_table").mouseleave(function (evet) {
        load_pic.animate({ opacity: 0, zIndex: -1 }, function () {
            load_pic.animate({ opacity: 0, zIndex: -1 })
        })
    })
    $(".form_table").mouseout(function (evet) {
        if (evet.target.nodeName.toUpperCase() == "INPUT") {
            load_pic.animate({ opacity: 0, zIndex: -1 }).stop(true)

        }
    })
    startLoad()

}
