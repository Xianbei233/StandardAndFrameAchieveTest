function* name(a) {
    console.log(1);
    /**
     * b的赋值是yield返回的值（next（）传入的参数）
     */
    let b = yield a
    console.log(2);
    let c = yield b;
    console.log(3);
    return c
}

let it = name(1)
/**
 * next()相当于迭代器暴露出的一个中继接口，负责函数阶段输出和间断输入，调用时将断点内容输出，将参数传入函数内
 */
it.next() //第一次调用next函数迭代器才开始运行
it.next('b值')
it.next('再见')