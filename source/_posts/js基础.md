---
title: js基础
translate_title: js-foundation
date: 2018-05-24 11:41:47
tags:
---



# JS


## 原始数据类型

> null、undefined、Number、String、Boolean、Symbol

## 基本数据类型
> null、undefined、Number、String、Boolean、Symbol、Object、Array

## 判断数据类型的方法
> typeof、Object.prototype.toString.call、constructor、instanceof

## 一个完整的url由哪些部分组成
> 协议、主机名、端口、路径、查询参数

##正则处理手机号中间四位

```javascript
function maskPhone(phone){
    
    return phone && phone.replace(/(\d{3})\d{4}(\d{0,4})/g,"$1****$2");
}

```

## 获取url参数并保存为对象

```javascript

function getQueryString(url){
    url.replace(/[\?\&]([^\?\&]+)=([^\?\&]+)/g, function($0, $1, $2){
        console.log($0, $1, $2)
    });
}
getQueryString("http://www.rongyi.com?a=1&b=2&c");
```



## 什么是跨域

> 浏览器限制从脚本内发起的跨站点HTTP请求，是由XMLHttpRequest 和 Fetch遵循同源策略（协议、主机名、端口三者相同为同源）造成的。

[HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

## 跨域解决方法
> 1. 通过src、href


简单的请求并且不需要返回值，使用`<img>` `<script>` `<link>` `<iframe>`元素通过src，href属性设置为目标url，实现跨域请求。

> 2. JSONP

```javascript
let callbackFn = function(data){console.log(data)};
let url = "http://www.baidu.com/jsonp?callback=callbackFn";
let script = document.createElement("script");

script.setAttribute("src", url);
document.getElementsByTagName("head")[0].appendChild(script);
```
> 3. 代理


设置nginx代理等


> 4. Html5 CORS 功能

Http Header 修改，需要服务器支持
```html
header('Access-Control-Allow-Origin:*');//允许所有来源访问
header('Access-Control-Allow-Method:POST,GET');//允许访问的方式
```

> 5. 跨文档消息传输

向外界窗口发送消息：
- otherWindow:  指目标窗口，也就是给哪个window发消息，是 window.frames 属性的成员或者由 window.open 方法创建的窗口
- message:  是要发送的消息，类型为 String、Object (IE8、9 不支持)
- targetOrigin:  是限定消息接收范围，不限制请使用 ‘*’
```javascript
otherWindow.postMessage(message, targetOrigin);
```

接受信息的”message”事件
- 回调函数第一个参数接收 Event 对象，有三个常用属性：
- data:  消息
- origin:  消息来源地址
- source:  源 DOMWindow 对象

```javascript
var onmessage = function (event) {
    var data = event.data;
    var origin = event.origin;
    //do someing
};
window.addEventListener('message', onmessage, false);
```


## 创建一个长度为10的数组
> 创建一个长度为10的数组，并且每一个元素是该元素的下标


- ### 最简单方法 for循环
```javascript
function arrayCreate(length){
    let arr = [];
    for(let i = 0 ; i < length ; i++){
      arr[i] = i;
    }
    return arr;
}

let a1 = arrayCreate(10);
```



> `Array.prototype.from()` 方法从一个类数组或可迭代对象中创建一个新的数组示例。  
>
> `Array(10)` 创建一个只有长度的数组，这时候不能使用map方法，可以使用fill方法。    
>
> `new Array(10)` 同 Array(10)。    
>
> `{length: 10}` 类数组对象，且这是一个无值的对象。  
>
> `Array.apply` 实际使用的是Function.prototype.apply；第二个参数正常是一个数组，如果是类数组对象，就作为一个数组去处理。   
>
> `Array.prototype.fill()` 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。   
>
> `Array.prototype.keys()` 方法返回一个新的Array迭代器，包含数组中每个索引的键。   
>
> `...` 扩展运算符   
>
> `Object.keys()` 方法返回由一个给定对象的自身可枚举属性组成的数组   


```javascript
Array.from({length: 10}, (v, k) => k);

Array.from(Array(10).keys());
Array.from(new Array(10).keys());
Array.from(Array.apply(null, Array(10)).keys());
Array.from(Array.apply(null, {length: 10}).keys());
Array.from(Array(10).fill(1).keys());
Array.from(Array.from({length: 10}).keys());

[...Array(10).keys()];
[...new Array(10).keys()];
[...Array.apply(null, Array(10)).keys()];
[...Array.apply(null, {length: 10}).keys()];
[...Array(10).fill(1).keys()];
[...Array.from({length: 10}).keys()];


Object.keys(Array.apply(null, {length:10})).map(key => +key);
Object.keys(Array.from({length:10})).map(key => +key);
Object.keys(String(Array(11))).map(key => +key);

new Array(10).toString().split(",").map((v, i) => i);

"".padStart(9, "-").split("-").map((v,k)=>k);
"".padEnd(9, "-").split("-").map((v,k)=>k);
"-".repeat("9").split("-").map((v,k)=>k);

```



## 函数作用域

```javascript
function EE(){console.log(this)}
EE();       // 全局作用域
new EE();   // 局部作用域

function FF(){return function(){console.log(this)}}
FF()();       // 全局作用域
new FF()();   // 全局作用域

function GG(){return {a: function(){console.log(this)}}}
GG().a();       // 局部作用域
new GG().a();   // 局部作用域

var hh = {
  a: function(){console.log(this);},
  ee0: function(){EE();},
  ee: function(){new EE();},
  ff0: function(){FF()();},
  ff: function(){new FF()();},
  ff1: FF(),
  gg: function(){new GG().a()}
};

hh.a();        // hh的局部作用域
hh.ee0();    // 全局作用域
hh.ee();      // ee的局部作用域
hh.ff0();     // 全局作用域
hh.ff();       // 全局作用域
hh.ff1();     // hh的局部作用域 --- 从此解开谜底
hh.gg();     // GG的局部作用域    
```



## 事件

```javascript
const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      element && event && handler && element.addEventListener(event, handler, false);
    };
  } else {
    return function(element, event, handler) {
      element && event && handler && element.attachEvent('on' + event, handler);
    };
  }
})();


const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      element && event && element.removeEventListener(event, handler, false);
    };
  } else {
    return function(element, event, handler) {
      element && event && element.detachEvent('on' + event, handler);
    };
  }
})();
```

## 运算符优先级

> 首先是从一道 [面试题](https://zhuanlan.zhihu.com/p/27131429) 引发的思考 

```js
var a = {n: 1}
var b = a;
a.x = a = {n: 2}

console.log(a.x); // undefined
console.log(b.x); // {n: 2}
```

> 各种解释 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) [知乎](https://www.zhihu.com/question/52116922)

> 试着去读如下代码

`a>b?a--:--a+b>b+c?a==b<c||a==c:(a+b)*a`

c=3

| 执行前a | 执行前b | 执行结果 | 执行后a | 执行后b |
| ---- | ---- | ---- | ---- | ---- |
| 2    | 6    | 7    | 1    | 6    |
| 6    | 2    | 6    | 5    | 2    |
| 0    | 6    | -5   | -1   | 6    |

优先级大小依次降低：()、--、*、+、<、==、||、? :

> 运算符AST分析 [分析地址1](http://nhiro.org/learn_language/AST-Visualization-on-browser.html) [分析地址2](http://esprima.org/demo/parse.html#)

分析这段代码`a || b && c || d`

<svg height="430" version="1.1" width="1625" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative;margin-left: -415px;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect x="736.5" y="20" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><text x="811.5" y="32" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Program</tspan></text><rect x="736.5" y="90" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><path fill="none" stroke="#cccccc" d="M811.5,70L811.5,90Z" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="811.5" y="102" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">ExpressionStatement</tspan></text><rect x="736.5" y="160" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><path fill="none" stroke="#cccccc" d="M811.5,140L811.5,160Z" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="811.5" y="172" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">LogicalExpression</tspan></text><text x="811.5" y="184" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">operator: ||</tspan><tspan dy="14.399999999999999" x="811.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></tspan></text><rect x="651.5" y="230" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><path fill="none" stroke="#cccccc" d="M811.5,210L726.5,230Z" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="726.5" y="242" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">LogicalExpression</tspan></text><text x="726.5" y="254" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">operator: ||</tspan><tspan dy="14.399999999999999" x="726.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></tspan></text><rect x="566.5" y="300" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><path fill="none" stroke="#cccccc" d="M726.5,280L641.5,300Z" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="641.5" y="312" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Identifier</tspan></text><text x="641.5" y="324" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">name: a</tspan><tspan dy="14.399999999999999" x="641.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></tspan></text><rect x="736.5" y="300" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><path fill="none" stroke="#cccccc" d="M726.5,280L811.5,300Z" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="811.5" y="312" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">LogicalExpression</tspan></text><text x="811.5" y="324" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">operator: &amp;&amp;</tspan><tspan dy="14.399999999999999" x="811.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></tspan></text><rect x="651.5" y="370" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><path fill="none" stroke="#cccccc" d="M811.5,350L726.5,370Z" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="726.5" y="382" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Identifier</tspan></text><text x="726.5" y="394" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">name: b</tspan><tspan dy="14.399999999999999" x="726.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></tspan></text><rect x="821.5" y="370" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><path fill="none" stroke="#cccccc" d="M811.5,350L896.5,370Z" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="896.5" y="382" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Identifier</tspan></text><text x="896.5" y="394" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">name: c</tspan><tspan dy="14.399999999999999" x="896.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></tspan></text><rect x="991.5" y="370" width="150" height="50" r="10" rx="10" ry="10" fill="#33aaaa" stroke="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><path fill="none" stroke="#cccccc" d="M811.5,210L1066.5,370Z" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="1066.5" y="382" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="14px" font-family="Arial, Helvetica, sans-serif"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Identifier</tspan></text><text x="1066.5" y="394" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">name: d</tspan><tspan dy="14.399999999999999" x="1066.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></tspan></text></svg>



|| 与 && 的短路求值语义，如果左操作数已经足以求出结果则不会对右操作数求值。

> 常用操作符优先级

逗号、赋值、条件、逻辑或、逻辑与、相等、比较、算术、前置递减、后置递减、成员访问、小括号





## 变量作用域



## 闭包



# CSS



## 清除浮动



### 父级元素使用高度

因为浮动导致父元素高度塌陷，所以给父元素添加高度。

优点：简单、代码少、容易掌握

缺点：高度固定，如果两则皆不是固定高度，该方法不可用

建议：可以再少数固定高度的情况使用

css

```css
.float-wraper{height: 100px;}
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
```

html

```html
<div class="float-wraper">
    <div class="float-inner"></div>
</div>
```

### 父级元素使用overflow:hidden

使用时浏览器会自动检测浮动区域的高度，如果父元素本身有高度，且子元素高度超出父元素高度，则超出部分被隐藏。*同时使用使用width或者zoom:1 来兼容IE6 IE7。*

优点：简单、代码少、浏览器支持好

缺点：和子元素使用position、父元素使用height配合时，小心子元素超出部分被隐藏

建议：子元素不要使用position，父元素不要使用height

css

```css
.float-wraper{overflow: hidden; zoom: 1;}
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
```

html

```html
<!-- 同上 -->
```

### 父级元素使用 overflow:auto

使用方法同上。

css

```css
.float-wraper{overflow: auto; zoom: 1;}
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
```

html

```html
<!-- 同上 -->
```

### 父级元素使用 display:table

将`div` 的`display`变成`table`，使父元素高度不会塌陷。

css

```css
.float-wraper{display: table;}
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
```

html

```html
<!-- 同上 -->
```

建议：不建议使用

### 父级元素使用 display:inlin-block

将`div` 的`display`变成`inlin-block`，变成行内块元素后父元素高度不会塌陷。

`*display` 和`*zoom`为了兼容IE6 IE7

css

```css
.float-wraper{display: inline-block; *display: inline; *zoom: 1;}
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
```

html

```html
<!-- 同上 -->
```

缺点：无法使用`margin: 0 auto;`居中

### 父级元素也使用浮动

css

```css
.float-wraper{float: left;}
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
```

html

```html
<!-- 同上 -->
```

缺点：会产生新的浮动，要一直浮动到body

建议：只作为了解

### 结尾处添加空元素clear: both

在结尾处清除浮动

css

```css
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
.float-clear{clear: both;}
```

html

```html
<div class="float-wraper">
  <div class="float-inner"></div>
  <div class="float-clear"></div>
</div>
```

缺点：此方法需要在结尾添加一个节点，不够友好

### 结尾处添加br元素 clear="both"

br标签自带clear属性，原理和上一个方法一样，在结尾处清除浮动

css

```css
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
```

html

```html
<div class="float-wraper">
  <div class="float-inner"></div>
  <br cler="both">
</div>
```

缺点：此方法需要在结尾添加一个节点，不够友好

### 父级元素添加after和zoom-(主流)

添加一个有内容的伪元素，设置成块级元素，清除尾部的浮动，同时设置成不可见，保证不占用位置。

为了兼容IE6 IE7使用zoom，IE8以上和非IE浏览器才支持::after

css

```css
.float-inner{float:left; width: 100px; height: 100px; background: #e2e2e2;}
.clearfix::after{content:""; display:block; clear:both; visibility:hidden; height:0} 
.clearfix{zoom:1} 
```

html

```html
<div class="float-wraper clearfix">
    <div class="float-inner"></div>
</div>
```

优点：浏览器支持好、不容易出现怪问题



