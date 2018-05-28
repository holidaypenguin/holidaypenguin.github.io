---
title: hello-world
description: 该站点第一篇正式文章，为了显示其特殊性将其时间设定早一些，后续一些篇章是按照时间顺序排列的<!-- more -->
translate_title: hello-world
date: 1989-01-01 07:30:00
updated: 1989-01-01 07:30:00
tags: 
    - 杂项
categories:
    - 杂项
---


Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post "
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/deployment.html)

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |


## Front-matter
Front-matter 是文件最上方以 --- 分隔的区域，用于指定个别文件的变量，举例来说：

```
title: Hello World
date: 2013/7/13 20:46:25
---
```

以下是预先定义的参数，您可在模板中使用这些参数值并加以利用。


| 参数          | 描述           | 默认值        |
| ------------- |---------------| ------------- |
| layout      | 布局 |  |
| title      | 标题 |  |
| date      | 建立日期   | 文件建立日期 |
| updated      | 更新日期    | 文件更新日期 |
| comments      | 开启文章的评论功能  | true |
| tags      | 标签（不适用于分页）     |  |
| categories      | 分类（不适用于分页）   |  |
| permalink      | 覆盖文章网址    | &nbsp; |


### 分类和标签
只有文章支持分类和标签，您可以在 Front-matter 中设置。






## Markdown语法的简要规则


### 标题

标题是每篇文章都需要也是最常用的格式，在 Markdown 中，如果一段文字被定义为标题，只要在这段文字前加 # 号即可。会生成右侧的目录树，同时以不同的字体大小并加粗显示。

```
# 一级标题

## 二级标题

### 三级标题
```

以此类推，总共六级标题，建议在井号后加一个空格，这是最标准的 Markdown 语法。


### 列表

列表的显示只需要在文字前加上 - 或 * 即可变为无序列表，有序列表则直接在文字前加1. 2. 3. 符号要和文字之间加上一个字符的空格。


#### 无序列表
```
* 1
* 2
* 3
```
to：
* 1
* 2
* 3


#### 有序列表
```
1. 1
2. 2
3. 3
```
to：
1. 1
2. 2
3. 3


### 引用

如果你需要引用一小段别处的句子，那么就要用引用的格式。只需要在文本前加入 > 这种尖括号（大于号）即可。

```
> 这里是引用

要注意符号和文本间的空格
```
to：
> 这里是引用

要注意符号和文本间的空格


### 图片和链接

插入链接与插入图片的语法很像，区别在一个 !号

```
图片为：![]()

链接为：[]()

![BURBERRY](/images/BURBERRY.png)

[Baidu](https://www.baidu.com)

[BURBERRY][1]

[1]: https://www.baidu.com
```
to：
![BURBERRY](/images/BURBERRY.png)

[Baidu](https://www.baidu.com)

[BURBERRY][1]

[1]: https://www.baidu.com


### 粗体与斜体

用两个 * 包含一段文本就是粗体的语法，用一个 * 包含一段文本就是斜体的语法。

```
**这里是粗体**
*这里是斜体*
```
to：
**这里是粗体**
*这里是斜体*

### 表格

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

这种语法生成的表格如下：

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


### 代码框

程序员需要在文章中引用代码框，需要使用` ``把中间代码包裹起来，或者一个在代码前面加一个tab。


```

` ``
代码片段，前后各加三个
注意实际使用中没用空格，为了显示才加的空格
` ``

`代码元素，前后只有一个`

    let a;
    let b;
    //在前面加tab
```

to：

```
代码片段，前后各加三个
```

`代码元素，前后只有一个`


    let a;
    let b;
    //在前面加tab



### 分割线

```
***
```
to：
***