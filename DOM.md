# DOM 重新理解

## HTML DOM 树

![HTML DOM 树](https://camo.githubusercontent.com/784b374c05494b89bc486bf4baeaa130e33ef302/687474703a2f2f7777312e73696e61696d672e636e2f6d773639302f61653439626135376779316665396d797270336f396a3230666930396c77656c2e6a7067)

### HTML文档可以说由节点构成的集合，DOM节点有:

1. 元素节点：上图中<html>、<body>、<p>等都是元素节点，即标签。
2. 文本节点:向用户展示的内容，如<li>...</li>中的JavaScript、DOM、CSS等文本。
3. 属性节点:元素属性，如<a>标签的链接属性href="http://www.baidu.com"。

### DOM节点类型

![DOM节点类型](https://camo.githubusercontent.com/0c63f3fd6ccb91445ac1149b2ad3c109135c87c6/687474703a2f2f7777312e73696e61696d672e636e2f6d773639302f6165343962613537677931666539727a316c6b32776a323068613037327462772e6a7067)

例子：
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>DocumentFragment文档片段节点</title>  
</head>  
<body> 
<!-- tip区域 -->
    <div id="tip">test1</div> 
    <ul class="list-node">
    <li>test2<li>
    </ul>  
    <script>  
        var frag = document.createDocumentFragment();  
        for (var i = 0; i < 10; i++) {  
            var li = document.createElement("li");  
            li.innerHTML = "List item" + i;  
            frag.appendChild(li);  
        }  
        document.getElementById("list-node").appendChild(frag);  
    </script>  
</body>  
</html>  
```

(1)Element(元素节点)：
`是组成文档树的重要部分，它表示了html、xml文档中的元素。通常元素因为有子元素、文本节点或者两者的结合，元素节点是唯一能够拥有属性的节点类型。`
例子中的:`html`、`header`、`meta`、`title`、`body`、`div`、`ul`、`li`、`script`都属于`Element(元素节点)`;


(2)Attr(属性节点)：
`代表了元素中的属性，因为属性实际上是附属于元素的，因此属性节点不能被看做是元素的子节点。因而在DOM中属性没有被认为是文档树的一部分。换句话说，属性节点其实被看做是包含它的元素节点的一部分，它并不作为单独的一个节点在文档树中出现。`
例子中的:`lang`、`charset`、`id`、`class`都属于`Attr`(属性节点);


(3)Text(文本节点)：
是只包含文本内容的节点，在`xml`中称为字符数据，它可以由更多的信息组成，也可以只包含空白。在文档树中元素的文本内容和属性的文本内容都是由文本节点来表示的。
例子中的:`DocumentFragment文档片段节点`、`test1`、`test2`、元素节点之后的空白区域都属于`Text(文本节点)`;


(4)Comment(注释节点)：
表示注释的内容
例子中的:`<!-- tip区域 -->`都属于`Comment(注释节点)`;


(5)Document(文档节点) ：
是文档树的根节点，它是文档中其他所有节点的父节点。要注意的是，文档节点并不是`html`、`xml`文档的根元素，因为在`xml`文档中，处理指令、注释等内容可以出现在根元素之外，所以我们在构造`DOM树`的时候，根元素并不适合作为根节点，因此就有了文档节点，而根元素是作为文档节点的子节点出现的。
例子中的：`<!DOCTYPE html>`、`html`作为`Document(文档节点)`的子节点出现;


(6)DocumentType(文档类型节点)：
每一个`Document`都有一个`DocumentType`属性，它的值或者是`null`，或者是`DocumentType`对象。比如声明文档类型时`<!doctype html>`就是文档类型节点。
例子中的：`<!DOCTYPE html>`就属于`DocumentType(文档类型节点)`;


(7)DocumentFragment(文档片段节点)：
是轻量级的或最小的Document对象，它表示文档的一部分或者是一段，不属于文档树。不过它有一种特殊的行为，该行为使得它非常有用。比如：当请求把一个`DocumentFragment`节点插入到文档的时候，插入的不是DocumentFragment自身，而是它的所有的子孙节点。这使得`DocumentFragment`成了有用的占位符，暂时存放那些一次插入文档的节点，同时它还有利于实现文档的剪切、复制和粘贴等操作。
例子中的:`var frag = document.createDocumentFragment(); 就属于DocumentFragment(文档片段节点)`;

### DOM的nodeType、nodeName、nodeValue

![一图](https://camo.githubusercontent.com/32c73a9bd7d237e57cf8c4b6ac117ccf446bc2e3/687474703a2f2f7777312e73696e61696d672e636e2f6d773639302f616534396261353767793166653975677770796b396a323076623066316b30782e6a7067)

## DOM Ready

html是一种标记语言，它告诉我们这个页面有什么内容，但行为交互是需要通过DOM操作来实现的。我们不要以为有两个尖括号就以为它是一个DOM了，html标签要通过浏览器解析才会变成DOM节点，当我们向地址栏传入一个url的时候，我们开始加载页面，就能看到内容，在这期间就有一个DOM节点构建的过程。节点是以树的形式组织的，当页面上所有的html都转换为节点以后，就叫做DOM树构建完毕，简称为domReady。

DOM ready比windows.onloaded早，domReady在dom树构建后就触发完成，windows.onloaded要在所有请求都结束后才触发完成

## DOM节点继承层次与嵌套规则

### 创建一个元素节点（Element）的过程

使用`document.createElement("p")`创建p元素，其实`document.createElement("p")`是`HTMLParagraphElement`的一个实例，而`HTMLParagraphElement`的父类是`HTMLElement`，`HTMLElement`的父类是`Element`，`Element`的父类是`Node`，`Node`的父类是`EventTarget`，`EventTarget`的父类是`Function`，`Function`的父类是`Object`。

