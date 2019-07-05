//柯里化：把接受多个参数的函数变换成接受一个单一参数的函数，并且返回（接受余下的参数而且返回结果的）新函数的技术

//主要原理使用的是函数作用域与闭包

function add(a) {
    return function (b) {
        return a + b
    }
}

add(3)(4) === 3 + 4

//ES6箭头函数柯里化进行链式调用，形成管道函数

let add = a => b => a + b

//参考链接：https://zhuanlan.zhihu.com/p/26794822