---
title: IDE Atom 安装
description: <!-- more -->
translate_title: ide-atom-installation
tags:
  - IDE
  - Atom
  - 工具
categories:
  - IDE
date: 2017-09-14 10:41:57
updated: 2017-09-14 10:41:57
---


1. 安装C/C++运行环境
需要安装 python（https://www.python.org/）或者visual studio，

2. 安装Atom
下载 https://atom.io/

3. 设置系统环境变量
管理员打开cmd
```
Windows temporary:
set ATOM_NODE_URL=http://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist

Windows permanently:
setx ATOM_NODE_URL http://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist /M

Linux
export ATOM_NODE_URL=http://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist
```

4. 开始使用
