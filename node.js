//global

//console

//标准输出流 标识符1
console.log()
console.info()

//错误输出流 标识符2
console.warn()
console.error()

//node xx.js > a.log
//node xx.js 2> a.log
//node xx.js 1> a.log 2>&1 重定向，将错误输出2重定向到标准输出中

console.time(label)
console.timeEnd(label)
//输出时间差

console.assert(1 == 1, 'error')
//断言 如果表达式为真，则无事发生，为假则抛出自定义报警,测试用

console.dir()
//列出对象结构

console.trace();
//显示调用栈

/**
 * event模块
 * 
 */

let EventEmitter = require('event')
let util = require('util') //工具模块

function Bell() {
    EventEmitter.call(this);//继承私有属性
}
//原型链上继承公有属性
util.inherits(Bell, EventEmitter) //工具模块中的继承工具
let bell = new Bell();

function trigger1() {
    console.log('学生入场')
}
//注册事件 object.on(event,listener)
bell.on('响', trigger1)
//触发事件 object.emit(event) 返回执行的listener结果
bell.emit('响')
//addListener和on实际上是同一个方法换皮

//once方法绑定listener只执行一次
bell.once('响', dismiss)





//util模块 工具组

let obj = {
    name: 'asd',
    home: {
        city: 'nod'
    }
}


console.log(util.inspect(obj, { depth: 1 }))//根据需求打印对象
util.isArray()
util.isUndefined()

//debugger

function potentiallyBuggyCode() {
    debugger;
    // do potentially buggy stuff to examine, step through, etc.
}

//当 debugger 被调用时, 执行暂停在 debugger 语句的位置。就像在脚本源代码中的断点一样。

require.cache //缓存模块绝对路径，加快模块位置定位读取

console.log(require.resolve(module))//在不加载的情况下获取模块绝对路径

//node内置模块在node.exe中

//UTF-8每次以8bit为单位传输数据，是Unicode的实现方式之一
//UTF-8的中文一个character占3byte

function transfer(unicode) {
    //转二进制重编码
}


//Buffer node专供js存放二进制数据的对象，暂时开辟内存空间 内部值是十六进制的两位数组成（代表8bit == 1byte）

let buf1 = Buffer.alloc(6)//分配一个长度为6 byte的Buffer，初始化所有字节为0
let buf2 = Buffer.allocUnsafe()
let buf3 = Buffer.from()//根据字符串创建buffer
buf1.fill(3, 1, 3)//在索引[1,3)填充目标值
buf1.write("你好", 0, 3, 'utf8')//精准顺序填充，参数1字符串 2填充开始索引 3填充字节长度 4编码格式
buf1.writeInt8(0, 0)
buf1.writeInt8(16, 1) //向指定索引开始写入8bit长度的十进制整数的二进制
// BE Big Endian 大头在前 高位在前
//LE little Endian 小头在前 低位在前

buf1.writeInt16BE()

//slice浅拷贝

let { StringDecoder } = require('string_decoder')
let sd = new StringDecoder();
//该模块的write方法会判断是不是一个字符，如果是的话就输出，不是的话则缓存在对象中，与第二次write的buff拼接再判断
console.log(sd.write(buf1))

//Buffer操作大部分形同Array

const fs = require('fs')


//mode 指你讲对文件设置何种权限
// 读 写 执行 读 写 执行 读 写 执行
// 4  2  1   4  2  1   4  2  1
//文件所有者  文件所属组  其他用户

// 详见linux命令行文件操作
//flag 指你将要对文件进行何种操作 
//a append
//r read
//w write
//s sync
//+ 增加相反操作
//x 排他方式
//如果文件不存在，r+不会创建，调用失败，w+会创建
//如果文件存在， r+不会清空文件，w+会自动清空复写
fs.readFile(url, { encoding, flag }, function (err, data) {
    if (err) {
        console.error(err)
    } else {
        console.log(data)
    }
})

fs.appendFile()//文件内容追加，免去文件参数配置

//以上将文件当做整体操作，一旦文件过大就无法操作

//fd file description 文件描述符
//0 标准输入 1 标准输出 2 错误输出 
process.stdin.on(event, function (data) {
    console.log(data)
})//标准输入

process.stdout.write('hello')//等效 console.log('hello') 标准输出
console.error(err)//错误输出

fs.open(url, flage, mode, function (err, fd) {
    let buff = Buffer.alloc(3)
    //position不传表当前位置
    fs.read(fd, buff, 0, 3, 0, function (err, bytesRead, buff) {
        console.log(buff.toString())
    })
})

fs.open(url, flage, mode, function (err, fd) {
    let buff = Buffer.from('再见')
    //position不传表当前位置
    fs.write(fd, buff, 0, 3, 0, function (err, bytesWritten) {
        console.log(buff.toString())
    })
})

//读写同步减少内存
function copy(path1, path2) {
    const Buffer_size = 3
    fs.open(path1, 'r', 0o666, function (err, Rfd) {
        fd.open(path2, 'w', 0o666, function (err, Wfd) {
            !function next() {
                fs.read(Rfd, buff, 0, Buffer_size, null, function (err, bytesRead, buffer) {
                    if (bytesRead > 0) {
                        fs.write(Wfd, buff, 0, bytesRead, null, next)
                    }

                })
            }()
        })
    })
}

//目录创建的时候必须要求父目录是存在的

fs.mkdir('')

//递归建立目录
function mkdirRE(dir) {
    let paths = dir.split('/')
    !function next(index) {
        if (index == paths.length) return;
        let current = paths.slice(0, index).join('/')
        fs.access(current, fs.constants.R_OK, function (err) {
            if (err) {
                fs.mkdir(current, 0o666, () => next(index + 1))
            } else {
                next(index + 1)
            }
        })
    }(1)
}

function rmdirRE(dir) {
    let files = fs.readdirSync(dir)
    files.forEach(function (file) {
        let current = dir + '/' + file
        let currentStat = fs.statSync(current)
        if (currentStat.isDirectory()) {
            rmdirRE(current)
        } else {
            fs.unlinkSync(current)
        }
    })
    fs.rmdirSync(dir)
}


//stream 流

//BOM用于标记一个文本文件所使用Unicode编码，，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。在不同的Unicode编码下，BOM字符对应的二进制字节
/**
 * Bytes      Encoding
----------------------------
    FE FF       UTF16BE
    FF FE       UTF16LE
    EF BB BF    UTF8
 */

//读取utf8编码的文件，需要去掉BOM，不然在特定情况下会出现文件读取错误

//识别去除BOM
function readText(pathname) {
    var buff = fs.readFileSync(pathname);

    if (buff[0] === 0xEF && buff[1] === 0xBB && buff[2] === 0xBF) {
        buff = buff.slice(3);
    }

    return buff.toString('utf-8');
}

//调用文件系统的read和write方法时，并不是直接写入读入物理区的，而是先写入缓存区等缓存区满了或时间到了再批量写入物理区，只有再次调用或者fsync才能强迫缓存区写入物理区
let str = 'asd'
fs.open(url, flag, mode, (err, fd) => {
    let buff = Buffer.from(str)

    fs.write(fd, buff, 0, 3, null, (err, bytesWritten) => {
        fs.write(fd, buff, 3, 3, null, (err, bytesWritten) => {
            fs.fsync(fd, (err) => {
                console.error(err)
                console.log('finish')
                fs.close(fd, () => {
                    console.log('close')
                })
            })
        })
    })
})

//截断文件 
fs.truncate(url, 5, () => {
    console.log('保留了文件的前5个字节')
})

//异步递归删除空文件夹

function rmdirPro(dir) {
    return new Promise(function (resolve, reject) {
        fs.stat(dir,(err,stat)=>{
            if(stat.isDirectory()){
                fs.readdir(dir, (err, files) => {
                    if (err) {
                        reject(err)
                    }
                    Promise.all(files.map(item => {
                        rmdirPro(path.join(dir,item))
                    })).then(() => {
                        fs.rmdir(dir, resolve)
                    })
                })
            }else{
                fs.unlink(dir,resolve)
            }
        })
    })
}


//stream  一组有序，有起点和终点的字节数据传输手段

let rs = fs.createReadStream('1.txt',{
    highWaterMark:3 //高水位标记（缓冲区大小）
});
//读取成功触发data事件
rs.on('data',function(data){

})

//读取失败触发error
rs.on('error',function(error){

})

//读取结束触发end
rs.on('end',function(){

})

//文件关闭触发close
rs.on('close',function(){

})

//暂停读取和发射data事件
rs.pause()

rs.resume()


rs.pipe(ws)//将