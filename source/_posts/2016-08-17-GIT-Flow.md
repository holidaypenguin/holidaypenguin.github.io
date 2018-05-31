---
title: GIT-Flow
description: <!-- more -->
translate_title: git-flow
date: 2016-08-17 22:59:42
updated: 2016-12-01 22:59:42
tags: 
    - Git
    - Git Flow
categories:
    - Git
---

[git-flow 备忘清单](http://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html)

[git-flow 备忘清单源码](https://github.com/holidaypenguin/git-flow-cheatsheet)




历史分支
![01](/images/git/01.png)

功能分支
![02](/images/git/02.png)

发布分支
![03](/images/git/03.png)

维护分支
![04](/images/git/04.png)


|  |  |  获取分支方式 | 合并分支方式|
|--|--|--|--|
|Master | | 主分支 |  被release、hotfix分支合并|
|Hotfix | 线上修复分支 | 从master拉取分支 | 合并到master、develop分支 |
|Release | 上线分支 | 从develop拉取分支 | 合并到master、develop分支 |
|Develop | 开发分支 | 初始从master拉取分支 | 合并到master分支 |
|Feature | 功能分支 | 从develop拉取分支、合并分支 | 合并到develop分支 |



