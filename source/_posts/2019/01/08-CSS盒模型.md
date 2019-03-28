---
title: CSS盒模型
description: <!-- more -->
translate_title: css-box-model
date: 2019-01-08 11:24:44
updated: 2019-01-08 11:24:44
tags:
  - 盒模型
categories:
  - CSS
---

本文章将会从以下几个方面谈谈盒模型。

- 基本概念：标准模型 和IE模型
- CSS如何设置这两种模型
- JS如何设置获取盒模型对应的宽和高
- 实例题（根据盒模型解释边距重叠）
- BFC（边距重叠解决方案）


## 基本概念
[盒模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)（又称框模型、Box Model）的组成大家肯定都懂，由里向外`content`,`padding`,`border`,`margin`.

盒模型是有两种标准的，一个是`标准盒模型`，一个是`IE盒模型`。

![010](/images/css/010.png)

![011](/images/css/011.png)


从上面两图不难看出

在标准模型中，盒模型的宽高只是*内容（content）的宽高*，这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。

而在IE模型中盒模型的宽高是*内容(content)+填充(padding)+边框(border)的总宽高*。大多数情况下这使得我们更容易的去设定一个元素的宽高。

## css如何设置两种模型
这里用到了CSS3 的属性 [box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)

``` css
/* 标准模型 */
box-sizing:content-box;

/*IE模型*/
box-sizing:border-box;

/*从父元素继承 box-sizing 属性*/
box-sizing:inherit;

/*默认值*/
box-sizing:initial;

/* 支持 Firefox, Chrome, Safari, Opera, IE8+ 和老的Android浏览器 */
.example {
  /* Chrome 9-, Safari 5-, iOS 4.2-, Android 3-, Blackberry 7- */
  -webkit-box-sizing: border-box; 

  /* Firefox (desktop or Android) 28- */
  -moz-box-sizing: border-box;

  /* Firefox 29+, IE 8+, Chrome 10+, Safari 5.1+, Opera 9.5+, iOS 5+, Opera Mini Anything, Blackberry 10+, Android 4+ */
  box-sizing: border-box;
}
```

一些专家甚至建议所有的Web开发者们[将所有的元素的box-sizing都设为border-box](https://css-tricks.com/international-box-sizing-awareness-day/)。

``` css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

## JS获取宽高
通过JS获取盒模型对应的宽和高，有以下几种方法：

为了方便书写，以下用dom来表示获取的HTML的节点。

1.  dom.style.width/height 

　　这种方式只能取到dom元素内联样式所设置的宽高，也就是说如果该节点的样式是在style标签中或外联的CSS文件中设置的话，通过这种方法是获取不到dom的宽高的。

2. dom.currentStyle.width/height 

　　这种方式获取的是在页面渲染完成后的结果，就是说不管是哪种方式设置的样式，都能获取到。

　　但这种方式只有IE浏览器支持。

3. window.getComputedStyle(dom).width/height

　　这种方式的原理和2是一样的，这个可以兼容更多的浏览器，通用性好一些。

4. dom.getBoundingClientRect().width/height

　　这种方式是根据元素在视窗中的绝对位置来获取宽高的

5. dom.offsetWidth/offsetHeight

　　这个就没什么好说的了，最常用的，也是兼容最好的。

 

## 垂直margin重叠

具体见 [防止垂直margin重叠](../2019-01-17-preventing-vertical-margin-overlap/)

## 模型画三角形

``` html
<!DOCTYPE html>
<html>
  <head>
    <style>
        .triangle {
            width : 0;
            height: 0;
            border : 100px solid transparent;
            /*这里可以设置border的top、bottom、left、right四个方向的三角*/
            border-top : 100px solid blue; 
        }
    </style>
  </head>
  <body>
    <div class="triangle"></div>
  </body>
</html> 
```
<div style="width : 0; height: 0; border : 100px solid transparent; border-top : 100px solid blue;"></div>

变种（可审查元素查看）

<div style="width : 0;height: 0;border-right: 100px solid transparent;border-top : 100px solid blue;border-left: 50px solid transparent;border-bottom: 20px solid blue;"></div>

# 参考地址
https://www.cnblogs.com/chengzp/p/cssbox.html
https://www.cnblogs.com/clearsky/p/5696286.html