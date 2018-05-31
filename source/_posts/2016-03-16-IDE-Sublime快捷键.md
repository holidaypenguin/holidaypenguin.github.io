---
title: IDE-Sublime 快捷键
description: <!-- more -->
translate_title: ide-sublime-shortcut-key
date: 2016-03-16 19:21:37
updated: 2016-03-16 19:21:37
tags:
    - IDE
    - Sublime
categories:
    - 工具
---

官网：http://www.sublimetext.com/

|-|-|-|
|---|---|---|
|快速创建文本编辑区| Ctrl + N ||

|-|-|-|
|---|---|---|
|查找文件| Ctrl + P| 输入文件名、文件路径、支持模糊匹配|
|跳转到行| Ctrl + P，：| 输入: + 文件中行号|
|查找方法  JS、CSS| Ctrl + P，@xx| 输入@ + 方法名/CSS选择器 方向键上下选择|
|综合查找| Ctrl + P，xx@xx| 输入文件名/路径 + @ + 方法名/CSS选择器 方向键上下选择|
|查找HTML标签| Ctrl + P，#xx| |


|-|-|-|
|---|---|---|
|多行光标| Ctrl + D| 选择文字，之后没按一次 Ctrl + D可选择一个相同的内容并在其后面出现一个光标，可完成共同编辑。|
| |Ctrl + K/Ctrl + D| 取消多行游标的选择，继续Ctrl + D可继续选择
| |Alt + F3| 选中全部
| |Ctrl + Shift + L| 在选中区域最右边添加光标当选中区域是多行时，在每行结尾设置光标
| |Shift + 鼠标右键拖动| 在鼠标右键拖动的时候设置光标


|-|-|-|
|---|---|---|
|命令模式 Ctrl + Shift + P| 启动命令面板（以下只输入命名）支持模糊匹配|
|选择语法格式 set syntax|  CSS、Javascript等，|
  



---------------------------------------------------------------------------------------------------------------------
1. 主题安装
https://packagecontrol.io/
labels > theme > 找需要查看的主题 Spacegray

2. snippets以模板的方式编程
Ctrl + Shift + P > snippet:function

3. 设置大小写转换按键
Preferences > Key Bindings
    { "keys": ["ctrl+shift+x"], "command": "upper_case" },
    { "keys": ["ctrl+shift+c"], "command": "lower_case" },

4. 设置tab空格数量
  // The number of spaces a tab is considered equal to
  "tab_size": 2,
  // Set to true to insert spaces when tab is pressed
  "translate_tabs_to_spaces": true,





