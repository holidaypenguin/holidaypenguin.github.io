---
title: Fiddler抓包https
description: <!-- more -->
translate_title: fiddler-packet-https
date: 2017-08-24 10:47:13
updated: 2017-08-24 10:47:13
tags:
    - Fiddler
    - 工具
categories:
    - 工具
---



[原文1](http://blog.csdn.net/wangjun5159/article/details/52198842)
[原文2](http://blog.csdn.net/wangjun5159/article/details/54142016)

# 原理
## fiddler抓包原理
`fiddler` 调试器注册到操作系统因特网服务中，系统所有的网络请求都会走`fiddler`的代理，所以`fiddler`才能抓包。

Debug traffic from any client and browser 
Fiddler helps you debug traffic from any browser: Internet Explorer, Chrome, Firefox, Safari, Opera, and more. Once you start Fiddler, the web debugger registers itself as the system proxy for Microsoft Windows Internet Services (WinINet), the HTTP layer used by Internet Explorer, Microsoft Office, and many other products. As the system proxy, all HTTP requests from WinINet flow through Fiddler before reaching the target web servers. Similarly, all HTTP responses flow through Fiddler before being returned to the client application. 
Additionally, most devices that support Wi-Fi or Ethernet can be configured to send their traffic to Fiddler; this includes iOS, Android, Windows Phone and Windows RT devices.

## fiddler解密https原理
其实`fiddler`就是中间人攻击，依次经过如下过程
- `fiddler`接到客户端的`https`请求，`fiddler`将请求转发给服务器
- 服务器生成公钥证书，返回给`fiddler`；`fiddler`拦截下真的公钥证书，并生成伪造的公钥证书给客户端；
- 客户端使用伪造的公钥证书加密共享密钥发送给`fiddler`，`fiddler`使用伪造的私钥解密获取共享密钥
- `fiddler`将解密后的共享密钥，使用真正的公钥加密发送给服务器端，服务器使用共享密钥与`fiddler`通信
- `fiddler`使用共享密钥与客户端通信
以上是`fiddler`抓包解密的原理，这个原理是建立在`https`建立连接的基础上的，请参考[https建立连接过程](http://blog.csdn.net/wangjun5159/article/details/51510594)

# 开始抓包

## 设置fiddler抓包
File—–>capture traffic

## 设置抓https和解密https
Tools—–>fiddler options—–>https—–>capture https traffic—->decrypt https traffic—>Ignore server certificate errors—->Actions—–>Trust root certificate—->之后都是确定

![10](/images/fiddler/10.png)
![11](/images/fiddler/11.png)

安装根证书后，可以点击Actions—–>open windows certificate manager查看安装到系统的根证书 

![12](/images/fiddler/12.png)

根证书的作用：fiddler对每个域名都会生成公钥证书，浏览器会用根证书验证公钥证书的合法性，所以，根证书是https 抓包必不可少的部分
效果
我们那支付宝登陆界面做测试，支付宝登陆页面 

![13](/images/fiddler/13.png)

# 常见问题
## http tunnel、http connect
有一种情况，**host都是tunnel to， url 后边都带着443，这是什么意思呢？ **
查看，请求头会发现使用了`Connect`方法，`Connect`方法通常会建议代理`(fiddler)`与目标服务器建立`http tunnel`；尽管`Connect`也可以用于`http`，但是一般是用于`SSL`通信；

`CONNECT www.google.com:443` 


这句话表示，代理与服务器的`443`端口建立了`http tunnel`，在此之后，所有由客户端发送的内容，都会经由`http` 代理，转发给`www.google.com:443`端口；更多http tunnel&http connect资料可以参考[http tunnel&connect](http://blog.csdn.net/wangjun5159/article/details/54142016)


## 解密失败
有的时候，发现解密失败，这是可以查看`connect`的`log`。如图

![14](/images/fiddler/14.png)

通过查看响应，我们看到，是由于没有设置解密导致的，
This is a CONNECT tunnel, through which encrypted HTTPS traffic flows. 
Fiddler’s HTTPS Decryption feature is enabled, but this specific tunnel was configured not to be decrypted. Settings can be found inside Tools > Fiddler Options > HTTPS. 
A SSLv3-compatible ServerHello handshake was found. Fiddler extracted the parameters below.
`Tools > Fiddler Options > HTTPS`，选中解密`https`，选择正确的来源，解密成功。 

![15](/images/fiddler/15.png)

当然，如果不想显示`Connect`，你也可以设置`rules----->hide connects` 隐藏`connect`；
如果还是解密失败，可以查看`Log`标签页，错误信息都会在这里边显示。 

![16](/images/fiddler/16.png)

## 抓不到手机微信

有网友跟我说，抓不到手机微信的数据，这是因为，微信走的http2协议，fiddler不支持http2协议，所以用wireshark抓，但http2也是加密的，所以抓到的数据看不懂。 

![17](/images/fiddler/17.png)