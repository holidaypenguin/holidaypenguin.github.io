---
title: Git-代码合并Merge与Rebase的选择
description: <!-- more -->
translate_title: git-code-merge-and-rebase-selection
tags:
  - Git
  - Merge
  - Rebase
  - 代码合并
categories:
  - Git
date: 2018-05-29 23:56:58
updated: 2018-05-29 23:56:58
---

[官方讲述merge](https://git-scm.com/docs/git-merge)

[官方讲述rebase](https://git-scm.com/docs/git-rebase) 

[Git分支变基](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)

[社区翻译](https://github.com/geeeeeeeeek/git-recipes/wiki/5.1-%E4%BB%A3%E7%A0%81%E5%90%88%E5%B9%B6%EF%BC%9AMerge%E3%80%81Rebase-%E7%9A%84%E9%80%89%E6%8B%A9)


# 概述
你要知道的第一件事是，git rebase 和git merge 做的事其实是一样的。它们都被设计来将一个分支的更改并入另一个分支，只不过方式有些不同。

想象一下，你刚创建了一个专门的分支开发新功能，然后团队中另一个成员在 master 分支上添加了新的提交。这就会造成提交历史被 fork 一份，用 Git 来协作的开发者应该都很清楚。

现在，如果 master 中新的提交和你的工作是相关的。为了将新的提交并入你的分支，你有两个选择：merge 或 rebase。

# Merge
将 master 分支合并到 feature 分支最简单的办法就是用下面这些命令：
```
git checkout feature
git merge master
```
或者，你也可以把它们压缩在一行里。

```
git merge master feature
```
feature 分支中新的合并提交（merge commit）将两个分支的历史连在了一起。你会得到下面这样的分支结构：


Merge 好在它是一个安全的操作。现有的分支不会被更改，避免了 rebase 潜在的缺点（后面会说）。

另一方面，这同样意味着每次合并上游更改时 feature 分支都会引入一个外来的合并提交。如果 master 非常活跃的话，这或多或少会污染你的分支历史。虽然高级的 git log 选项可以减轻这个问题，但对于开发者来说，还是会增加理解项目历史的难度。

merge 前
![20](/images/git/20.png)

merge 后
![17](/images/git/17.png)

# Rebase
作为 merge 的替代选择，你可以像下面这样将 feature 分支并入 master 分支：
```
git checkout feature
git rebase master
```
它会把整个 feature 分支移动到 master 分支的后面，有效地把所有 master 分支上新的提交并入过来。但是，rebase 为原分支上每一个提交创建一个新的提交，重写了项目历史，并且不会带来合并提交。

rebase最大的好处是你的项目历史会非常整洁。首先，它不像 git merge 那样引入不必要的合并提交。其次，如上图所示，rebase 导致最后的项目历史呈现出完美的线性——你可以从项目终点到起点浏览而不需要任何的 fork。这让你更容易使用 git log、git bisect 和 gitk 来查看项目历史。

不过，这种简单的提交历史会带来两个后果：安全性和可跟踪性。如果你违反了 rebase 黄金法则，重写项目历史可能会给你的协作工作流带来灾难性的影响。此外，rebase 不会有合并提交中附带的信息——你看不到 feature 分支中并入了上游的哪些更改。

Rebase 前
![18](/images/git/18.png)

Rebase 后
![18](/images/git/19.png)

# Rebase 的黄金法则（有点懵懂）
当你理解 rebase 是什么的时候，最重要的就是什么时候 不能 用 rebase。git rebase 的黄金法则便是，绝不要在公共的分支上使用它。

比如说，如果你把 master 分支 rebase 到你的 feature 分支上会发生什么：

这次 rebase 将 master 分支上的所有提交都移到了 feature 分支后面。问题是它只发生在你的代码仓库中，其他所有的开发者还在原来的 master 上工作。因为 rebase 引起了新的提交，Git 会认为你的 master 分支和其他人的 master 已经分叉了。

同步两个 master 分支的唯一办法是把它们 merge 到一起，导致一个额外的合并提交和两堆包含同样更改的提交。不用说，这会让人非常困惑。

所以，在你运行 git rebase 之前，一定要问问你自己「有没有别人正在这个分支上工作？」。如果答案是肯定的，那么把你的爪子放回去，重新找到一个无害的方式（如 git revert）来提交你的更改。不然的话，你可以随心所欲地重写历史。



# 结合自己情况使用

在工作中使用git-flow工作流，开发中如果遇到代码合并使用rebase保持线性的提交历史，

git-flow部分通过sourcetree带的git-flow插件自动完成

rebase 部分通常经过如下步骤
``` bash
git fetch origin # 更新你的远程仓库引用
git pull --rebase orgin serverBranch # 衍合远程分支
#处理冲突
git add * # 添加修改后的文件
git rebase --continue # 继续衍合
```

rebase 部分体现在sourcetree上经过如下步骤
- 获取
![13](/images/git/13.png)
- 拉取（勾选用衍合代替合并）
![14](/images/git/14.png)
- 处理冲突
- 暂存所有文件
![15](/images/git/15.png)
- 再次点击拉取选择继续变基
![16](/images/git/16.png)
