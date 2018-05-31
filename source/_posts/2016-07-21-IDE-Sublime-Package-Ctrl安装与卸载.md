---
title: IDE-Sublime Package Ctrl安装与卸载
description: <!-- more -->
translate_title: ide-sublime-package-ctrl-installation-and-uninstall
date: 2016-07-21 23:46:07
updated: 2016-07-21 23:46:07
tags:
    - IDE
    - Sublime
categories:
    - 工具
---


http://www.sublimetext.com/3

# 卸载
- 打开sublime，选择Preferences > Browse Packages
- 返回到文件夹上一级，进入Installed Packages
- 删除 Package Control.sublime-package
- 重新安装package control


https://packagecontrol.io/installation
# 安装
The simplest method of installation is through the Sublime Text console. The console is accessed via the `ctrl+`` shortcut or the `View > Show Console` menu. Once open, paste the appropriate Python code for your version of Sublime Text into the console.

SUBLIME TEXT 3
```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```