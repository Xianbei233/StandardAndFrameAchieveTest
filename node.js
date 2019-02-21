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

/**
 * event模块
 * 
 */

let EventEmitter = require('event')
let util = require('util') //工具模块

function Bell(){
    EventEmitter.call(this);//继承私有属性
}
//原型链上继承公有属性
util.inherits(Bell,EventEmitter) //工具模块中的继承工具
let bell = new Bell();

function trigger1(){
    console.log('学生入场')
}
//注册事件 object.on(event,listener)
bell.on('响',trigger1)
//触发事件 object.emit(event) 返回执行的listener结果
bell.emit('响')
//addListener和on实际上是同一个方法换皮

//once方法绑定listener只执行一次
bell.once('响',dismiss)




