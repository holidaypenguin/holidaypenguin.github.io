---
title: Fiddler手机抓包
description: <!-- more -->
translate_title: fiddler-handset-grab-bag
tags:
  - Fiddler
  - 工具
categories:
  - Fiddler
date: 2017-08-24 10:30:31
updated: 2017-08-24 10:30:31
---

启动Fiddler，打开菜单栏中的 Tools > Fiddler Options，打开“Fiddler Options”对话框。

![08](/images/fiddler/08.png)

在Fiddler Options”对话框切换到“Connections”选项卡，然后勾选“Allow romote computers to connect”后面的复选框，然后点击“OK”按钮。

![09](/images/fiddler/09.png)

打开android设备的“设置”->“WLAN”，找到你要连接的网络，在上面长按，然后选择“修改网络”，弹出网络设置对话框，然后勾选“显示高级选项”

在“代理”后面的输入框选择“手动”，在“代理服务器主机名”后面的输入框输入电脑的ip地址，在“代理服务器端口”后面的输入框输入8888，然后点击“保存”按钮。