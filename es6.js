/*
 * var 
 * 1.可以重复声明
 * 2.不能定义常量
 * 3.没有块级作用域 if(true){var a = 10;}
 * a可在if域外取到
 */

let a;
a = 1
//let a = 2;

const PI = 3.14; //常量定义，不可修改

if (true) {
    let a = 1;
    var b = 2;
}

console.log(a) //可取到
console.log(b) //报错，未定义

//ES6之前js只有两个作用域，一个全局，一个函数级

//let 没有预解释（声明提升）
{
    console.log(a); //报错，未定义
    let a = 4;
}

//const 在不同作用域中可以重复声明
//新的变量声明都没有预解释环节（声明提升

/**
 * 解构 分解对象的结构
 */


let arr = [1, 2, 3]
/*let a = arr[0]
let b = arr[1]
let c = arr[2]*/
//上下等价
//解构的时候，等号两边结构类似，右边必须是真实值
let [a, b, c] = arr;
console.log(a, b, c)

//解构时，取得到则取，取不到则选用默认值
let arr = [1, 2, 3]
let [, , j, q] = arr
console.log(j, q)//3, undefine

/**
 * 模板字符串，
 */

let name = 'asd', age = '12'
//let desc = name + "今年" + age +"岁了";
//let desc = `{name}今年${age}岁了` //模板字符串使用反引号``标识
let desc = "${name}今年${age}岁了";

function replace(desc) {
    desc.replace(/\$\{([^}]+)\}/g, function (matched, key) {
        console.log(arguments) 
        //function会在每次替换时调用，有四个参数
        //1、匹配字符
        //2、正则表达式分组内容，无分组就没有参数
        //3、匹配项在字符串中的index
        //4、原字符串
        return eval(key)
    })
}

//模板字符串可以换行

let users = [{id:1,name:'asd'},{id:2,name:'asdasd'}]

/**
 * <ul>
 * <li> 1:asd </li>
 * </ul>
 */

let newList = users.map(function(user,index){
    return `<li>${user.id}:${user.name}</li>`
}).join('')

let ul = `
    <ul>
    ${newList}
    </ul>

` //换行操作得以保留

console.log(newList)

//模板字符串带标签运用
//实际标签就像一个函数调用，参数1是实际文本的数组，剩余参数是模板对应值
//标签是实现自定义的模板逻辑
function anlys(strings,...rest){
    let result = '';
    for (let i = 0;i<rest.length;i++){
        result += (strings[i]+values[i]);
    }
    result += strings[strings.length - 1];
    return result
}

let str = anlys`${name}今年${age}岁了`;

//字符串判定新方法 startsWith(string) 返回布朗值；判定字符串开头是否符合参数
//字符串判定新方法 endsWith(string) 返回布朗值；判定字符串结尾是否符合参数
//字符串判定新方法 includes(string) 返回布朗值；判定字符串是否包含符合参数

//repeat(times),字符串重复方法
//padSdtart(times, char),字符串开头填充方法

//函数默认参数  必填项不填报错 

function ajax(url,matched,dataType){
    if(typeof url == 'undefined') throw Error('url不能为空')
    method = method?method:'GET';
    dataType = dataType?dataType:'json'
}

function ajaxRe(url = new Error('url不能为空'), method ='GET', dataType = 'json'){
    console.log(url,method,dataType)
}

/**
 *  展开操作符
 */

function sum(prefix,...rest){
    /**
     * array.map(function(currentValue,index,arr), thisValue) //返回新数组
     * array.forEach(function(currentValue, index, arr), thisValue) 
     * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)  //参数：初始值(计算结束的返回值)、当前元素、当前元素的索引、当前元素所属的数组
     * array.filter(function(currentValue,index,arr), thisValue) //返回新数组
     * 
     * 
     */
}

//展开运算符  相当于把数组/对象中中的每个元素取出
let arr1 = [1,2]
let arr2 = [3,4]
//let arr3 = [].concat(arr1,arr2)
let arr3 = [...arr1, ...arr2]

//let max = Math.max.apply(null,arr1)
let max = Math.max(...arr1)


let obj1 = {name:1}
let obj2 = {age:2}
let obj3 = {}

// for (let key in obj1){
//     obj3[key]= obj1[key]
// }
// for (let key in obj2) {
//     obj3[key] = obj2[key]
// }

//Object.assign(obj3,obj1,obj2) 浅拷贝方法，地址拷贝

obj3 = {...obj1,...obj2}

//深拷贝， 开新对象地址

function clone(origin){
    let copy = {}
    for (let key in origin){
        if(typeof origin[key]=='object'){
            copy[key] = clone(origin[key])
        }else{
            copy[key] = origin[key]
        }
    }
    return copy
}

/** 
 * 箭头函数注意点
 */

//1. 单参数、单返回项  括号可省略

let double = num => num*2

//箭头函数无自己的this,会固定继承作用域上层this

let obj4 = {
    name:'1',
    getName(){
        //let self = this
        // setTimeout(function(){
        //     console.log(self.name)
        // },1000)
        setTimeout( () => {
            console.log(this.name)
        }, 1000)
    }
}

//箭头函数不要滥用，会发生this指代模糊
//

function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42

//上面代码中，setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到100毫秒后。
//如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。
//但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42

//箭头函数的this与普通this不同
//普通函数this在被调用时才会绑定，哪个对象调用它，this绑定哪个对象（根据执行上下文决定）
//箭头函数this在定义时被绑定，由于箭头函数没有自己的作用域，固定指向作用域父级（根据词法作用域决定）
//由于作用域只有全局作用域和函数作用域，即window对象和函数对象，故箭头函数声明对象方法时，指向的作用域一般是全局作用域，this绑定的时windows（非严格模式下）

/** 
 * 对象
*/

//对象的属性名与变量名相同的话可二合一

let name ='123'
let age = 1
let obj9 = {name,age}

//super可调用对象父级的方法属性

//class 类  创建对象实例的专用模板 解决函数创建对象实例时划分不清的问题 

//原型上的属性 指在实例的__proto__里定义的属性,实例可调用
//静态属性 指class(的constructor)上定义的属性，无法使用实例调用

function newConstructor(Constructor, protoProps, staticProps){
    if(protoProps) defineProperties(Constructor.prototype,protoProps) //原型上的属性
    if(staticProps) defineProperties(Constructor,staticProps) //静态方法
    return Constructor
}

class Parent{
    constructor(name){
        this.name = name //实例的私有属性
    }
    //原型上的属性
    getName(){
        console.log(this.name)
    }
    //静态属性
    static hello(){
        console.log('123')
    }
}

//当使用Parent（）时，实际上是调用的构造函数
//通过new Object()产生的对象实例是没有prototype这一属性的
//实例是根据构造函数的prototype生成的，构造函数内部的属性声明实际上是挂靠在prototype对象上，专门处理原型链
//构造函数原型（prototype对象）添加修改的属性是公有的，可以被new实例接收
//构造函数实例（本身instance对象）添加修改属性是私有的，不可被new实例接收



//生成器(Generator)和迭代器(Iterator)
