function postFile() {
    let add_file = document.querySelector(".pictrue")
    let file_input = document.querySelector("#file_input")
    /**
     * 伪触发
     */
    add_file.addEventListener("click", function () {
        file_input.click()
    })
    /**
     * 接收数据时发送数据
     */
    file_input.addEventListener("change", function () {
        let pictrue_data = new FormData()
        let picture_container = $(".picture_container")
        $(add_file).animate({ top: 30 })
        $(".select_tips").html(this.files[0].name)
        pictrue_data.append("picture", this.files[0])
        $.ajax({
            url: "/files",
            type: "post",
            data: pictrue_data,
            processData: false,    //不需要对数据做任何预处理
            contentType: false    //不设置数据格式
        }).done(function (res) {
            console.log(res)
            picture_container.css("background-image", ` url(${res.url})`)
        })
    })
}
postFile()
