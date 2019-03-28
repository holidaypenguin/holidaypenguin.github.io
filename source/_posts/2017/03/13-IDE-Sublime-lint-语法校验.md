---
title: IDE-Sublime lint 语法校验
description: <!-- more -->
translate_title: ide-sublime-lint-syntax-check
tags:
  - IDE
  - Sublime
  - 工具
categories:
  - IDE
date: 2017-03-13 17:28:18
updated: 2017-03-13 17:28:18
---



#### package control install package

    SublimeLinter
https://packagecontrol.io/packages/SublimeLinter


    SublimeLinter-jshint
https://packagecontrol.io/packages/SublimeLinter-jshint



    SublimeLinter-csslint
https://packagecontrol.io/packages/SublimeLinter-csslint



#### node install

npm i -g jshint

npm i -g csslint


#### 配置

> 可校验js代码编写过程中不规范的地方，因为有缓存不会实时显示
> 在项目根目录下创建`.jshintrc`文件，文件以json格式保存，可以有哪些设置，在下面这个网站

> http://jshint.com/docs/options/ 

> http://sublimelinter.readthedocs.org/en/latest/about.html 

例如：

    {
        "eqeqeq": true, // true: Require triple equals (===) for comparison
    }

> 使用同一个配置，配置如下。该方法优先于项目下的配置文件

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
                        "D:\\config\\.jshintrc"
                    ],
                    "excludes": []
                },
```

##### 他人详细教程

https://gaohaoyang.github.io/2015/03/26/sublimeLinter