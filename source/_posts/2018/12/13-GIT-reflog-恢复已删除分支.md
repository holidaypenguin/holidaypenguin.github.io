---
title: GIT reflog 恢复已删除分支
description: <!-- more -->
translate_title: git-reflog-restores-deleted-branches
date: 2018-12-13 15:27:42
updated: 2018-12-13 15:27:42
tags:
  - Git
  - 恢复删除分支
  - 删除分支
categories:
  - Git
---


语法： git reflog --date=[iso | local | relative] | grep [-w 全词匹配] <branchname>

iso:格式化后的时间时间

local:实际时间

relative：相对时间， 多少天之前

本案例以恢复remove_branch为例 

1. 对remove_branch分支操作。 合并develop分支到remove_branch， 在remove_branch分支做了两次commit， 离开remove_branch分支最终删除该分支。 其活动历时 如图：

![10](/images/git/10.png)

2. git reflog 会记录所有的HEAD变动记录， 如commit， 分支切换信息。

通过查询最后一次进入分支remove_branch，最后一次离开remove_branch分支这段时间内head的变化来恢复分支。

![11](/images/git/11.png)

由图可知remove_branch分支最后一次进入，离开的时间段为2018-07-20 10:06:39 到2018-07-20 10:09:14

搜索这个时间段内的所有记录， 找到最近一次commit的记录 复制第一列的commit id

![12](/images/git/12.png)

3. 还原删除分支 

从最近一次commit 中检出分支，可重命名，本例chon重命名为：reback_remove_branch

git checkout -b reback_remove_branch ddd94a4

--------------------- 
作者：changerzhuo 
来源：CSDN 
原文：https://blog.csdn.net/changerzhuo_319/article/details/81133533 
版权声明：本文为博主原创文章，转载请附上博文链接！