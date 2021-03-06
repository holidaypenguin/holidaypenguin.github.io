---
title: host 文件修改与刷新
description: <!-- more -->
translate_title: modification-and-refresh-of-host-file
date: 2018-12-17 14:20:07
updated: 2018-12-17 14:20:07
tags:
  - Host
categories:
  - Host
---

# window环境：

hosts文件位置：C:\windows\system32\drivers\etc\hosts

刷新方式：

ctrl+r，输入CMD，回车

在命令行执行:ipconfig /flushdns     #清除DNS缓存内容。
ps:ipconfig /displaydns    //显示DNS缓存内容

在window下修改需要管理员权限才可以修改

 

# linux环境

文件位置：/etc/hosts

刷新命令：systemctl restart nscd

--------------------- 
作者：jiahao1186 
来源：CSDN 
原文：https://blog.csdn.net/jiahao1186/article/details/83011458 
版权声明：本文为博主原创文章，转载请附上博文链接！


# Mac 修改权限

1. Mac OSX 系统hosts文件的路径。

在Finder中同时按“Shift”“Command”“G”三个键，输入“/etc/hosts”。

2. 更改权限。

右击hosts文件，选择“显示简介”，在“共享与权限”中勾选“读与写权限”。

3. 打开hosts文件。

获取读写权限的hosts已经可以保存修改了。


------------------------------------

> 未获取读写权限的hosts文件无法保存任何修改


# 使用注意事项：
1. 运行时要以管理员方式运行，不然会提示无修改权限。

2. 如果使用了代理，修改 Hosts 也不会生效。因为浏览器会优先考虑代理工具的代理，建议调试的时候先关闭代理。

3. 修改了hosts不生效，一般需要重启浏览器，如果是google浏览器可以不用重启，可以借助chrome://net-internals/#dns  chrome://net-internals/#sockets  清掉keep-alive 和清浏览器 DNS 缓存。


# <font style="color: red; font-size: 30px;">划重点了</font>

在使用完host之后一定要关闭，否则后果自负，切记切记!!!

 

 # 浏览器Host缓存

 和前端相关的前端工程师，后端工程师，产品，测试都有被浏览器的Host缓存折磨疯的经历吧，不停的刷新页面，重启浏览器，开无痕模式，是不是都被我戳中了。这里先提供一些小技巧，然后再推荐一个 Chrome插件，来完美的解决浏览器 Host缓存问题。

小技巧一

按照下图操作即可在控制台查看IP。

小技巧二

又一个简单的查看IP的方法：

![001](/images/host/001.JPEG)

小技巧三

这个很装逼，也很强大。分两步不仅可以查看IP还可以清理缓存。Chrome 访问地址：chrome://net-internals/#dns，点击图片上的 clear Host cache 按钮即可清空Host缓存。但是不要着急，还有第二步，只点击这个还是会有问题。
![002](/images/host/002.JPEG)

第二步：点击图片左侧篮框的链接，然后点击右侧上方的Flush socket pools按钮。
![003](/images/host/003.JPEG)

为什么需要两步呢，应该是第一步是清理Host缓存，第二步是清理掉使用之前缓存创建的 socket 链接，然后再刷新页面就会利用新的 Host 来创建 socket 达到了我们的目的。

小技巧四

为了使页面更快的呈现给用户，也有很多服务器端的，成本的考量，静态资源会缓存在浏览器本地，就是说有一些前端资源压根不向后端发送请求，对于这类资源有一个特征，如下图：
![004](/images/host/004.JPEG)

对于这种切Host也没用，但是还是有简单的办法的。打开开发者工具后，然后在刷新按钮上右键就会出现三个选项，这个时候选择第二个或者第三个都可以清理掉这些静态资源的缓存。
![005](/images/host/005.JPEG)

小技巧五

本人之前一直使用小技巧三来提升效率并且装逼，但是每次都要打开地址，然后还得切换个页面再点一次还是很麻烦。所以在再推荐一个 Chrome 插件。
![006](/images/host/006.JPEG)

重要 重要 重要！安装插件后需要对浏览器做一个配置才可以正常使用，访问网址：chrome://flags/#extensions-on-chrome-urls 然后点击启用，具体如下图：
![007](/images/host/007.JPEG)

点击右上角的插件Logo即可完成技巧三的操作，清理Host缓存：
![008](/images/host/008.JPEG)

如下图右键即可显示当前页面的IP：

![009](/images/host/009.JPEG)