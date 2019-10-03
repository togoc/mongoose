var personal = document.querySelector("#personal")
var reset = document.querySelector(".reset")
reset.addEventListener("click", (evet) => {
    personal.reset()
})


function save() {
    let name = document.querySelector(".name").value
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
    var obj = {
        name, gender, age, education, native_place, phone, jod, school, zzmm
    }
    function delete_space(obj) {
        for (let i in obj) {
            if (obj[i] == "")
                delete obj[i]
        }
        return obj
    }
    console.log(delete_space(obj))
    console.log(delete_space(obj))
    var url = "/addStudent"
    $.ajax({
        url,
        type: "post",
        data: delete_space(obj)
    }, function (res) {
        console.log(res)
    })
}


