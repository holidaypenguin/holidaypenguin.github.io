---
title: cookie与session
description: <!-- more -->
translate_title: cookie-and-session
date: 2019-04-01 18:53:59
updated: 2019-04-01 18:53:59
tags:
  - cookie
  - session
categories:
  - HTTP
---

## Cookie

cookie的相关内容查看[cookie 简介](/blob/2019-04-15-introduction-to-cookie/)

## Session

`Session`的内容已经在 cookie 中提及，只是没有详细的说明。具体来说就是**在HTTP协议之上，通过Cookie实现了持久的会话。这个会话便称为Session**。通常这个 cookie 叫 jsessionid。

Session 是存储在服务器端的，避免了在客户端Cookie中存储敏感数据。 Session 可以存储在HTTP服务器的内存中，也可以存在内存数据库（如redis）中， 对于重量级的应用甚至可以存储在数据库中。

服务器在登录之后设置请求头 Set-Cookie 属性让浏览器保存当前 cookie，在随后向同一服务器发送的请求根据 Domain Path 来确定发送那些 cookie。

# 参考
讲解：https://harttle.land/2015/08/10/cookie-session.html#header-2
MDN HTTP Cookie：https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
MDN HTTP Cookie：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
MDN HTTP Headers Cookie：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie
MDN Set-Cookie：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie
MDN Document Cookie：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
聊一聊 cookie：https://segmentfault.com/a/1190000004556040#articleHeader6

深入了解浏览器存储--从cookie到WebStorage、IndexedDB：https://segmentfault.com/a/1190000018748168?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly