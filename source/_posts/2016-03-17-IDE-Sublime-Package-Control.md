---
title: IDE-Sublime Package Control
description: <!-- more -->
translate_title: ide-sublime-package-control
date: 2016-03-17 14:38:19
updated: 2016-03-17 14:38:19
tags:
    - IDE
    - Sublime
categories:
    - 工具
---


查看可使用的插件：https://packagecontrol.io/
Ctrl + Shift + P、pcip、



## 代码快速生成器
emmet、emmet css snippets

|-|-|-|
|---|---|---|
|快速生成简单页面| !，Ctrl + E| 该方法是emmet快捷键，分两步完成|
| ![03](/images/sublime/03.png) | ul>.item$*10| >：子元素选择符<br>.item：子元素是item开头<br>$：代表序号<br>*10：输入10个带有class="item123....10"|
| | 扩展，很酷| div#s.d>div#e.s>span.em*5>span.im$*5|

http://emmet.io/
https://github.com/sergeche/emmet-sublime
https://github.com/sergeche/emmet-sublime#tab-key-handler


## javascript 快速提示
    javascript snippet/Completions


## jquery快速提示
    jquery


## 快速生成回掉函数
    `insert callback`  
https://packagecontrol.io/packages/Insert%20Callback
  Press `Alt+C`. If the function call's trailing semicolon is missing, it will be filled in. A callback function snippet will then be inserted.
```
someAsyncFn(function(err, d) {

});
```


## 快速创建文件
    advancedNewFile 
https://packagecontrol.io/packages/AdvancedNewFile
https://github.com/skuroda/Sublime-AdvancedNewFile
ctrl+alt+n: General keymap to create new files.
ctrl+shift+alt+n: In addition to creating the folders specified, new folders will also contain an __init__.py file.


## 测试请求
    Http Requester
https://packagecontrol.io/packages/Http%20Requester
Alt + Ctrl + R 快速访问选中文字的链接
get 请求和 post请求方式不同
POST http://posttestserver.com/post.php
Content-type: application/x-www-form-urlencoded
POST_BODY:
variable1=avalue&variable2=1234&variable3=anothervalue
GET http://www.google.com/search?q=test


## 每次编码需要公共组件，因此可以从一个公共配置中下载
    Nettuts+ Fetch
https://packagecontrol.io/packages/Nettuts%2B%20Fetch
Ctrl + Shift + P
fetch: file 下载选择文件内容
fetch: manage 管理配置文件类库
fetch: package


## 添加sidebar右键功能
    Side​Bar​Enhancements
https://packagecontrol.io/packages/SideBarEnhancements


## 生成文件头部注释
FileHeader
https://packagecontrol.io/packages/FileHeader


## 添加注释代码
    Doc​Blockr
https://packagecontrol.io/packages/DocBlockr


## 语法校验
    Sublime​Linter
https://packagecontrol.io/packages/SublimeLinter

    SublimeLinter-jshint
https://packagecontrol.io/packages/SublimeLinter-jshint

npm i -g jshint

    SublimeLinter-csslint
https://packagecontrol.io/packages/SublimeLinter-csslint

npm i -g csslint

可校验js代码编写过程中不规范的地方，因为有缓存不会实时显示
在项目根目录下创建.jshintrc文件，文件以json格式保存，可以有哪些设置，在下面这个网站
http://jshint.com/docs/options/
http://sublimelinter.readthedocs.org/en/latest/about.html
例如：
    {
        "eqeqeq": true, // true: Require triple equals (===) for comparison
    }
使用同一个配置，配置如下
文件：SublimeLinter.sublime-settings
```
{
    "user": {
        "debug": false,
        "delay": 0.25,
        "error_color": "D02000",
        "gutter_theme": "Packages/SublimeLinter/gutter-themes/Default/Default.gutter-theme",
        "gutter_theme_excludes": [],
        "lint_mode": "background",
        "linters": {

            "jshint": {
                "@disable": false,
                "args": [
                    "--config",
                    "D:\\.jshintrc"
                ],
                "excludes": []
            },
```


## 切换语言
    ChineseLocalization
切换语言，帮助(H)/Language/简体中文，繁体中文，日本语，English。


## HTML+CSS+JAVASCRIPT+JSON快速格式化
    HTML-CSS-JS Prettify
https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify
 
Tools -> Command Palette (Cmd+Shift+P or Ctrl+Shift+P) and type htmlprettify.
– or –
Ctrl+Shift+H (or Cmd+Shift+H if you're on a Mac).
– or –
Right click in the current buffer and select HTML/CSS/JS Prettify -> Prettify Code.
安装完运行需要从新设置node路径


## CSS2REM
### 安装
- 下载本项目，比如：git clone https://github.com/flashlizi/cssrem
- 进入packages目录：Sublime Text -> Preferences -> Browse Packages...
- 复制下载的cssrem目录到刚才的packges目录里。
- 重启Sublime Text。

### 配置参数
参数配置文件：Sublime Text -> Preferences -> Package Settings -> cssrem
- px_to_rem - px转rem的单位比例，默认为40。
- max_rem_fraction_length - px转rem的小数部分的最大长度。默认为6。
- available_file_types - 启用此插件的文件类型。默认为：[".css", ".less", ".sass"]

## 打开CMD
    Terminal
打开文件的终端，终端默认是CMD。
ctrl+shift+t 打开文件所在文件夹，ctrl+shift+alt+t 打开文件所在项目的根目录文件夹，
可以自己重新配置快捷键。也可以右键open terminal here打开。



## Less

Less语法高亮：
    pci > less > 重启 > less语法高亮


Less2Css
https://packagecontrol.io/packages/Less2Css
npm install less -gd
npm install -g less-plugin-clean-css
npm install -g less-plugin-autoprefix




