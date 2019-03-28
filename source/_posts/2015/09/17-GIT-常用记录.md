---
title: GIT 常用记录
description: <!-- more -->
translate_title: common-records-of-git
tags:
  - Git
categories:
  - Git
date: 2015-09-17 15:11:15
updated: 2018-01-12 16:11:15
---

|命令|说明|
|--|--|
|git status| 查看当前状态|
|git log| 查看当前分支日志|
|git branch -a| 查看所有分支情况(包括远程分支)|
|git branch| 查看所有分支情况|
|git branch XXXXX| 创建分支XXXXX|
|git checkout XXXXX| 选择分支XXXXX|
|git checkout -b XXXXX| 创建并选择分支XXXXX|
|git push origin myBranch:serverBranch| 推送myBranch到serverBranch|
|git push origin :serverBranch| 删除服务器分支|
|git push origin --delete serverfix| 删除服务器分支|
|git push --force| 覆盖了服务器上的提交历史(**慎用**)|
|.gitignore| 忽略提交文件的记录文件|
|git commit -a -m "注释写到这里"| -a：为缓存也可提交 -m：添加注释|
|git tag| 标签|
|git tag -a v0.1 -m "" |含附注标签|
|git tag v0.2 |轻量级标签|
|git push origin v0.1 |推送标签|
|git rebase -i HEAD~3 |合并当前分支前三个提交（未push）(**慎用**)|
|git rebase -i origin/serverBranch |将未提交至远程服务器的提交合并|
|git rebase --abort| 撤销合并|
|git rebase --continue| 添加完继续执行|
|git rebase --skip| 跳过|
|git checkout master <br> git merge client| 合并client到master|
|git checkout master <br> git rebase client| 变基client到master|
|git rebase client master| 变基client到master|
|git pull --rebase orgin serverBranch <br> 处理冲突 <br> git add * <br> git rebase --continue| 变基远程分支|
|git fetch <br> git rebase orgin/serverBranch <br> 处理冲突 <br> git add * <br> git rebase --continue| 变基远程分支|
|git fetch origin myBranch:serverBranch| 拉取远程分支（本地不存在）|
|git fetch 更新你的远程仓库引用 <br> git checkout -b myBranch origin/serverBranch| 拉取远程分支（本地不存在）|


git 在变基client到master时，如果是已经提交到远程代码仓库的代码建议不要变基，使用合并。



第一次建立github项目，初始导入

```
echo # test >> README.md LICENSE.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/holidaypenguin/test.git
git push -u origin master
```

Git global setup
``` bash
git config --global user.name "宋施澎"
git config --global user.email "songshipeng@rongyi.com"
```

Create a new repository
``` bash
mkdir pos_demo
cd pos_demo
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin git@git.internal.rongyi.com:songshipeng/pos_demo.git
git push -u origin master
```

Push an existing Git repository
``` bash
cd existing_git_repo
git remote add origin git@git.internal.rongyi.com:songshipeng/pos_demo.git
git push -u origin master
```
