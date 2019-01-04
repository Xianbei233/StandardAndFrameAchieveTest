/**
 * var 
 * 1.可以重复声明
 * 2.不能定义常量
 * 3.没有块级作用域 if(true){var a = 10;}
 * a可在if域外取到
 */

let a = 1;
//let a = 2;

const PI = 3.14 //常量定义，不可修改

if(true){
    let a = 1;
    var b = 2;
}

console.log(a)//可取到
console.log(b)//报错，未定义

//ES6之前js只有两个作用域，一个全局，一个函数级

//let 没有预解释（声明提升）
{
    console.log(a);//报错，未定义
    let a = 4;
}

//const 在不同作用域中可以重复声明