---
title: Transfer-Encoding、Content-Length、Content-Encoding、Accept-Encoding
description: <!-- more -->
translate_title: 'transfer-encoding,-content-length,-content-encoding,-accept-encoding'
date: 2019-07-11 18:26:16
updated: 2019-07-11 18:26:16
tags:
  - Transfer-Encoding
  - Content-Length
  - Content-Encoding
  - Accept-Encoding
  - HTTP
categories:
  - HTTP
typora-root-url: ..
---

## 概述
我们在日常进行HTTP请求的时候，会遇到请求头或者响应头中有`Transfer-Encoding`、`Content-Length`、`Content-Encoding`、`Accept-Encoding`这几个，难免会不知道各自的含义及使用场景，也可能会搞混，我们今天就简单的捋一下这几个Header。

## keep-alive
在讲解上面几个头之前，我们必须先了解一下`Persistent Connection`（持久连接或者长连接），`HTTP`持久连接这个机制，很大程度上提高了`HTTP`的性能，我们看下在引入持久连接之前，`HTTP连`接是什么样子：


先进行`TCP`握手，然后进行数据传输，完成数据传输之后，释放连接。当网络内容复杂时候，会出现多次数据传输，那么就会造成多次频繁的创建`Socket`和释放，频繁的握手，就会出现延时，这个问题在引入持久连接得以解决。

通过设置设置 `Connection`头部为`keep-alive`实现持久连接：



`keepalive connections`机制可以在数据传输完成之后仍然保持`TCP`连接，以备后用，当用户需要再次获取数据时，直接使用刚刚空闲下来的连接，无需再次握手，这样就解决了延时问题，提高了`HTTP`的性能。持久连接是`HTTP1.0`后来才引进的，到了`HTTP1.1`规定所有连接都必须是持久的，在`Header`上添加了`Connection`为`close`。在现代浏览器中，一般同时开启6～8个`keepalive connections`的`socket`连接，并保持一定的链路生命，当不需要时再关闭；而在服务器中，一般是由软件根据负载情况进行配置。

## 主要内容

### Content-Length

我们通过给`HTTP`请求添加`Content-Length`头部表示请求体的实际长度，也可以由服务器端添加`Content-Length`返回给客户端，表示响应体内容的实际长度。在实际应用中，`Content-Length`有时候不好获取，比如实体来自于网络文件或者是有数据库动态产生的，就很难获取它的准确长度。这时候倒是可以开一个足够大的buffer，等内容全部生成完毕在准确计算`buffer`的总长度，然而这样会导致内存消耗太大，也会让客户端等待时间过长。


当`HTTP`请求时短连接的时候，数据传输完成会根据连接是否关闭判断请求体或者响应体的边界，所以不需要标明请求体或者响应体的实际长度，请求就可以顺利完成；而当`HTTP`为长连接的时候，很显然不可以，必须要拥有判断请求或者响应体的边界，才能完成网络请求，如果`Content-Length`的值小于实际长度，则数据将会被截断，如果`Content-Length`的值大于实际长度则会导致网络请求处于停滞状态；如果没有`Content-Length`或者其他可以判定实体边界，则网络请求还是会被停滞。

### Transfer-Encoding

使用`Transfer-Encoding`可以解决我们上面所提到的问题，`Transfer-Encoding`可以代替`Content-Length`。`Transfer-Encoding`表示传输编码，之前文当中给它定义了`gzip/compress/deflate/identity/chunked`等几种不区分大小写的多种取值，在最新的文档中传输编码之定义了一种编码值：`chunked`（分块编码）。当我们给请求或者响应的头部添加了`Transfer-Encoding:chunked`的时候，表示实体在传输的过程中采用的是分块编码的方式，实体被改为一系列的分块，每一个部分分块上面都有数据内容和长度，当分块内容为空长度为0时，意味着实体的边界，数据传输结束。所以，在HTTP网络请求中，如果无法确定实体的`Content-Length`的大小或者没有添加`Content-Length`作为头部信息的一部分，会导致网络请求发生问题，此时添加头`Transfer-Encoding:chunked`（分块编码）可以解决长度问题。

### Accept-Encoding和Content-Encoding
`Accept-Encoding`添加在请求头中，向服务器端表明客户端支持的编码格式，`Content-Encoding`存在于响应头中，由服务器端返回，表示响应体内容的编码格式，常见的编码格式有`gzip/compress/deflate/identity`。可以结合`Transfer-Encoding`使用。

## 举例说明
再一次`HTTP`长连接中，无法判断请求体的长度和响应体的长度，我们就会做如下的流程：

客户端将请求内容加入到请求体中，添加请求头`Transfer-Encoding:chunked`表明分块编码，同时添加`Accept-Encoding:gzip`表明客户端支持`gzip`的编码格式；

服务器端接收到客户端的网络请求，根据客户端传来的`Transfer-Encoding:chunked`可知请求体位分块编码，紧接着开始接收请求体数据，当接收到的分块的内容为空长度为0时，说明到了请求体的边界，服务器端完成了数据接收。

经过一系列的操作，服务器端完了业务处理，给客户端返回数据，由于要返回的数据长度无法获取到，所以服务器端在返回数据中添加了头`Transfer-Encoding:chunked`表明分块编码，然后将每一块数据内容采用gzip进行编码，同时添加`Content-Encoding:gzip`表明服务器对返回的数据采用了`gzip`编码。

客户端收到服务器端的响应，因为响应头包含了`Transfer-Encoding:chunked`，所以一直到响应数据的分块长度为0内容为空，才算是数据传输完成，此时客户端会解析服务端发来的`Content-Encoding:gzip`，并且采用`gzip`方法解码数据，完成一次数据请求。



# 参考

<https://blog.csdn.net/qq_29405933/article/details/84247999>