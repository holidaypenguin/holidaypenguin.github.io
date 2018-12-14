---
title: Fiddler断点
description: 便于修改Request与Response<!-- more -->
translate_title: fiddler-breakpoint
date: 2017-05-24 15:21:46
updated: 2017-05-24 15:21:46
tags:
    - Fiddler
    - 工具
categories:
    - Fiddler
---


# Fiddler中设置断点修改Request
第一种：打开`Fiddler` 点击`Rules-> Automatic Breakpoint ->Before Requests`(这种方法会中断所有的会话)
如何消除命令呢？ 点击`Rules-> Automatic Breakpoint ->Disabled`

第二种: 在命令行中输入命令: `bpu www.baidu.com` (这种方法只会中断www.baidu.com)
如何消除命令呢？ 在命令行中输入命令 `bpu`

`Fiddler` 能中断这次会话，选择被中断的会话，点击`Inspectors tab`下的`WebForms tab` 修改用户名密码，然后点击`Run to Completion` 如下图所示。

![01](/images/fiddler/01.png)


# Fiddler中设置断点修改Response
第一种：打开`Fiddler` 点击`Rules-> Automatic Breakpoint ->After Response` (这种方法会中断所有的会话)
如何消除命令呢？ 点击`Rules-> Automatic Breakpoint ->Disabled`

第二种: 在命令行中输入命令: `bpuafter www.baidu.com` (这种方法只会中断www.baidu.com)
如何消除命令呢？ 在命令行中输入命令 `bpuafter`,
