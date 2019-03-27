---
title: 如何让div的高度等于宽度
description: <!-- more -->
translate_title: how-to-make-the-height-of-div-equal-to-the-width
tags:
  - 高度等于宽度
categories:
  - CSS
date: 2019-03-27 14:32:24
updated: 2019-03-27 14:32:24
---

## 引子
今天在开发时遇到一个问题，如何使高度等于百分比的宽度。原本的想法是通过js获取，但是这个方法感觉太麻烦，希望能用css做的事情就不要js去做。

## 解惑

通过查找发现，有js去做的，这样做是后期处理修改宽度值，不建议这样做。

完美的方案是通过`padding`来实现的，通过查找[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)找到了发现了其中的原由，也是平时被我忽略的地方。

首先看MDN对`padding`是如何定义的（截取部分）：

> - **EN**
> The padding CSS property sets the padding area on all four sides of an element. It is a shorthand for padding-top, padding-right, padding-bottom, and padding-left.
>
>   - **Values**
> *<length\>*
> The size of the padding as a fixed value.
> *<percentage\>*
> The size of the padding as a percentage, relative to the width of the containing block.
>
> - **ZH**
> padding属性设置一个元素的内边距，padding 区域指一个元素的内容和其边界之间的空间，该属性不能为负值。
> 
>   - **取值**
> *<长度>*
> 可指定非负的固定宽度. See <length\> for details.
> *<百分比>*
> 相对于包含块的宽度

这一段最终给我们传递了什么意思呢？看最后一句话“相对于包含块的宽度”，意思是`padding`的百分比基数是包含块的宽度（父元素的宽度），如果父元素是100px，`padding-top: 20%;`就相当于`padding-top: 20px`，这是一个值得学习的特性，多用于移动端的适配问题。

## 应用
接下来根据这一特性开始实现让div的高度等于宽度。

假设是一个div占据屏幕中间90%的区域显示，图片比例是1:1。

首先画一个90%宽，比例为1:1的区域
``` css
width: 90%;
height: 0;
margin: 0 auto;
padding-top: 90%;
```

图片要放置在这个区域，但是发现高度为0，通过绝对定位实现，
``` css
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
```

这时候发现有的同学使用`padding-bottom`，原因是这样不需要`top`和`left`属性（道理自己想吧）。

假设现在的图片比例是4:3，我们要怎么计算呢  `90% / 4 * 3 = 67.5%`，其他比例安装这个公式去计算就好。

下面是完整的代码和截取的一个小栗子：
``` html
<div class="banner">
  <img src="xxx.png"/>
</div>
```
``` css
.banner{
  width: 90%;
  height: 0;
  margin: 0 auto;
  padding-bottom: 90%; /*1:1*/
  padding-bottom: 67.5%; /*4:3*/
  position: relative;
}
.banner > img{
  position: absolute;
  width: 100%;
  height: 100%;
}
```

![038](/images/css/038.gif)

# 参考

https://www.cnblogs.com/summer-work/p/6511835.html
http://www.imooc.com/wenda/detail/317720
https://blog.csdn.net/weixin_41534645/article/details/79734635
https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding
https://developer.mozilla.org/en-US/docs/Web/CSS/padding
