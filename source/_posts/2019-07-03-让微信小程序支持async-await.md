---
title: 让微信小程序支持async-await
description: <!-- more -->
translate_title: let-wechat-applet-support-async-await
categories:
  - 微信小程序
date: 2019-07-03 17:38:34
updated: 2019-07-03 17:38:34
tags:
---

> async-await是ES7的语法，截止我写这篇文章为止，小程序还是不支持async-await语法的，所以需要使用[regenerator](https://github.com/facebook/regenerator)这个库

在小程序开发工具中如果勾选es6转es5, 会报错：
```
ReferenceError: regeneratorRuntime is not defined
```

为了避免报错引入[regenerator](https://github.com/facebook/regenerator)。

## 引入步骤

1. 在根目录下创建 lib 文件夹，并将 https://github.com/facebook/regenerator/tree/master/packages 里面的 regenerator-runtime 文件夹放进去。
  ![0004](/images/wechatapp/0004.png)

2. 如果出现错误`Uncaught TypeError: Function(...) is not a function`将`runtime.js`最后一段`try..catch...`删掉
  ![0005](/images/wechatapp/0005.png)


## 使用方法

1. 在需要使用的地方直接进入即可
``` js
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime';
```

2. 当有返回是`promise`时，可直接使用 `async` `await`

3. 处理微信微信小程序原生Api可以使用`promise`包裹一层，该api可以暴露在`app.js`中并通过`getApp()`获取，也可以通过`export` `import`来实现。

## 在需要使用api 的页面中处理如下

``` js
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime';

Page({
  async onLoad(options) {
    console.log('执行删除token--开始')
    await this.removeStorage('token');
    console.log('执行删除token--结束')
  },

  removeStorage(key) {
    return new Promise((resolve, reject) => {
      wx.removeStorage({ key: key, success: resolve, fail: reject })
    })
  }
})

```


# 参考

https://blog.csdn.net/weixin_33755554/article/details/88760981
https://www.cnblogs.com/cckui/p/10231801.html