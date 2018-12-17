const fs = require('fs');
//因为模块在不同的文件中,需要file操作
//Because of modules in different files, we need the file operation

function require(moduleName) {
    let content = fs.readFileSync(moduleName, 'utf8');

    /*参数分析:由于模块文件内部形如:

    require(xxxxxxx)

    module.exports = xxxx


    require()与module.exports在模块文件内并未被声明定义,故需要靠参数传入或者调用父级作用域内相关
    模块内会出现require()嵌套,故require函数需要实现递归查找
    */

    let fn = new Function('exports', 'module', 'require', content + '\n return module.exports')

    /* 有关Function类  About Funtion Objection

        var function_name = new function (arg1, arg2, ..., argN, function_body)

        eg.
        function sayHi(sName, sMessage) {
            alert("Hello " + sName + sMessage);
        }

        等效于  Equal:

        var sayHi = new Function("sName", "sMessage", "alert(\"Hello \" + sName + sMessage);");
    */

    let module = {
        exports: {}
    }

    /*
        最终目标是暴露出module.exports的指代物
        Final goal is to get module.exports' content
    */

    return fn(module.exports, module, require)
}

//调用实现

let variable = require('./module.js')

console.log(variable)