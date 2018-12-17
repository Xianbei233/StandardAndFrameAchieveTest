// define 声明模块 
// require 使用模块

//factories存放各被require模块的工厂函数
//The factory content of required module leave in empty object factories
let factories = {}

function define(moduleName, dependencies, factory) {
    factories[moduleName] = factory
    //object[key]的写法等同于object.key,但是少了后一种写法的多种key命名限制
    //object[key] is equal to object.key but less limitation
}

function require(modules, callback) {
    let result = modules.map(function (module) {
        //获取module数组内当前module的factory函数
        //get the current module's factory function in Array modules
        let factory = factories[module]
        //获取factory函数的return结果
        //get the current module's factory function return value
        let exports = factory();
        //返回存入result中
        //put the return value into Array result
        return exports
    })
    callback.apply(null, result)
}

//使用例

define('one', [], () => {
    return 1
})

define('two', [], () => {
    return 2
})

require(['one', 'two', (one, two) => {
    console.log(one, two)
}])