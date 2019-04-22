---
title: JavsScript ES9&ES2018的新特性
description: <!-- more -->
translate_title: new-features-of-javsscript-es9-&-es2018
date: 2019-04-17 20:37:01
updated: 2019-04-17 20:37:01
tags:
  - Ecma
  - ECMAScript
  - ES9
  - ES2018
  - ECMAScript 2018
  - JavaScript
categories:
  - JavaScript
---
写在前面的话标准非实际情况。

ECMAScript 2018，ECMA-262 标准版本的第9版（通常称为ES2018或ES9），于 2018 年 6 月完成。

> ECMAScript 2018 introduced support for asynchronous iteration via the AsyncIterator protocol and async generators. It also included four new regular expression features: the dotAll flag, named capture groups, Unicode property escapes, and look-behind assertions. Lastly it included rest parameter and spread operator support for object properties.


- Rest(剩余)/Spread(展开) 属性
- Asynchronous iteration （异步迭代）
- Promise.prototype.finally()
- 正则表达式改进
  - 先行断言(lookahead) 和 后行断言(lookbehind)
  - Unicode 属性转义 \p{…} 和 \P{…}
  - 命名捕获组（Named capture groups）
  - 正则表达式的 ‘s’ 标志

## Rest(剩余) 属性

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。但是是浅拷贝。

``` js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

解构赋值必须是最后一个参数，而且等号右边是 `undefined`或`null`都会报错

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/object#%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)

## Spread(展开) 属性
对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。等同于使用`Object.assign()`方法。
``` js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/object#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)

## Asynchronous iteration （异步迭代）

`for...of`循环用于遍历同步的 `Iterator` 接口。新引入的`for await...of`循环，则是用于遍历异步的 `Iterator` 接口。

``` js
async function f() {
  for await (const x of createAsyncIterable(['a', 'b'])) {
    console.log(x);
  }
}
// a
// b
```

上面代码中，createAsyncIterable()返回一个拥有异步遍历器接口的对象，for...of循环自动调用这个对象的异步遍历器的next方法，会得到一个 Promise 对象。await用来处理这个 Promise 对象，一旦resolve，就把得到的值（x）传入for...of的循环体。

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/async#for-await---of)

## Promise.prototype.finally()

`finally`方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。`finally`方法的回调函数不接受任何参数，因此`finally`方法里面的操作，应该是与状态无关的

``` js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```
`finally`的简单实现
``` js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/promise#Promise-prototype-finally)

## 正则表达式改进

### 先行断言(lookahead) 和 后行断言(lookbehind)

JavaScript 语言的正则表达式，只支持先行断言（lookahead）和先行否定断言（negative lookahead），该版本引入后行断言（lookbehind）和后行否定断言（negative lookbehind）。

- “先行断言”指的是，`x`只有在`y`前面才匹配，必须写成`/x(?=y)/`。
- “先行否定断言”指的是，`x`只有不在`y`前面才匹配，必须写成`/x(?!y)/`。
- “后行断言”正好与“先行断言”相反，`x`只有在`y`后面才匹配，必须写成`/(?<=y)x/`。
- “后行否定断言”则与“先行否定断言”相反，`x`只有不在`y`后面才匹配，必须写成`/(?<!y)x/`。

**先行断言** **先行否定断言**
``` js
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
```

**后行断言** **后行否定断言**
``` js
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/regex#%E5%90%8E%E8%A1%8C%E6%96%AD%E8%A8%80)

### Unicode 属性转义 \p{…} 和 \P{…}

`\p{...}`允许正则表达式匹配符合 Unicode 某种属性的所有字符，`\P{...}`匹配不满足条件的字符。这两种类只对 Unicode 有效，所以使用的时候一定要加上`u`修饰符。如果不加`u`修饰符，正则表达式使用`\p`和`\P`会报错。

匹配一个希腊文字母
``` js
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π') // true
```

Unicode 属性类要指定属性名和属性值。
``` js
\p{UnicodePropertyName=UnicodePropertyValue}
```

对于某些属性，可以只写属性名，或者只写属性值。
``` js
\p{UnicodePropertyName}
\p{UnicodePropertyValue}
```

``` js
/^\p{Script=Greek}+$/u.test('ελληνικ?') // true
/^\p{Script=Latin}+$/u.test('hey') // true
```

具体有哪些属性和属性值可以提案上查看所有属性：[tc39/proposal-regexp-unicode-property-escapes](https://github.com/tc39/proposal-regexp-unicode-property-escapes)

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/regex#Unicode-%E5%B1%9E%E6%80%A7%E7%B1%BB)

### 具名组匹配（Named capture groups）

允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

``` js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```

具名组匹配等于为每一组匹配加上了 ID，便于描述匹配的目的。如果组的顺序变了，也不用改变匹配后的处理代码。同时，数字序号（`matchObj[1]`）依然有效。

**解构赋值**

``` js
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar
```

**解构替换**
``` js
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>') // '02/01/2015'
```

`replace`方法的第二个参数也可以是函数具体用法查看更多信息。

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/regex#%E5%85%B7%E5%90%8D%E7%BB%84%E5%8C%B9%E9%85%8D)

### 正则表达式的 ‘s’ 修饰符

ES2018 [引入](https://github.com/tc39/proposal-regexp-dotall-flag)`s`修饰符，使得`.`可以匹配任意单个字符。这被称为dotAll模式，即点（dot）代表一切字符。

``` js
/foo.bar/s.test('foo\nbar') // true
/foo.bar/s.test('fooabar') // true
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/regex#s-%E4%BF%AE%E9%A5%B0%E7%AC%A6%EF%BC%9AdotAll-%E6%A8%A1%E5%BC%8F)


# 参考
[ecma-262-9.0](http://www.ecma-international.org/ecma-262/9.0/index.html)