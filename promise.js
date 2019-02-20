//回调地狱 过度嵌套 无法维护

//Promise 是一个class，可创建instance
let Promise = require('./promiseRe')
let p = new Promise(function(resolve,reject){
    //pending
    setTimeout(function(){
        let num = Math.random();
        if(num<5){
            resolve('大成功') //resolve方法通过参数写入将成功结果传给then方法进行回调 fulfilled
        }else{
            reject('成功') //rejected
        }
    },2000)
})

//promise状态 pending(处理中) fulfilled（完成满足） rejected（失败拒绝）

// promise.then(onFulfilled,onRejected)
//onFulfilled 成功状态的回调函数   onRejected 失败状态的回调函数
p.then(function(value){
    console.log(value)//大成功
},function(reason){
    console.log(reason)//成功
})




