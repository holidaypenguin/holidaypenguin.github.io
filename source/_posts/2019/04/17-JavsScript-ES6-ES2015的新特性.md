---
title: JavsScript ES6&ES2015的新特性
description: <!-- more -->
translate_title: new-features-of-javsscript-es6-&-es2015
date: 2019-04-17 20:12:31
updated: 2019-04-17 20:12:31
tags:
  - Ecma
  - ECMAScript
  - ES6
  - ES2015
  - ECMAScript 2015
  - JavaScript
categories:
  - JavaScript
---
写在前面的话标准非实际情况。

ECMAScript 2015，也称为 ES6 或者 ES2015，是 ECMAScript 标准的基础版本。

在标准版本 [ECMAScript 5.1](http://lzw.me/pages/ecmascript/) 发布4年后发布，还有一个重要的变化是 ECMAScript 标准版本的命名从版本号命名改为了根据发布年号命名。

所以它不应该被命名为 ES6（尽管每个人都这样称呼它），更加准确的命名应该是 ES2015 。

由于 ES5.1 和 ES6 之间已经过了很长时间，因此 ES6 带来了很多重大的变化，一些重要的新功能以及在开发 JavaScript 程序时建议的最佳实践。 


ES2015 最重要的变化包括：

- Arrow functions（箭头函数）
- Promise
- Generators
- let 和 const
- Classes（类）
- Modules（模块）
- Template string（模板字符串）
- Default parameters（默认参数）
- The spread operator（展开操作符）
- Destructuring assignments（解构分配）
- Enhanced object literals（增强的对象字面量）
- for..of 循环
- Map 和 Set


## Arrow functions（箭头函数）

- 箭头函数作为一个传统函数的简写形式他改变了代码的外观和工作方式，但是这种改变是受欢迎的。
``` js
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};
```

- 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
``` js
var f = () => 5;
// 等同于
var f = function () { return 5 };
```

- 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
``` js
var sum = (num1, num2) => { return num1 + num2; }
```

- 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
``` js
// 报错
let getTempItem = id => { id: id, name: "Temp" };
// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

- 新的`this`的作用域
函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。如果不明白可以查看[ES2015 中的箭头函数和词法 this](https://www.html.cn/archives/6959)


[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)

## Promise

`Promise`的引入是为了消除回调地狱，简单说`Promise`就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

`Promise`对象有以下两个特点。
- 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。

回调代码
``` js
setTimeout(function() {
  console.log('I promised to run after 1s')
  setTimeout(function() {
    console.log('I promised to run after 2s')
  }, 1000)
}, 1000)
```

`Promise`代码
``` js
const wait = () => new Promise((resolve, reject) => {
  setTimeout(resolve, 1000)
})
wait().then(() => {
  console.log('I promised to run after 1s')
  return wait()
})
.then(() => console.log('I promised to run after 2s'))
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/promise)

## let 和 const
`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。

``` js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

最典型的例子就是在`for`循环中输出`i`，下面先看一下使用var声明变量的情况：
``` js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```
变量`i`是`var`命令声明的，在全局范围内都有效，所以全局只有一个变量`i`。每一次循环，变量`i`的值都会发生改变，而循环内被赋给数组`a`的函数内部的`console.log(i)`，里面的`i`指向的就是全局的i。最后也就是10。

如果使用let，声明的变量仅在**块级作用域**内有效，最后输出的是 6。
``` js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

`let`还有 **不存在变量提升**、**暂时性死区**的特性，而且**不允许重复声明**。

`const`具有`let`的所有特性，同时其所声明的变量是只读的，如果是一个数组或者对象（应该叫复合数据类型）更改各自的属性还是可以的。

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/let)

## Classes（类）

生成实例对象的传统方法是通过构造函数。下面是一个例子。
``` js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

有了`Class`之后我们可以让代码更简单一点。看下面的例子。
``` js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var p = new Point(1, 2);
```

上面这两段代码的输出是完全一样的，而且`class`完全可以看作构造函数的另一种写法。
``` js
typeof Point // "function"
Point === Point.prototype.constructor // true
```

`class`定义的类不能作为方式使用，否则会报错。

类的实例共用同一个原型对象

### constructor

`constructor` 是构造方法，而`this`关键字则代表实例对象，对应 ES5 的构造函数，该方法在用`new`创建实例时自动调用该方法

### extends & super

`extends`继承一个类，`super`调用这个继承类的`constructor`

### 取值函数（getter）和存值函数（setter）
在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
``` js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/class)

## Modules（模块）

ES6 引入了`import` `export`两个命令实现了ES6模块，用于取代`CommonJs`和`AMD`规范成为浏览器和服务器通用的解决方案。ES6 的模块自动采用严格模式，并且是编译时加载，所以`import`不能使用表达式和变量。

接下来讲解一下这两个命令的一些用法，详细的说明可以查看更多信息

### import

[import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)的语法
``` js
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

### export

[export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)的语法
``` js
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}

export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/module)

## Template string（模板字符串）

想当年我们拼接字符串大概也就是下面这几种方式：
``` js
// 短字符串拼接
var data = {msg: '请求失败'}
var msg = 'msg: [' + data.msg + ']';
```
``` js
// 长字符串拼接（如HTML拼接）
var html = '<body>'
              + '<div>'
              // ......
              + '</div>'
            '</body>'
```
``` js
// 数组字符串拼接
var html = [
  '<body>',
  '<div>',
  // ......
  '</div>',
  '</body>'
]
```
如果需要格式化的内容在字符串内会更麻烦，因此在千呼万唤中出现了模板字符串
``` js
const data = {msg: '请求失败'}
const html = `
<body>
  <div class='msg'>
    ${data.msg}
  </div>
</body>
`
```
最后该字符串将按照这个格式进行输出

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/string#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)

## Default parameters（默认参数）

ES6之前函数处理参数默认值是需要额外的代码的
``` js
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
```
这种方法`y`的值为`null` `undefined` `0` `false` 都会赋值为`World`

ES6之后可以使用更加简单的方法
``` js
function log(x, y = 'World') {
  console.log(x, y)
}
```
这种方式是一种简单方法，但是只会判断`y`为`undefined`这一种情况

通常会与解构赋值一起使用
``` js
function log({x, y = 'World'}) {
  console.log(x, y)
}
log({x: 'Hello'}) // Hello World
log({x: 'Hello', y: 'China'}) // Hello China
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/function#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC)

## The spread operator（展开操作符）
扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
``` js
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
```

``` js
const numbers = [4, 38];

function push(array, ...items) {
  array.push(...items);
}

push([], ...numbers) // [4, 38]
```
- 第三行是rest参数，将参数变成数组
- 第四行是展开操作符，将数组变成参数
- 第七行是展开操作符，将数组变成参数

同时展开操作符也会对数组进行浅复制。


[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)

## Destructuring assignments（解构赋值）

解构赋值常用的有对象解构、数组解构、对象数组嵌套解构、函数参数解构（基本就是前面三种情况的解构），当前还有字符串、数值、布尔值的解构。同时解构赋值也支持默认值。

``` js
let [a, b, c] = [1, 2, 3];
let [foo = true, [[bar], baz]] = [1, [[2], 3]];
let [x, y, ...z] = ['a'];
let { foo: foo1, bar: bar1 } = { foo: 'aaa', bar: 'bbb' };
```

比较重要的一点是当进行解构赋值的时候比较的是`undefined`，如果原本使用逻辑或设置默认值，这里需要注意下代码的逻辑是否合理。


[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/destructuring)

## Enhanced object literals（增强的对象字面量）

在ES6中对象进行了重大升级。

### 属性的简洁标识法

你不再需要这么做

``` js
const something = 'y'
const x = {
  something: something
}
```

你只需：

``` js
const something = 'y'
const x = {
  something
}
```

### 属性名表达式

``` js
const x = {
  ['a' + '_' + 'b']: 'z'
}
x.a_b //z
```

这在ES6出现之前是不能办到的

### super 关键字

主要用在指向当前对象的原型对象

``` js
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

注意，`super`关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/object)

## Generators

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

### 初步了解

``` js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
// 代码初始化这个 Generator(生成器)函数
var hw = helloWorldGenerator();
```
上面代码定义了一个 Generator 函数`helloWorldGenerator`，它内部有两个`yield`表达式（`hello`和`world`），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

``` js
// 第一次迭代启动迭代器
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

调用遍历器对象的`next`方法，使得指针移向下一个状态，直到`done`为`true`时停止。其中`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

总的来说Generator 函数是可以暂停的，并且能恢复执行。

### 一个更高级的例子

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/generator)

``` js
function* calculator(input) {
    var doubleThat = 2 * (yield (input / 2))
    var another = yield (doubleThat)
    return (input * doubleThat * another)
}

// 初始化这个 Generator(生成器)函数。注意这里不是用 new 。
const calc = calculator(10)

// 第一次迭代启动迭代器。返回：{ value: 5, done: false }
/*
 * 运行函数 input = 10 传递给生成器构造函数。
 * 它一直运行直到达到 yield，并返回 yield 的内容：input / 2 = 5。所以我们得到了一个值 5
 */
calc.next()

// 在第二次迭代中，我们传递值 7。返回：{ value: 14, done: false }
/*
 * 这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果
 * 相当于 var doubleTaht = 2 * 7
 * 然后我们达到第二个 yield ，然后返回 doubleThat ，因此返回值为 14
 */
calc.next(7)

// 在下一个和最后一个迭代中，我们传入 100。返回：{ value: 14000, done: true }
/*
 * 本次迭代没有遇到yield，因此返回return的结果。同时 100 作为上个阶段异步任务的返回结果
 * 传入参数后相当于 var another = 100
 * 当迭代完成时我们只返回(input * doubleThat * another)，其数量为 10 * 14 * 100。
 */
calc.next(100)
```

### 异步编程的应用
[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/generator-async)

## for..of 循环

ES6 引入了`for...of`循环，作为遍历所有数据结构的统一的方法。

`for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象、后文的 Generator 对象，以及字符串。

`for...of`可以使用`break` `continue` 关键字来终止循环和继续下一个循环

``` js
const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v); // red green blue

  continue

  console.log('--') // 永远不会输出
}
```

这里还会有一个数组循环的问题，查看[JavaScript里的循环方法：forEach，for…in，for…of](https://www.html.cn/archives/9261)

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF)

## Map 和 Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

``` js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

Set 结构的实例有以下属性。
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。

Set 实例的四个操作方法。
- add(value)：添加某个值，返回 Set 结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

Set 结构的实例有四个遍历方法，可以用于遍历成员。Set 的遍历顺序就是插入顺序。当然也可以使用`for....of` `...`
- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

同时还有WeakSet，WeakSet 的成员只能是对象，其次垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中

ES6 引入Map结构来扩充键值对的集合，使各种类型的值都可以作为键值，是一种更完善的 Hash 结构表现。

``` js
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```

同时也有WeakMap

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/set-map)

# 参考
[ECMAScript 5.1](http://lzw.me/pages/ecmascript/)
[ES6 带来的重大特性 – JavaScript 完全手册（2018版）](https://www.html.cn/archives/9958)
[ecma-262-5.1](http://www.ecma-international.org/ecma-262/5.1/)
[ecma-262-6.0](http://www.ecma-international.org/ecma-262/6.0/)
