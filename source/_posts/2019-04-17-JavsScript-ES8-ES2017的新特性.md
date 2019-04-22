---
title: JavsScript ES8&ES2017的新特性
description: <!-- more -->
translate_title: new-features-of-javsscript-es8-&-es2017
date: 2019-04-17 20:36:49
updated: 2019-04-17 20:36:49
tags:
  - Ecma
  - ECMAScript
  - ES8
  - ES2017
  - ECMAScript 2017
  - JavaScript
categories:
  - JavaScript
---
写在前面的话标准非实际情况。

ECMAScript 2017，ECMA-262 标准版本的第8版（通常称为ES2017或ES8），于 2017 年 6 月完成。

> ECMAScript 2017 introduced Async Functions, Shared Memory, and Atomics along with smaller language and library enhancements, bug fixes, and editorial updates. Async functions improve the asynchronous programming experience by providing syntax for promise-returning functions. Shared Memory and Atomics introduce a new memory model that allows multi-agent programs to communicate using atomic operations that ensure a well-defined execution order even on parallel CPUs. This specification also includes new static methods on Object: Object.values, Object.entries, and Object.getOwnPropertyDescriptors.

与 ES6 相比，ES8 是 JavaScript 的一个小版本，但它仍然引入了非常有用的功能：

- 字符串填充（padStart 和 padEnd）
- Object.values
- Object.entries
- Object.getOwnPropertyDescriptors()
- 函数参数列表和调用中的尾随逗号
- Async Functions (异步函数)
- 共享内存 和 Atomics


## 字符串填充（padStart 和 padEnd）
如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

``` js
padStart(targetLength [, padString])
padEnd(targetLength [, padString])
```

一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

``` js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

'abc'.padStart(10, '0123456789') // '0123456abc'

'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/string#padStart%EF%BC%8CpadEnd)

## Object.values

这个方法返回一个包含所有对象自身属性值的数组

``` js
const person = { name: 'Fred', age: 87 }
Object.values(person) // ['Fred', 87]
```
也适用于数组:
``` js
const people = ['Fred', 'Tony']
Object.values(people) // ['Fred', 'Tony']
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/object-methods#Object-keys%EF%BC%8CObject-values%EF%BC%8CObject-entries)

## Object.entries
方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

``` js
const person = { name: 'Fred', age: 87 }
Object.entries(person) // [['name', 'Fred'], ['age', 87]]
```
也适用于数组
``` js
const people = ['Fred', 'Tony']
Object.entries(people) // [['0', 'Fred'], ['1', 'Tony']]
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/object-methods#Object-keys%EF%BC%8CObject-values%EF%BC%8CObject-entries)

## Object.getOwnPropertyDescriptors()
返回对象的所有自有（非继承的）属性描述符。

描述符是属性(property) 的一组特性(attributes)，它由以下的子集组成：
- value：属性的值
- writable：true 表示改属性可以被修改
- get：属性的 getter 函数，在读取属性时调用
- set：属性的 setter 函数，在属性设置值时调用
- configurable：如果为 false ，则不能删除属性，也不能更改任何属性，但值除外
- enumerable：如果属性是可枚举的，则为 true

该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

``` js
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);
```

另外还有 `Object.create` 和 `对象继承` 的问题，请查看更多信息。

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/object-methods#Object-getOwnPropertyDescriptors)

## 函数参数列表和调用中的尾随逗号

此功能允许在函数声明和函数调用中使用尾随逗号，此功能在参数换行显示的时候比较明显

``` js
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);
```

如果没有后面的都好，修改代码的时候就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/function#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E7%9A%84%E5%B0%BE%E9%80%97%E5%8F%B7)

## Async Functions (异步函数)

ES2017 引入了 Async Functions (异步函数) 的概念，这是该版本中引入的最重要的变化。

当 Promise 在 ES2015 中引入时，它们的目的是解决异步代码的问题，并且他们做到了。但在 ES2015 和 ES2017 相间隔的两年时间里，很明显， Promise 并不是最终的解决方案。

引入 Promise 是为了解决著名的 回调地狱 问题，但它们引入了自己的复杂性和语法复杂性。它们是良好的原语，可以向开发人员公开更好的语法：那就是Async Functions (异步函数)。

一个简单的例子：
``` js
function doSomethingAsync() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('I did something'), 3000)
  })
}
async function doSomething() {
  console.log(await doSomethingAsync())
}
console.log('Before')
doSomething()
console.log('After')
```
输出如下内容：
```
Before
After
I did something //after 3s
```

如果在`promise`中发生错误，在调用`doSomething`之后添加`catch`方法。

等多详细用法点击查看更多信息

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/async)

## 共享内存 和 Atomics

WebWorkers 用于在浏览器中创建多线程程序。

他们通过事件提供消息传递协议。 从ES2017开始，您可以使用 SharedArrayBuffer 在 Web worker 及其创建者之间创建共享内存数组。

由于我们不知道向共享内存部分写入要花费多少时间来传播，因此 Atomics 是一种在读取值时执行该操作的方法，并且完成了任何类型的写入操作。

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/arraybuffer#SharedArrayBuffer)
[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/arraybuffer#Atomics-%E5%AF%B9%E8%B1%A1)



# 参考
[ES2017（ES8）带来的重大新特性 – JavaScript 完全手册（2018版）](https://www.html.cn/archives/9981)
[ES7和ES8新特性](https://blog.csdn.net/zuggs_/article/details/80650436)
[ecma-262-8.0](http://www.ecma-international.org/ecma-262/8.0/index.html)