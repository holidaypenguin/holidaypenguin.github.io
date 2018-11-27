---
title: IDE-Sublime 添加鼠标右键打开
description: sublime text3添加鼠标右键打开文件文件夹的操作<!-- more -->
translate_title: ide-sublime-add-mouse-right-click-open
tags:
  - IDE
  - Sublime
categories:
  - 工具
date: 2017-03-03 13:55:45
updated: 2017-03-03 13:55:45
---

原文：（http://www.cnblogs.com/1314-/p/6479590.html）



# 方法一（推荐）
把以下代码，复制到SublimeText3的安装目录，然后重命名为：sublime_addright.inf，然后右击安装就可以了。
PS：重命名文件之前，需要先在工具--文件夹选项，查看中，把隐藏已知文件类型的扩展名前边的复选框不勾选。
```
[Version]
Signature="$Windows NT$"
[DefaultInstall]
AddReg=SublimeText3
[SublimeText3]
hkcr,"\shell\SublimeText3",,,"用 SublimeText3 打开"
hkcr,"\shell\SublimeText3\command",,,"""%1%\sublime_text.exe"" ""%%1"" %%"
hkcr,"Directory\shell\SublimeText3",,,"用 SublimeText3 打开"
hkcr,"\shell\SublimeText3","Icon",0x20000,"%1%\sublime_text.exe, 0"
hkcr,"Directory\shell\SublimeText3\command",,,"""%1%\sublime_text.exe"" ""%%1"""
```


# 方法二
把以下代码，复制到SublimeText3的安装目录，然后重命名为：sublime_addright.reg，然后双击就可以了。
**PS:需要把里边的Sublime的安装目录，替换成实际的Sublime安装目录。**

```
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT*\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="D:\Program Files\Sublime Text 3\sublime_text.exe,0"
[HKEY_CLASSES_ROOT*\shell\SublimeText3\command]
@="D:\Program Files\Sublime Text 3\sublime_text.exe %1"
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="D:\Program Files\Sublime Text 3\sublime_text.exe,0"
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3\command]
@="D:\Program Files\Sublime Text 3\sublime_text.exe %1"
```

如果以上方法不可行，则手动设置（测试通过，win10）
项目路径：
```
[HKEY_CLASSES_ROOT*\shell\SublimeText3]
    默认字符串值：用 SublimeText3 打开
    Icon字符串值：D:\Program Files\Sublime Text 3\sublime_text.exe,0
    [HKEY_CLASSES_ROOT*\shell\SublimeText3\command]
    默认字符串值：D:\Program Files\Sublime Text 3\sublime_text.exe %1
```
如图一
![01](/images/sublime/01.png)

项目路径：
```
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3]
    默认字符串值：用 SublimeText3 打开
    Icon字符串值：D:\Program Files\Sublime Text 3\sublime_text.exe,0
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3\command]
    默认字符串值：D:\Program Files\Sublime Text 3\sublime_text.exe %1
```
如图2
![02](/images/sublime/02.png)

