---
title: 纯 CSS 实现多行文字截断
description: <!-- more -->
translate_title: pure-css-for-multi-line-text-truncation
tags:
  - CSS
  - 文字截断
categories:
  - CSS
date: 2017-12-11 10:43:20
updated: 2017-12-11 10:43:20
---

# 单行文本截断 text-overflow

文本溢出我们经常用到的应该就是 text-overflow:ellipsis 了，相信大家也很熟悉，只需轻松几行代码就可以实现单行文本截断。

``` css
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

实现效果：
![001](/images/css/001.gif)

** 优点：** 属性浏览器原生支持，各大浏览器兼容性好

** 缺点：** 就是只支持单行文本截断，并不支持多行文本截取。

** 适用场景：** 单行文字截断最简单实现，效果最好，放心使用。


# 多行文本截断 -webkit-line-clamp

``` css
.nowrap2 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

它需要和 display、 -webkit-box-orient 和 overflow 结合使用：
- display:-webkit-box; 必须结合的属性，将对象作为弹性伸缩盒子模型显示。
- -webkit-box-orient; 必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式。
- text-overflow:ellipsis; 可选属性，可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。

实现效果：
![002](/images/css/002.gif)

** 优点：**
1. 响应式截断，根据不同宽度做出调整。
2. 文本超出范围才显示省略号，否则不显示省略号。
3. 浏览器原生实现，所以省略号位置显示刚好。

** 缺点：** 因为 -webkit-line-clamp 是一个不规范的属性，它没有出现在 CSS 规范草案中。也就是说只有 webkit 内核的浏览器才支持这个属性，像 Firefox, IE 浏览器统统都不支持这个属性，浏览器兼容性不好。

** 使用场景：** 多用于移动端页面，因为移动设备浏览器更多是基于 webkit 内核，除了兼容性不好，实现截断的效果不错。

# 定位元素实现多行文本截断

另外还有一种靠谱简单的做法就是设置相对定位的容器高度，用包含省略号(…)的伪元素模拟实现，通过伪元素绝对定位到行尾并遮住文字，再通过 overflow:hidden隐藏多余文字，实现方式如下：

``` css
p {
    position: relative;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
    word-break:break-all; 
}
p::after {
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 20px 1px 45px;
    /* 为了展示效果更好 */
    background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
    background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}
```

实现效果：
![003](/images/css/003.gif)

** 优点： **
- 兼容性好，对各大主流浏览器有好的支持
- 响应式截断，根据不同宽度做出调整

** 缺点： ** 省略号一直显示，无法做到自适应显示

** 适合场景：** 文字内容较多，确定文字内容一定会超过容器的，那么选择这种方式不错。

# float 特性实现多行文本截断

有个三个盒子 div，粉色盒子左浮动，浅蓝色盒子和黄色盒子右浮动：
- 当浅蓝色盒子的高度低于粉色盒子，黄色盒子仍会处于浅蓝色盒子右下方。
- 如果浅蓝色盒子文本过多，高度超过了粉色盒子，则黄色盒子不会停留在右下方，而是掉到了粉色盒子下。

![004](/images/css/004.jpeg)

那么我们可以将黄色盒子进行相对定位，将内容溢出的黄色盒子移动到文本内容右下角，而未溢出的则会被移到外太空去了，只要我们使用 overflow:hidden就可以隐藏掉。

基本原理就是这样，我们可以将浅蓝色区域想象成标题，黄色区域想象为省略号效果。那么你可能会觉得粉色盒子占了空间，那岂不是标题会整体延后了吗，这里可以通过 margin 的负值来出来，设置浅蓝色盒子的 margin-left 的负值与粉色盒子的宽度相同，标题也能正常显示。

``` html
<div class="wrap">
  <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos labore sit vel itaque delectus atque quos magnam assumenda quod architecto perspiciatis animi.</div>
</div>
```

``` css
.wrap {
  height: 40px;
  line-height: 20px;
  overflow: hidden;
}
.wrap .text {
  float: right;
  margin-left: -5px;
  width: 100%;
  word-break: break-all;
}
.wrap::before {
  float: left;
  width: 5px;
  content: '';
  height: 40px;
}
.wrap::after {
  float: right;
  content: "...";
  height: 20px;
  line-height: 20px;
  /* 为三个省略号的宽度 */
  width: 3em;
  /* 使盒子不占位置 */
  margin-left: -3em;
  /* 移动省略号位置 */
  position: relative;
  left: 100%;
  top: -20px;
  padding-right: 5px;
  text-align: right;
  background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
  background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}
```

实现效果：
![005](/images/css/005.gif)

** 优点： **
1. 兼容性好，对各大主流浏览器有好的支持。
2. 响应式截断，根据不同宽度做出调整。
3. 文本超出范围才显示省略号，否则不显示省略号。

** 缺点： ** 因为我们是模拟省略号，所以显示位置有时候没办法刚刚好


以上为从 https://segmentfault.com/a/1190000016879657 获取

# 结合第一种方式实现
显示几行就创建几行内容，每一行的宽度为相应的倍数，同时从第二行开始比上一行位移一份的宽度。

``` html
<style>
  *{
    margin: 0;
    padding: 0;
    border: 0;
  }

  .nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .wrap{
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .line{
    /* 两行的宽度为200%，三行的宽度为300% */
    width: 200%;
  }
  .line2{
    /* 两行向左位移50%，三行向左位移33.3333% */
    transform: translateX(-50%);
  }
</style>

<div class="wrap">
  <div class="line nowrap">文本溢出我们经常用到的应该就是 text-overflow:ellipsis 了，相信大家也很熟悉，只需轻松几行代码就可以实现单行文本截断。</div>
  <div class="line nowrap line2">文本溢出我们经常用到的应该就是 text-overflow:ellipsis 了，相信大家也很熟悉，只需轻松几行代码就可以实现单行文本截断。</div>
</div>
```
** 优点： **
1. 响应式截断，根据不同宽度做出调整。
2. 文本超出范围才显示省略号，否则不显示省略号。
3. 浏览器原生实现，所以省略号位置显示刚好。

** 缺点： ** 在换行处会出现一半文字的情况

这一段为自己思考所得

# float与-webkit-line-clamp的实现

`-webkit-line-clamp`是`webkit`内核的私有`css`属性，用于进行多行省略，在安卓和ios上全支持。但它固定使用省略号，无法直接扩展。而且自带了溢出截断逻辑，作用于容器高度。仔细考察可发现它使用的省略号是单字符…，可以用文字css属性如`font-size`,`letter-spacing`,`color`等控制。

利用右浮动原理——右浮动元素从右到左依次排列，不够空间则换行。

原理展示：
![006](/images/css/006.gif)

``` html
<!DOCTYPE html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px}}/*测试*/</style>
<div style="position: relative;line-height:18px;-webkit-animation: width-change 8s ease infinite;max-height: 108px;">
    <div style="font-size: 36px;letter-spacing: 28px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: transparent;line-height: 18px;position: relative;">
        <div style="font-size:12px;color: #000;display: inline;vertical-align: top;letter-spacing: 0;">
        腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。
        </div>
        <div style="position:absolute;top: 0;left: 50%;width: 100%;height: 100%;letter-spacing: 0;color: #000;font-size: 12px;background: rgba(173, 216, 230, 0.5);">
            <div style="float: right;width: 50%;height: 100%;background: rgba(255, 192, 203, 0.5);"></div>
            <div style="float: right;width: 50%;height: 108px;background: hsla(223, 100%, 50%, 0.19);"></div>
            <div style="float: right;width: 50px;height: 18px;position: relative;background: rgba(255, 165, 0, 0.5);" class="">... 更多</div>
        </div>
    </div>
</div>   
</body></html>
```

将`-webkit-line-clamp`实现的文字溢出截断代码为主体，叠加绝对定位同步的按需显示`...更多`结构。因为绝对定位，这里使用百分比简化代码。最外包一层结构限制最大高度。

![007](/images/css/007.gif)

``` html
<!DOCTYPE html><html><body>
<style>
/*
 * 行高 h
 * 最大行数 n
 * ...更多容器的宽 w
 * 字号 f
 */

@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px}}
.ellipsis {
    position: relative;
    background: rgb(230, 230, 230);
    width: 260px;
    max-height: 108px; /* h*n */
    line-height: 18px; /* h */
    overflow: hidden;
    -webkit-animation: width-change 8s ease infinite;
}
.ellipsis-container {
    position: relative;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6; /* n */
    font-size: 50px; /* w */
    color: transparent;
}
.ellipsis-content {
    color: #000;
    display: inline;
    vertical-align: top;
    font-size: 12px; /* f */
}
.ellipsis-ghost {
    position:absolute;
    z-index: 1;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    color: #000;
}
.ellipsis-ghost:before {
    content: "";
    display: block;
    float: right;
    width: 50%;
    height: 100%;
}
.ellipsis-placeholder {
    content: "";
    display: block;
    float: right;
    width: 50%;
    height: 108px; /* h*n */
}
.ellipsis-more {
    float: right;
    font-size: 12px; /* f */
    width: 50px; /* w */
    height: 18px; /* h */
    margin-top: -18px; /* -h */
}
</style>
<div class="ellipsis">
    <div class="ellipsis-container">
        <div class="ellipsis-content">腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
        <div class="ellipsis-ghost">
            <div class="ellipsis-placeholder"></div>
            <div class="ellipsis-more">...更多</div>
        </div>
    </div>
</div>   
</body></html>
```

** 优点：**
1. 响应式截断，根据不同宽度做出调整。
2. 文本超出范围才显示省略号，否则不显示省略号。
3. 可以在尾部添加更多的操作

** 缺点：** 
1. 因为 -webkit-line-clamp 是一个不规范的属性，它没有出现在 CSS 规范草案中。也就是说只有 webkit 内核的浏览器才支持这个属性，像 Firefox, IE 浏览器统统都不支持这个属性，浏览器兼容性不好。
2. 省略号位置不好控制

** 使用场景：** 多用于移动端页面，因为移动设备浏览器更多是基于 webkit 内核，除了兼容性不好，实现截断的效果不错。

## 适配不同机型

不同浏览器的默认字体可能不同，建议设置这个字体，这个字体将…显示为空白正方形，font-size的值就是字符的宽

``` css
@font-face {
font-family: "more";
src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMi85nScAAACsAAAAYGNtYXAAECHwAAABDAAAAVJnbHlmHJQQ0QAAAmAAAAAcaGVhZAzV4GIAAAJ8AAAANmhoZWEHwgPCAAACtAAAACRobXR4BAAAAAAAAtgAAAAGbG9jYQAOAAAAAALgAAAABm1heHAABAAGAAAC6AAAACBuYW1lGDPoTwAAAwgAAAGGcG9zdACvAAIAAASQAAAAJgAEBAABkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAAAAAAAAAAAAAIAAAAEQAAAAAAAAAAAAAAAAAAAAAEAgJv/9A8D/wABAA8AAQAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAABMAAMAAQAAABwABAAwAAAACAAIAAIAACAm//3/////AAAgJv/9/////9/bAAMAAQABAAAAAAAAAAAAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA/8EEAAO/AAMAAAERIREEAPwAA7/8AgP+AAEAAAABAACqw1blXw889QALBAAAAAAA1QO70wAAAADUsuASAAD/wQQAA78AAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAEEAAAAAAAAAAAAAAAADgAAAAEAAAACAAQAAQAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAAcAAQAAAAAAAwAHAA4AAQAAAAAABAAHABUAAQAAAAAABQALABwAAQAAAAAABgAHACcAAQAAAAAACgAaAC4AAwABBAkAAQAOAEgAAwABBAkAAgAOAFYAAwABBAkAAwAOAGQAAwABBAkABAAOAHIAAwABBAkABQAWAIAAAwABBAkABgAOAJYAAwABBAkACgA0AKRpY29tb29uUmVndWxhcmljb21vb25pY29tb29uVmVyc2lvbiAxLjBpY29tb29uRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4AaQBjAG8AbQBvAG8AbgBSAGUAZwB1AGwAYQByAGkAYwBvAG0AbwBvAG4AaQBjAG8AbQBvAG8AbgBWAGUAcgBzAGkAbwBuACAAMQAuADAAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAACrAAA=) format("truetype");
}
```

## line-clamp有3宗罪
- text-align:justify一起用会使省略号和文字相叠
- 超出截断后会截掉部分行高
- 省略号出现在单词中间

题主自己玩的显示溢出字数，不明所以
![008](/images/css/008.gif)

# js实现

来源于 http://hai.li/2016/03/05/multiline-overflow-ellipsis.html ，借助 getClientRects 实现

``` javascript
function getRowRects(element) {
    var rects = [],
        clientRects = element.getClientRects(),
        len = clientRects.length,
        clientRect, top, rectsLen, rect, i;

    for(i=0; i<len; i++) {
        has = false;
        rectsLen = rects.length;
        clientRect = clientRects[i];
        top = clientRect.top;
        while(rectsLen--) {
            rect = rects[rectsLen];
            if (rect.top == top) {
                has = true;
                break;
            }
        }
        if(has) {
            rect.right = rect.right > clientRect.right ? rect.right : clientRect.right;
            rect.width = rect.right - rect.left;
        }
        else {
            rects.push({
                top: clientRect.top,
                right: clientRect.right,
                bottom: clientRect.bottom,
                left: clientRect.left,
                width: clientRect.width,
                height: clientRect.height
            });
        }
    }
    return rects;
}
```

在线示例：
https://codepen.io/defims/pen/jqWMJG



# 某些公司的做法

Google Plus用透明到白色的渐变遮罩，渐变遮罩在文字超出的时候才显示，但无法挤出文字，且背景只能纯色，不理想。

豌豆荚则更简单粗暴换行显示，换行显示则文字未超出时依然显示 ...xxx，更不理想！


# 出处地址

https://segmentfault.com/a/1190000008649988

https://segmentfault.com/a/1190000016879657

http://hai.li/2016/03/05/multiline-overflow-ellipsis.html