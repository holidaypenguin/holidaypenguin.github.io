---
title: 跨域资源共享 CORS
description: <!-- more -->
translate_title: cross-domain-resource-sharing-cors
date: 2019-04-09 14:50:19
updated: 2019-04-09 14:50:19
tags:
  - CORS
categories:
  - HTTP
---

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。

它允许浏览器向跨源服务器，发出`XMLHttpRequest`请求，从而克服了AJAX只能同源使用的限制。

跨域资源共享（CORS）是一种机制，它使用额外的HTTP头告诉浏览器让在一个源（域）上运行的Web应用程序有权从不同源服务器访问指定的资源。Web应用程序在请求具有与其自己的源不同的源（域，协议和端口）的资源时执行跨源HTTP请求。

## 什么情况下需要 CORS ？
跨域资源共享标准（ [cross-origin sharing standard](http://www.w3.org/TR/cors/) ）允许在下列场景中使用跨域 HTTP 请求：

- 前文提到的由 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 发起的跨域 HTTP 请求。
- Web 字体 (CSS 中通过 @font-face 使用跨域字体资源), [因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用](http://www.webfonts.info/wiki/index.php?title=%40font-face_support_in_Firefox)。
- [WebGL 贴图](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)
- 使用 [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) 将 Images/video 画面绘制到 canvas
- 样式表（使用 [CSSOM](https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_View)）

## 功能概述
跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 `GET` 以外的 HTTP 请求，或者搭配某些 `MIME` 类型的 `POST` 请求），浏览器必须首先使用 `OPTIONS` 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

CORS请求失败会产生错误，但是为了安全，在JavaScript代码层面是无法获知到底具体是哪里出了问题。你只能查看浏览器的控制台以得知具体是哪里出现了错误。

浏览器将CORS请求分成两类：简单请求（simple requests）和预检请求（Preflighted requests）。

## 简单请求

### 简单请求条件
只要同时满足以下条件，就属于简单请求。

- 请求方法使用下列方法之一：
  - [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)
  - [HEAD](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD)
  - [POST](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST)
- Fetch 规范定义了[对 CORS 安全的首部字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)，不得人为设置该集合之外的其他首部字段。该集合为：
  - [Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)
  - [Accept-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)
  - [Content-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language)
  - [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
  - [DPR](http://httpwg.org/http-extensions/client-hints.html#dpr)
  - [Downlink](http://httpwg.org/http-extensions/client-hints.html#downlink)
  - [Save-Data](http://httpwg.org/http-extensions/client-hints.html#save-data)
  - [Viewport-Width](http://httpwg.org/http-extensions/client-hints.html#viewport-width)
  - [Width](http://httpwg.org/http-extensions/client-hints.html#width)
- 请求中的任意[XMLHttpRequestUpload](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload) 对象均没有注册任何事件监听器；[XMLHttpRequestUpload](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload) 对象可以使用 [XMLHttpRequest.upload](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload) 属性访问。
- 请求中没有使用 [ReadableStream](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 对象。


**注意**
Accept, Accept-Language, 和 Content-Language 首部字段在 WebKit/Safari 中可能不会将这些请求视为“简单请求”。

相关讨论：
[Require preflight for non-standard CORS-safelisted request headers Accept, Accept-Language, and Content-Language](https://bugs.webkit.org/show_bug.cgi?id=165178)
[Allow commas in Accept, Accept-Language, and Content-Language request headers for simple CORS](https://bugs.webkit.org/show_bug.cgi?id=165566)
[Switch to a blacklist model for restricted Accept headers in simple CORS requests](https://bugs.webkit.org/show_bug.cgi?id=166363)


### 举例说明
下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个`Origin`字段。

```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面的头信息中，`Origin`字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```
上面的头信息之中，有三个与CORS请求相关的字段，都以`Access-Control-`开头。

**（1）Access-Control-Allow-Origin**

该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

**（2）Access-Control-Allow-Credentials**

该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为`true`，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为`true`，如果服务器不要浏览器发送Cookie，删除该字段即可。

**（3）Access-Control-Expose-Headers**

该字段可选。CORS请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值

### 完整实例
[一个简单请求的实例](http://arunranga.com/examples/access-control/simpleXSInvocation.html)
``` html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <title>Simple use of Cross-Site XMLHttpRequest (Using Access Control)</title>
  <script type="text/javascript">

  var invocation = new XMLHttpRequest();
  var url = 'http://aruner.net/resources/access-control-with-get/';
  var invocationHistoryText;
  
  function callOtherDomain() {
    if(invocation){    
      invocation.open('GET', url, true);
      invocation.onreadystatechange = handler;
      invocation.send(); 
    } else {
      invocationHistoryText = "No Invocation TookPlace At All";
      var textNode = document.createTextNode(invocationHistoryText);
      var textDiv = document.getElementById("textDiv");
      textDiv.appendChild(textNode);
    }
  }
  function handler(evtXHR) {
    if (invocation.readyState == 4) {
      if (invocation.status == 200) {
        var response = invocation.responseXML;
        var invocationHistory = response.getElementsByTagName('invocationHistory').item(0).firstChild.data;
        invocationHistoryText = document.createTextNode(invocationHistory);
        var textDiv = document.getElementById("textDiv");
        textDiv.appendChild(invocationHistoryText);
      }
      else
        alert("Invocation Errors Occured");
    }
    else
      dump("currently the application is at" + invocation.readyState);
  }
  </script>
</head>
<body>
  <form id="controlsToInvoke" action="">
    <p>
    <input type="button" value="Click to Invoke Another Site" onclick="callOtherDomain()" />
    </p>    
  </form>
  <p id="intro">
    This page basically makes invocations to another domain using cross-site XMLHttpRequest mitigated by Access Control.  This is the simple scenario that is <em>NOT</em> preflighted, and the invocation to a resource on another domain takes place using a simple HTTP GET.
  </p>
  <div id="textDiv">
    This XHTML document invokes another resource using cross-site XHR.
  </div>
</body>
</html>
```

## 预检请求
与前述简单请求不同，“需预检的请求”要求必须首先使用 `OPTIONS`   方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。
### 预检请求条件
当请求满足下述任一条件时，即应首先发送预检请求：

- 使用了下面任一 HTTP 方法：
  - PUT
  - DELETE
  - CONNECT
  - OPTIONS
  - TRACE
  - PATCH
- 人为设置了[对 CORS 安全的首部字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)之外的其他首部字段。该集合为：
  - [Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)
  - [Accept-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)
  - [Content-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language)
  - [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)：不属于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
  - [DPR](http://httpwg.org/http-extensions/client-hints.html#dpr)
  - [Downlink](http://httpwg.org/http-extensions/client-hints.html#downlink)
  - [Save-Data](http://httpwg.org/http-extensions/client-hints.html#save-data)
  - [Viewport-Width](http://httpwg.org/http-extensions/client-hints.html#viewport-width)
  - [Width](http://httpwg.org/http-extensions/client-hints.html#width)

请求中的[XMLHttpRequestUpload](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload)  对象注册了任意多个事件监听器。
请求中使用了[ReadableStream](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream)对象。

**注意**
Accept, Accept-Language, 和 Content-Language 首部字段在 WebKit/Safari 中可能不会将这些请求视为“简单请求”。

### 举例说明
下面是一段浏览器的JavaScript脚本。

``` js
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```
上面代码中，HTTP请求的方法是`PUT`，并且发送一个自定义头信息`X-Custom-Header`。

浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。

```
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
"预检"请求用的请求方法是`OPTIONS`，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。

除了`Origin`字段，"预检"请求的头信息包括两个特殊字段。

- Access-Control-Request-Method
该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是`PUT`。

-（2）Access-Control-Request-Headers
该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是`X-Custom-Header`。

**预检请求的回应**
服务器收到"预检"请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```
上面的HTTP回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.bob.com`可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

```
Access-Control-Allow-Origin: *
```
如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。

```
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```
服务器回应的其他CORS相关字段如下。

```
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
```

- （1）Access-Control-Allow-Methods
该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

- （2）Access-Control-Allow-Headers
如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

- （3）Access-Control-Allow-Credentials
该字段与简单请求时的含义相同。

- （4）Access-Control-Max-Age
该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

**预检请求成功之后浏览器进行正常的CORS请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。**

### 完整实例
``` html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <title>Simple use of Cross-Site XMLHttpRequest (Using Access Control)</title>
  <script type="text/javascript">

  var invocation = new XMLHttpRequest();
  var url = 'http://aruner.net/resources/access-control-with-post-preflight/';
  var invocationHistoryText;
  var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
  
  function callOtherDomain() {
    if(invocation) {
      invocation.open('POST', url, true);
      invocation.setRequestHeader('X-PINGARUNER', 'pingpong');
      invocation.setRequestHeader('Content-Type', 'application/xml');
      invocation.onreadystatechange = handler;
      invocation.send(body); 
    } else {
      invocationHistoryText = "No Invocation TookPlace At All";
      var textNode = document.createTextNode(invocationHistoryText);
      var textDiv = document.getElementById("textDiv");
      textDiv.appendChild(textNode);
    }
      
  }
  function handler(evtXHR) {
    if (invocation.readyState == 4) {
      if (invocation.status == 200) {
        var response = invocation.responseText;
        //var invocationHistory = response.getElementsByTagName('invocationHistory').item(0).firstChild.data;
        invocationHistoryText = document.createTextNode(response);
        var textDiv = document.getElementById("textDiv");
        textDiv.appendChild(invocationHistoryText);
          
      } else {
        alert("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
      }
    } else {
      dump("currently the application is at" + invocation.readyState);
    }
  }
  </script>
</head>
<body>
    <form id="controlsToInvoke" action="">
        <p>
        <input type="button" value="Click to Invoke Another Site" onclick="callOtherDomain()" />
        </p>    
    </form>
    <p id="intro">
    This page POSTs XML data to another domain using cross-site XMLHttpRequest mitigated by Access Control.  This is the preflight scenario and the invocation to a resource on another domain takes place using first an OPTIONS request, then an actual POST request.
    </p>
    <div id="textDiv">
        This XHTML document POSTs to another resource using cross-site XHR.  If you get a response back, the content of that response should reflect what you POSTed.
    </div>
</body>
</html>
```

### 预检请求与重定向
大多数浏览器不支持针对于预检请求的重定向。如果一个预检请求发生了重定向，浏览器将报告错误：
```
The request was redirected to 'https://example.com/foo', which is disallowed for cross-origin requests that require preflight

Request requires preflight, which is disallowed to follow cross-origin redirect
```

在浏览器的实现跟上规范之前，有两种方式规避上述报错行为：

- 在服务端去掉对预检请求的重定向；
- 将实际请求变成一个简单请求。

如果上面两种方式难以做到，我们仍有其他办法：

- 发出一个简单请求（使用  [Response.url](https://developer.mozilla.org/en-US/docs/Web/API/Response/url) 或 [XHR.responseURL](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL)）以判断真正的预检请求会返回什么地址。
- 发出另一个请求（真正的请求），使用在上一步通过[Response.url](https://developer.mozilla.org/en-US/docs/Web/API/Response/url) 或 [XMLHttpRequest.responseURL](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL)获得的URL。

不过，如果请求是由于存在 Authorization 字段而引发了预检请求，则这一方法将无法使用。这种情况只能由服务端进行更改。

## 附带身份凭证的请求
一般而言，对于跨域 `XMLHttpRequest` 或 `Fetch` 请求，浏览器不会发送身份凭证信息。如果要发送凭证信息，需要设置 `XMLHttpRequest`的`withCredentials` 标志设置为 true，从而向服务器发送 Cookies。

``` js
var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/credentialed-content/';
    
function callOtherDomain(){
  if(invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
```

如果服务器端的响应中未携带 `Access-Control-Allow-Credentials: true` ，浏览器将不会把响应内容返回给请求的发送者。


对于附带身份凭证的请求，服务器不得设置 `Access-Control-Allow-Origin` 的值为“*”。

这是因为请求的首部中携带了 `Cookie` 信息，如果 `Access-Control-Allow-Origin` 的值为“*”，请求将会失败。而将 `Access-Control-Allow-Origin` 的值设置为 `http://foo.example`，则请求将成功执行。

另外，响应首部中也携带了 `Set-Cookie` 字段，尝试对 `Cookie` 进行修改。如果操作失败，将会抛出异常。

## HTTP 响应首部字段

- [Access-Control-Allow-Origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
响应首部中可以携带一个 `Access-Control-Allow-Origin` 字段，其语法如下:
```
Access-Control-Allow-Origin: <origin> | *
```
其中，origin 参数的值指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。

例如，下面的字段值将允许来自 `http://mozilla.com` 的请求：
```
Access-Control-Allow-Origin: http://mozilla.com
```
如果服务端指定了具体的域名而非“*”，那么响应首部中的 Vary 字段的值必须包含 Origin。这将告诉客户端：服务器对不同的源站返回不同的内容。

- [Access-Control-Expose-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)
在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

`Access-Control-Expose-Headers` 头让服务器把允许浏览器访问的头放入白名单，例如：
```
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```
这样浏览器就能够通过`getResponseHeader`访问`X-My-Custom-Header`和 `X-Another-Custom-Header` 响应头了。

- [Access-Control-Max-Age](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age)
`Access-Control-Max-Age` 头指定了preflight请求的结果能够被缓存多久，请参考本文在前面提到的preflight例子。
```
Access-Control-Max-Age: <delta-seconds>
```
`delta-seconds` 参数表示preflight请求的结果在多少秒内有效。

- [Access-Control-Allow-Credentials](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)
`Access-Control-Allow-Credentials` 头指定了当浏览器的`credentials`设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用`credentials`。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。
```
Access-Control-Allow-Credentials: true
```

- [Access-Control-Allow-Methods](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)
`Access-Control-Allow-Methods` 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。
```
Access-Control-Allow-Methods: <method>[, <method>]*
```

- [Access-Control-Allow-Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)
`Access-Control-Allow-Headers` 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。
```
Access-Control-Allow-Headers: <field-name>[, <field-name>]*
```

## HTTP 请求首部字段
列出了可用于发起跨域请求的首部字段。请注意，这些首部字段无须手动设置。 当开发者使用 XMLHttpRequest 对象发起跨域请求时，它们已经被设置就绪。

- [Origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin)
`Origin` 首部字段表明预检请求或实际请求的源站。
```
Origin: <origin>
```
origin 参数的值为源站 URI。它不包含任何路径信息，只是服务器名称。

> Note: 有时候将该字段的值设置为空字符串是有用的，例如，当源站是一个 data URL 时。
注意，不管是否为跨域请求，ORIGIN 字段总是被发送。

- [Access-Control-Request-Method](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method)
`Access-Control-Request-Method` 首部字段用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。
```
Access-Control-Request-Method: <method>
```

- [Access-Control-Request-Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers)
`Access-Control-Request-Headers` 首部字段用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。
```
Access-Control-Request-Headers: <field-name>[, <field-name>]*
```

> IE 10 提供了对规范的完整支持，但在较早版本（8 和 9）中，CORS 机制是借由 XDomainRequest 对象完成的。
> Firefox 3.5 引入了对 XMLHttpRequests 和 Web 字体的跨域支持（但最初的实现并不完整，这在后续版本中得到完善）；Firefox 7 引入了对 WebGL 贴图的跨域支持；Firefox 9 引入了对 drawImage 的跨域支持。

## 服务端配置CORS
在服务端使用cors，因为服务端有很多种，所以这里只举例自己知道的Node、Nginx、Koa，如果有同学知道其他的方法，欢迎在评论里面添加。
### Nginx

``` bash
server {
  listen    80;
  server_name  aaaaa.xxxx.me;

  location / {
    if ($request_method = 'OPTIONS') {
      add_header 'Access-Control-Allow-Origin' '*' ;
      add_header 'Access-Control-Allow-Credentials' 'false';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
      add_header 'Access-Control-Max-Age' 1728000;
      add_header 'Content-Type' 'text/plain charset=UTF-8';
      add_header 'Content-Length' 0;
      # 预检请求直接返回
      return 204;
    }
    if ($request_method = 'POST') {
      add_header 'Access-Control-Allow-Origin' '*' ;
      add_header 'Access-Control-Allow-Credentials' 'false';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
    }
    if ($request_method = 'GET') {
      add_header 'Access-Control-Allow-Origin' '*' ;
      add_header 'Access-Control-Allow-Credentials' 'false';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
    }
    proxy_connect_timeout   3;
    proxy_send_timeout      30;
    proxy_read_timeout      30;
    proxy_pass http://localhost:9716;
    proxy_redirect    off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
```

该示例不包含带有身份凭证请求的处理，如果需要可将`Access-Control-Allow-Origin`指定为特定协议+域名+端口的源，同时`Access-Control-Allow-Credentials`为true，这样会因为`Access-Control-Allow-Origin`一次只能配置一个源而无法配置多个源，可以使用map改善这个情况。

``` bash
map $http_origin $corsHost {
    default 0;
    "~http://www.haibakeji.com" http://www.haibakeji.com;
    "~http://m.haibakeji.com" http://m.haibakeji.com;
    "~http://wap.haibakeji.com" http://wap.haibakeji.com;
}
......
add_header Access-Control-Allow-Origin $corsHost;
......
```

### Node
定义一个中间件来添加响应标头，然后在处理app.get（或post等）之前使用 
``` js
//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://example.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

//...
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'cool beans' }));
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
```
### Koa
koa框架肯定是可以解决的，但是有一个优秀的插件将为我们省不少力气。[koa2-cors](https://www.npmjs.com/package/koa2-cors)

``` js
var Koa = require('koa');
var cors = require('koa2-cors');
 
var app = new Koa();
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
```

这段代码只是一个小栗子，具体要查看文档了解详细内容

# 参考
[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
[HTTP访问控制（CORS）(中)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
[Fetch API(中)](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

[Server-Side Access Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Server-Side_Access_Control)
[服务器端访问控制（CORS）(中)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Server-Side_Access_Control)

[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

[配置Nginx 允许多个域名跨域访问](https://www.haibakeji.com/archives/249.html)
[在Node.js上启用CORS](https://blog.csdn.net/azureternite/article/details/52349219)