---
title: css实现了hover显示title的效果
description: <!-- more -->
translate_title: css-realizes-the-effect-of-hover-displaying-title
tags:
  - title
categories:
  - CSS
date: 2019-01-14 09:55:19
updated: 2019-01-14 09:55:19
---

## 代码

``` html
<div data-title="hello, world">hello...</div>

<style>
div {
    position: relative;
}
div:hover::after {
    content: attr(data-title);    //取到data-title属性的值
    display: inline-block;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    position: absolute;
    top: -50px;
    left: -30px;
}
</style>
```

效果图

![018](/images/css/018.jpg)

# 参考
https://www.cnblogs.com/horanly/p/6101283.html
