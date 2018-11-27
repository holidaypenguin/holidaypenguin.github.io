---
title: Fiddler模拟POST或Get请求
description: <!-- more -->
translate_title: fiddler-simulates-post-or-get-requests
tags:
  - Fiddler
  - 工具
categories:
  - 工具
date: 2017-05-24 14:49:04
updated: 2017-05-24 14:49:04
---


# 打开我们Fiddler2程序，开始咯(这个刚好英文版的，可以去下载汉化包)

![02](/images/fiddler/02.png)

这个要根据图片来，图中标记需要分别介绍下
图标记1:   这个是请求状态和结果的显示区域
图标记2:   请求的方法选择，常用的就是POST请求和GET请求方式
图标记3:   请求的地址输入框
图标记4:   我们提交的数据输入框
图标记5:   这个是我们请求的数据头输入框
图标记6:   点击这个Execute按钮，就可以提交我们的模拟请求


![03](/images/fiddler/03.png)

![04](/images/fiddler/04.png)


首先使用Fiddler2模拟GET请求
1.在地址输入框里面模拟的GET请求地址(已被遮罩了，你们懂得)
2.选择请求的方法，这里我们选择GET方法
3.点击Execute按钮，就可以执行模拟请求
4.在显示区域就可以看到我们刚刚提交的请求
5.直接双击显示区域里面的请求记录，就可以看到我们的GET方法的数据



![05](/images/fiddler/05.png)
![06](/images/fiddler/06.png)


然后使用Fiddler2模拟POST请求
1.在地址输入框里面模拟的POST请求地址(已被遮罩了，你们懂得)
2.选择请求的方法，这里我们选择POST方法
3.在提交的数据输入框里面输入我们提交的POST数据
3.点击Execute按钮，就可以执行模拟请求
4.在显示区域就可以看到我们刚刚提交的请求
5.直接双击显示区域里面的请求记录，就可以看到我们的POST方法的数据


![07](/images/fiddler/07.png)