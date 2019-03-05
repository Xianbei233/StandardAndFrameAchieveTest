//TCP 数据segment 序列号（Seq）
//随机号起始 + 每次加上传输的数据长度   = 等于下一段数据的序列号
//确认号（Ack） 表示此号码之前的数据已接收到了 = 等于下一段数据的序列号

//控制位 对TCP链接断开传输重置进行指挥

//16位窗口大小  进行流量控制 说明本地同时可接受数据段的数目，网络越稳定窗口越大传输速度加快


//滑动窗口


//http方法
//GET 资源获取
//POST 向服务器发送数据，传输实体主体
//PUT 传输文件FILE
//HEAD 获取报文首部
//DELETE 删除文件FILE
//OPTIONS 询问支持的http方法
//TRACE 追踪路径

//报文首部
//通用首部
//响应首部  
//实体首部 都是以content开头，描述请求体的信息


let http = require('http')
let url = require('url')


let server = http.createServer(function (req, res) {

})

server.listen(8080, function () {
    console.log(`server start at &{address}`)
})

server.on('connection', function (socket) {

})

server.on('request', function (req, res) {
    //http-server已经对req进行了解析
    console.log(req.method)//获取request报文的请求方法
    let { pathname, query } = url.parse(req.url, true)
    console.log(query)
    console.log(req.url)//获取请求路径
    console.log(req.protocal)//协议
    console.log(req.headers);//请求头对象
    let result = []
    req.on('data', function (data) {
        result.push(data)
    })
    req.on('end', function () {
        let r = Buffer.concat(result)//请求实体
        res.end(r)
    })

})

server.on('error', function (err) {

})

let server2 = http.createServer(function (req, res) {
    res.writeHead(200, '成功了', {
        "Content-Type": "text/html;charset=utf8"
    })
    // res.statusCode = 200;
    // res.sendDate = true;
    // res.setHeader('Content-Type','text/html;charset=utf8')
    // console.log(res.getHeader('Content-Type'))
    // res.removeHeader('Content-Type')
    // res.write('nib')//分块传输 chunked
    // res.write('nib')
    // res.end()
})

server2.listen(8090)

const express = require('express')
const cookieParse = require('cookie-parser')

