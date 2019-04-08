---
title: hack在微信等webview中无法修改document.title的情况
description: <!-- more -->
translate_title: hack-can't-modify-document.-title-in-webview-such-as-wechat
date: 2019-03-28 23:10:52
updated: 2019-03-28 23:10:52
tags:
  - title
  - 微信
  - hack
categories:
  -JavaScript
---

今天使用了很久以前发现的一个在IOS中动态设置document.title无效的问题，本打算直接去使用上一个记录的内容，发现因为没有引入JQuery无法使用，而且网上还没有原生js的方法，所以在此记录一下，其原理都是利用iframe的加载可以局部刷新页面，从而使<title\>被重新渲染。。

作为一个与时俱进的软甲开发者，我们不能局限于框架，放眼底层原理才是王道。

## 原生js版本
``` js
document.title = title

const body = document.querySelector('body')

// hack在微信等webview中无法修改document.title的情况
let iframe = document.createElement('iframe')

iframe.src = '/favicon.ico'

const setTitle = () => {
  setTimeout(function () {
    iframe.removeEventListener('load', setTitle, false)
    body.removeChild(iframe)
    iframe = undefined
  }, 0)
}

iframe.addEventListener('load', setTitle, false)

body.appendChild(iframe)
```


## 原生js版本
此为在网上找到的版本，比我自己写的简单明了

``` js
setTimeout(function () {
// 利用iframe的onload事件刷新页面
  document.title = title
  let iframe = document.createElement('iframe')
  iframe.style.visibility = 'hidden'
  iframe.style.width = '1px'
  iframe.style.height = '1px'
  iframe.onload = function () {
    setTimeout(function () {
      document.body.removeChild(iframe)
      iframe = undefined
    }, 0)
  }
  document.body.appendChild(iframe)
}, 0)
```


## JQuery 版本

``` js
var $body = $('body');
document.title = '确认车牌';
// hack在微信等webview中无法修改document.title的情况
var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
  setTimeout(function() {
      $iframe.off('load').remove();
  }, 0)
}).appendTo($body);
```