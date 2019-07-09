---
title: JavsScript ES7&ES2016的新特性
description: <!-- more -->
translate_title: new-features-of-javsscript-es7-&-es2016
date: 2019-04-17 20:36:34
updated: 2019-04-17 20:36:34
tags:
  - Ecma
  - ECMAScript
  - ES7
  - ES2016
  - ECMAScript 2016
  - JavaScript
categories:
  - JavaScript
---
写在前面的话标准非实际情况。

ES7，正式名称为 ECMAScript 2016 ，于2016年6月完成。

> ECMAScript 2016 was the first ECMAScript edition released under Ecma TC39's new yearly release cadence and open development process. A plain-text source document was built from the ECMAScript 2015 source document to serve as the base for further development entirely on GitHub. Over the year of this standard's development, hundreds of pull requests and issues were filed representing thousands of bug fixes, editorial fixes and other improvements. Additionally, numerous software tools were developed to aid in this effort including Ecmarkup, Ecmarkdown, and Grammarkdown. ES2016 also included support for a new exponentiation operator and adds a new method to Array.prototype called  includes.

与ES6相比，ES7 是 JavaScript 的一个小版本，仅包含两个功能：

- Array.prototype.includes
- 求幂运算符

## Array.prototype.includes()

此功能引入了更易读的语法，用于检查数组是否包含元素。

使用 ES6 和更低版本，要检查数组是否包含某个元素项，您必须使用 `indexOf` ，它检查数组中的索引，如果元素不存在则返回 `-1` 。

由于 `-1` 被求值为真值，因此您不能这样做：
``` js
if (![1,2].indexOf(3)) {
  console.log('Not found')
}
```
借助 ES7 中引入的这一新功能，我们可以这样做：
``` js
if (![1,2].includes(3)) {
  console.log('Not found')
}
```

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-includes)

## 求幂运算符

求幂运算符 ** 等价于 Math.pow()，但是它被引入语言本身，而不是库函数。

``` js
Math.pow（4,2）== 4 ** 2
```

这个特性对于数学密集型的 JavaScript 应用程序来说是一个很好的补充。

** 运算符在许多语言中都是标准化的，包括Python，Ruby，MATLAB，Lua，Perl等等。

[>>查看更多信息<<](http://es6.holidaypenguin.com/#docs/number#%E6%8C%87%E6%95%B0%E8%BF%90%E7%AE%97%E7%AC%A6)

# 参考
[ES2016（ES7） 的改进 – JavaScript 完全手册（2018版）](https://www.html.cn/archives/9965)
[ES7和ES8新特性](https://blog.csdn.net/zuggs_/article/details/80650436)
[ecma-262-7.0](http://www.ecma-international.org/ecma-262/7.0/)