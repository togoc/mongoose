var reg = /\W/;
 
var val = `我`

console.log(reg.test(val), val.match(reg))

// var reg = /(.*)(.*)/
// var str = "baodu taobao"
// console.log(reg.test(str), RegExp.$1, RegExp.$2) //true "baodu" "taobao"