---
title: 免费的位图字体制作工具Bitmap Font
description: <!-- more -->
translate_title: free-bitmap-font
date: 2019-03-25 16:28:24
updated: 2019-03-25 16:28:24
tags:
  - BitmapFont
categories:
  - FrontEnd
---
## 导读

今天写一个车牌的样式，产品要求车牌字体宽度一致，想到的方法有单独设置每个字符的位置、制作等宽字体包、使用`font-family: Consolas, Monaco, monospace;`字体等；诸如什么设置字体两端对齐都是浮云，连续的英文根本不听话。

字体包没人给做，使用默认字体又不美观，最后的结果就是左对齐！！！

看到有提到自己制作字体的工具，这里只是简单做了尝试。



## 官方下载地址

http://www.angelcode.com/products/bmfont/

下载完成后按照使用步骤来使用。



## 使用步骤

### 录入需要提取的文字

新建一个text文档，然后输入你想要生成的字，比如，输入1234567890这几个数字，你就能生成这几个数字的Font字体，但是，记住，只有输入的字才能被生成对应的字体，比如你上面只是输入这几个数字，最后生成Font字体后你要是想打出汉子或者字母那么结果肯定就是打不出来的。 


最后保存的时候切记一定要是：UTF-8格式的，不然最后编码可能会出错。

### 设置字体

打开软件，选择Opotion->FontSetting，来设定需要导出的字体

![001](/images/bitmapfont/001.jpg)

点击展开得到如下界面，然后我来解释下这几个参数，
- Font也就是你要选的字体样式如微软雅黑呀什么的，
- Size:字体的大小，
- Match char height: 匹配字符的高度，
- Bold：字体加粗Ltalic:斜体，
- Font smoothing:让字体平滑，
- Level：就是字体的水平距离一般设置像上面的一样都能满足平时的要求。（这里的设置就是我们以后会用到的字的属性）。


![002](/images/bitmapfont/002.png)

如果是自定义字体包，可以通过`Add font file`加入字体，在`Font`中查找新加入的字体。

### 清空字符
选择菜单 Edit->Clear all chars in font 清空下字符

### 导入字符
选择菜单 Edit->Selecting text from file... 选择刚刚新建的txt文件

![003](/images/bitmapfont/003.jpg)

### 设定导出的样式
Option->ExportOptions来设定导出的样式等

![004](/images/bitmapfont/004.jpg)

点开后设置参数。
- Padding，文字的内边框，或者理解为文字的周边留空要多大 做后期样式时这个属性很重要，需要预留空间来给描边、发光等特效使用 比如我预计我的样式要加一个2px的边框，然后加一个右下角2px的投影效果，所以我设定了padding:2px 4px 4px 2px
- Spacing : 2个字体之间的间隔是多大
- Width Heigth 这个就是我们等下导出的图片的大小。这里要注意数字越大占用的资源空间就越大，所以我们要选个合适的值（2的n次幂）。
- Bit depth 选择32，要不你的字体不会很清晰。
- Font descriptor 选择Text。
- Textures 纹理图片格式，果断png。

![005](/images/bitmapfont/005.png)

### 导出
option->Save bitmap font as...

导出成一个文理文件和一个描述文件，如果按照上面的配置，会有一个*.png和一个*.fnt

### 后期处理
用photoshop处理导出的png文件 后期处理了 视自己的情况定

# 参考

http://www.cppblog.com/tx7do/archive/2017/12/24/215442.html

https://jingyan.baidu.com/article/7f41ecec3afd09593c095c63.html

https://www.zhangxinxu.com/wordpress/2016/07/monospaced-font-css3-ch-unit/