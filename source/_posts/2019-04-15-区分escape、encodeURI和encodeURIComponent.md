---
title: 区分escape、encodeURI和encodeURIComponent
description: <!-- more -->
translate_title: 'distinguish-escape,-encodeuri-and-encodeuricomponent'
date: 2019-04-15 20:52:57
updated: 2019-04-15 20:52:57
tags:
  - escape
  - unescape
  - encodeURI
  - encodeURIComponent
  - decodeURI
  - decodeURIComponent
categories:
  - JavaScript
---

## escape
`escape`和它们不是同一类，简单来说，`escape`是对字符串(string)进行编码(而另外两种是对URL)，作用是让它们在所有电脑上可读。编码之后的效果是%XX或者%uXXXX这种形式。

其中 ASCII字母、数字、@*/+ ，这几个字符不会被编码，其余的都会。

最关键的是，当你需要对URL编码时，请忘记这个方法，这个方法是针对字符串使用的，不适用于URL。

`unescape`可以对其编码后的结果进行解码。


## encodeURI 和 encodeURIComponent
对URL编码是常见的事，所以这两个方法应该是实际中要特别注意的，它们都是编码URL，唯一区别就是编码的字符范围。

- encodeURI方法不会对下列字符编码  ASCII字母、数字、~!@#$&*()=:/,;?+'
- encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'

所以encodeURIComponent比encodeURI编码的范围更大。

对应解码方式有decodeURI 和 decodeURIComponent

## 如何去使用

1. 如果只是编码字符串，不和URL有半毛钱关系，那么用escape。
2. 如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。

比如
``` js
encodeURI("http://www.cnblogs.com/season-huang/some other thing");
```
//编码后会变为
```
"http://www.cnblogs.com/season-huang/some%20other%20thing";
```
3. 当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。

``` js
let param = "http://www.cnblogs.com/season-huang/"; //param为参数
param = encodeURIComponent(param);
let url = "http://www.cnblogs.com?next=" + param;
console.log(url) //"http://www.cnblogs.com?next=http%3A%2F%2Fwww.cnblogs.com%2Fseason-huang%2F"
```

# 参考
[简单明了区分escape、encodeURI和encodeURIComponent](http://www.cnblogs.com/season-huang/p/3439277.html)