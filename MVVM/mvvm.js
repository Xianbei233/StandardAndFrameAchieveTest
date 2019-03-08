function Vue(options = {}) {
    this.$options = options //所有属性挂载在$options
    let data = this._data = this.$options.data;
    observer(data)
    //将对象交给观察者进行obj.defineProprety

    //将this代理this._data
    for (key in data) {

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
    new Compile(options.el, this)

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
                }


            }
        })
    }
}

function observer(data) {
    if (typeof data == 'object') {
        return new Observer(data)
    }

}

function Compile(el, vm) {
    //el 代表要编译的范围
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment() //创建一个新的空白的文档片段（在内存中）
    //DocumentFragment 接口表示一个没有父级文件的最小文档对象。
    //它被当做一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的XML片段。
    //最大的区别是因为DocumentFragment不是真实DOM树的一部分，它的变化不会引起DOM树的重新渲染的操作(reflow) ，且不会导致性能等问题。
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child)//此处操作会将真实dom节点转移进内存fragment中，会发生dom树结构变更
    }
    Array.from(fragment.childNodes).forEach((node) => {
        let
    })
    vm.$el.appendChild(fragment)
}