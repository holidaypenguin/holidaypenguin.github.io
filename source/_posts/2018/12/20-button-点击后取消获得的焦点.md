---
title: button 点击后失去获得的焦点
description: <!-- more -->
translate_title: lost-focus-after-button-click
tags:
  - js
  - JavaScript
  - button
  - 焦点
  - 失去焦点
categories:
  - JavaScript
date: 2018-12-20 11:00:28
updated: 2018-12-20 11:00:28
---

浏览器默认元素button在鼠标点击后会获得焦点，这时点击键盘就会响应按钮的点击事件。

某些情况下希望禁止响应点击事件的

可以通过点击后主动失去焦点来达到效果


``` html
<!DOCTYPE html><html><body>

<script>
  function clickHandler(e){
    // 获取当前绑定元素并取消焦点
    e.currentTarget.blur();
  }
</script>

<button onclick="clickHandler(event)">不会留下痕迹</button>

</body></html>
```