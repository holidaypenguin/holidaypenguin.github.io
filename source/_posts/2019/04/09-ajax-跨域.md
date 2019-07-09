---
title: ajax 跨域
description: <!-- more -->
translate_title: ajax-cross-domain
date: 2019-04-09 10:13:04
updated: 2019-04-09 10:13:04
tags:
  - 跨域
categories:
  - HTTP
---

## 前言
跨域作为前端开发者需要了解并且知道处理办法的一个知识点，也是一个老生常谈的一个话题，所以在这里整理并且给自己做一个记录。

关于跨域，有三种类型，本文只专注于ajax请求跨域(ajax跨域只是属于浏览器`跨源网络访问`中的一部分,其它的还有`跨源脚本API访问`、`跨源数据存储访问`)，

## 为什么会有跨域这个问题

这个问题先查看官方的解释[浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)，对于官方文档有些人可能看的比较吃力，可以查看[浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

## 解决方法

总结来看当前解决ajax跨域问题，主要有五种方法：可跨源的元素、JSONP、CORS、Nginx、WebSocket、

### 可跨域的元素
- script、img、video、audio、embed、@font-face、frame、iframe 的 src
- link 的 href
- object 的 data
- applet 添加授权
基本上常用的只有`script`和`img`，用来接口请求和打点

### JSONP
该方式需要利用可跨域元素script的特性，一个是跨域一个是返回的js代码会在浏览器立即执行，利用这个特性实现的，同时需要服务端的配合。JSONP最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。

它的基本思想是，网页通过添加一个`<script\>`元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

JSONP的缺点是只能发送get请求

首先，网页动态插入`<script\>`元素，由它向跨源网址发出请求。
``` js
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};
```

上面代码通过动态添加`<script\>`元素，向服务器 `example.com` 发出请求。注意，该请求的查询字符串有一个`callback`参数，用来指定回调函数的名字，这对于JSONP是必需的。

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

``` json
foo({
  "ip": "8.8.8.8"
});
```
由于`<script\>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了`foo`函数（该函数绑定在window下，否则会因为找不到该函数而报错），该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用`JSON.parse`的步骤。

### CORS
CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是W3C标准，是跨源AJAX请求的根本解决方法。相比JSONP只能发GET请求，CORS允许任何类型的请求。

这个会单独讲如何通过[CORS 完成跨源AJAX请求](/blob/2019-04-09-cross-domain-resource-sharing-cors/)。

### Nginx
该方法使用的是Nginx的反向代理，Nginx 反向代理的指令不需要新增额外的模块，默认自带 proxy_pass 指令，只需要修改配置文件就可以实现反向代理。

```
# xxxx项目
location ~ ^/xxxx/ {
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header Host xxxx.com;
  #proxy_set_header Host $host;
  #proxy_set_header Host $host:8080;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_http_version 1.1;
  proxy_pass http://192.168.31.35;
  proxy_redirect off;
}
```

具体的配置项在nginx的文章中查看，这里不做介绍

### WebSocket
`WebSocket`是一种通信协议，使用`ws://`（非加密）和`wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

`Websocket`是HTML5的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。`WebSocket`和`HTTP`都是应用层协议，都基于 TCP 协议。但是 WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据。同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。


下面是一个例子，浏览器发出的WebSocket请求的头信息（摘自[维基百科](https://en.wikipedia.org/wiki/WebSocket)）。

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```
上面代码中，有一个字段是`Origin`，表示该请求的请求源（origin），即发自哪个域名。

正是因为有了`Origin`这个字段，所以WebSocket才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。

![0001](/images/FrontEnd/0001.jpg)

# 参考
[ajax跨域，这应该是最全的解决方案了](https://www.cnblogs.com/horanly/p/8676214.html
https://segmentfault.com/a/1190000015597029)

[不要再问我跨域的问题了](https://segmentfault.com/a/1190000015597029)

[浏览器同源政策及其规避方法](浏览器同源政策及其规避方法)

[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

CSRF：http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html

[使用WebSocket进行跨域数据请求](https://blog.csdn.net/itkingone/article/details/83818278)