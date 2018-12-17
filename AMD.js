// define 声明模块 
// require 使用模块

//factories存放各被require模块的工厂函数
//The factory content of required module leave in empty object factories
let factories = {}

function define(moduleName, dependencies, factory) {

    factory.dependencies = dependencies
    //将模块的依赖写入factory中,此处将factory当作一个实例
    //write the dependencies of module into module's factory.
    //The factory here is taken for a instance of class Function

    factories[moduleName] = factory
    //object[key]的写法等同于object.key,但是少了后一种写法的多种key命名限制
    //object[key] is equal to object.key but less limitation
}

function require(modules, callback) {
    let result = modules.map(function (module) {

        //获取module数组内当前module的factory函数
        //get the current module's factory function in Array modules
        let factory = factories[module]

        //获取module的依赖项
        //get the dependencies of current required module                
        let dependencies = factory.dependencies;

        let exports;

        //获取依赖模块的factory函数的return结果作为arguments
        //get the return values of dependencies' factory as the callback function's arguments                   
        require(dependencies, (...arguments) => {
            exports = factory.apply(null, arguments)
            //获取factory函数的return结果
            //get the current module's factory function return value
        })
        //此处()=>{exports = factory.apply(null, arguments)}可替换成factory,但是无法将factory结果传出
        //()=>{exports = factory.apply(null, arguments)} is equal to factory but can not pass the return value to exports


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

require(['one', 'two'], (one, two) => {
    console.log(one, two) //result is 1,2
})

//使用例(带依赖)

define('one', [], () => {
    return 1
})

define('two', ['one'], (one) => {
    return 2 + one
})

require(['two'], (two) => {
    console.log(two) //result is 3
})