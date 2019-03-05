class Element {
    constructor(type, attr, child) {
        this.type = type
        this.attrs = attr
        this.child = child || []
    }
    render() {
        let virtualDOM = document.createElement(this.type)
        // attr是个对象所以要遍历渲染
        for (var attr in this.attrs) {
            virtualDOM.setAttribute(attr, this.attrs[attr])
        }

        // 深度遍历child
        this.child.forEach(el => {
            console.log(el instanceof Element)
            //如果子节点是一个元素的话，就调用它的render方法创建子节点的真实DOM，如果是一个字符串的话，创建一个文件节点就可以了
            // 判断一个对象是否是某个对象的实力
            let childElement = (el instanceof Element) ? el.render() : document.createTextNode(el);
            virtualDOM.appendChild(childElement);
        });
        return virtualDOM
    }
}
function createElement(type, attr, child) {
    return new Element(type, attr, child)
}

module.exports = { createElement }

