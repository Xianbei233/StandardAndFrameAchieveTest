function Vue(options = {}) {
    this.$options = options //所有属性挂载在$options
    let data = this._data = this.$options.data;
    observer(data)
    //将对象交给观察者进行obj.defineProprety

    //将this代理this._data

    for (let key in data) {

        Object.defineProperty(this, key, {
            configurable: true,//默认false，无法删除
            //writable:true,//默认false，无法更改
            enumerable: true,//默认false，无法枚举属性
            //value:'abc',
            get() {
                //属性值获取，调用该方法
                //此方法存在时，不可有value属性
                return this._data[key]
            },
            set(newVal) {
                //属性值设置，调用该方法
                //此方法存在时，不可有writable属性

                this._data[key] = newVal
            }
        })
    }


    initComputed.call(this);
    new Compile(options.el, this)

}

const dep = new Dep()
function initComputed() { //具有缓存功能
    let vm = this
    let computed = vm.$options.computed
    Object.keys(computed).forEach((key) => {
        Object.defineProperty(vm, key, {
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target)
                }
                return typeof computed[key] === 'function' ? computed[key].bind(this) : computed[key].get.bind(this)
            },
            set() {

            }
        })
    })
    //对象key变成数组列表
}

function Observer(data) {
    for (key in data) {
        let val = data[key]
        Object.defineProperty(data, key, {
            configurable: true,//默认false，无法删除
            //writable:true,//默认false，无法更改
            enumerable: true,//默认false，无法枚举属性
            //value:'abc',
            get() {
                //属性值获取，调用该方法
                //此方法存在时，不可有value属性
                if (Dep.target) {
                    dep.addSub(Dep.target)
                }
                //console.log(dep.subs)
                return val

            },
            set(newVal) {
                //属性值设置，调用该方法
                //此方法存在时，不可有writable属性
                if (newVal === val) {
                    return
                } else {
                    val = newVal
                    observer(newVal)
                    dep.notify()
                }


            }
        })
        observer(val)
    }
}

function observer(data) {
    if (typeof data == 'object') {
        return new Observer(data)
    }

}

function Compile(el, vm) {
    //el 代表要编译的范围
    console.log('渲染中')
    vm.$el = document.querySelector(el);


    let fragment = document.createDocumentFragment() //创建一个新的空白的文档片段（在内存中）
    //DocumentFragment 接口表示一个没有父级文件的最小文档对象。
    //它被当做一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的XML片段。
    //最大的区别是因为DocumentFragment不是真实DOM树的一部分，它的变化不会引起DOM树的重新渲染的操作(reflow) ，且不会导致性能等问题。

    while (child = vm.$el.firstChild) {
        fragment.appendChild(child)//此处操作会将真实dom节点转移进内存fragment中，会发生dom树结构变更
    }

    function replace(fragment) {
        Array.from(fragment.childNodes).forEach((node) => {
            let text = node.textContent
            let reg = /\{\{(.*)\}\}/
            //此处处理文本节点
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.split('.')
                let val = vm;
                arr.forEach((key) => {
                    val = val[key]
                })
                new Watcher(vm, RegExp.$1, (newVal) => {
                    node.textContent = text.replace(/\{\{(.*)\}\}/, newVal)
                })

                node.textContent = text.replace(/\{\{(.*)\}\}/, val)
                //console.log(node.textContent)
                //console.log('----------------------')
            }
            //此处处理元素节点
            if (node.nodeType === 1) {
                let nodeAttrs = node.attributes;
                //类数组
                Array.from(nodeAttrs).forEach(attr => {
                    let name = attr.name
                    let exp = attr.value
                    let reg = /^v-/
                    if (reg.test(name)) {
                        node.value = vm[exp]

                    }
                    new Watcher(vm, exp, (newVal) => {
                        node.value = newVal
                    })
                    node.addEventListener('input', function (e) {
                        let newVal = e.target.value;
                        vm[exp] = newVal
                    })
                })
            }
            if (node.childNodes) {
                replace(node)
            }
        })
    }

    setTimeout(function () {
        replace(fragment)

        vm.$el.appendChild(fragment)

    }, 1000)

}

//发布订阅
function Dep() {
    this.subs = []
}

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub)
}

Dep.prototype.notify = function () {
    this.subs.forEach(sub => {
        sub.update()
    });
}

function Watcher(vm, exp, fn) {
    this.fn = fn
    this.vm = vm
    this.exp = exp;
    Dep.target = this;
    let val = vm;
    let arr = exp.split('.')
    arr.forEach(key => {
        val = val[key] //此处取值操作是为了调用重定义属性的get方法，添加订阅者
    });
    Dep.target = null
}

Watcher.prototype.update = function () {
    let val = this.vm;
    let arr = this.exp.split('.')
    arr.forEach(key => {
        val = val[key] //此处取值操作是为了获取新值
    });
    this.fn(val)
}