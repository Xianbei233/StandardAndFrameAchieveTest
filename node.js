//global

//console

//标准输出流 标识符1
console.log()
console.info()

//错误输出流 标识符2
console.warn()
console.error()

//node xx.js > a.log
//node xx.js 2> a.log
//node xx.js 1> a.log 2>&1 重定向，将错误输出2重定向到标准输出中

console.time(label)
console.timeEnd(label)
//输出时间差

console.assert(1==1,'error')
//断言 如果表达式为真，则无事发生，为假则抛出自定义报警,测试用

console.dir()
//列出对象结构

console.trace();
//显示调用栈