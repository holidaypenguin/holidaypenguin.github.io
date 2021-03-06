---
title: 浅谈CSRF
description: <!-- more -->
translate_title: on-csrf
categories:
  - HTTP
date: 2019-04-08 18:57:32
updated: 2019-04-08 18:57:32
tags:
---
## 什么是CSRF
CSRF（Cross-site request forgery），中文名称：跨站请求伪造。攻击者盗用了你的身份，以你的名义发送恶意请求。

## CSRF的原理

下图简单阐述了CSRF攻击的思想：
![0001](/images/http/0001.jpg)

从上图可以看出，要完成一次CSRF攻击，受害者必须依次完成两个步骤：
1. 登录受信任网站A，并在本地生成Cookie。
2. 在不登出A的情况下，访问危险网站B。

上面大概地讲了一下CSRF攻击的思想，下面我将用几个例子详细说说具体的CSRF攻击，这里我以一个银行转账的操作作为例子（仅仅是例子，真实的银行网站没这么傻:>）

**示例1：**

银行网站A，它以GET请求来完成银行转账的操作，如：http://www.mybank.com/Transfer.php?toBankId=11&money=1000

危险网站B，它里面有一段HTML的代码如下：
``` html
<img src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>
```
首先，你登录了银行网站A，然后访问危险网站B，噢，这时你会发现你的银行账户少了1000块......

为什么会这样呢？原因是银行网站A违反了HTTP规范，使用GET请求更新资源。在访问危险网站B的之前，你已经登录了银行网站A，而B中的`<img\>`以GET的方式请求第三方资源（这里的第三方就是指银行网站了，原本这是一个合法的请求，但这里被不法分子利用了），所以你的浏览器会带上你的银行网站A的Cookie发出Get请求，去获取资源 `http://www.mybank.com/Transfer.php?toBankId=11&money=1000`，结果银行网站服务器收到请求后，认为这是一个更新资源操作（转账操作），所以就立刻进行转账操作......

**示例2：**

为了杜绝上面的问题，银行决定改用POST请求完成转账操作。
银行网站A的WEB表单如下：
``` html
<form action="Transfer.php" method="POST">
  <p>ToBankId: <input type="text" name="toBankId" /></p>
  <p>Money: <input type="text" name="money" /></p>
  <p><input type="submit" value="Transfer" /></p>
</form>
```
后台处理页面Transfer.php如下：

``` php
<?php
  session_start();
  if (isset($_REQUEST['toBankId'] &&　isset($_REQUEST['money']))
  {
    buy_stocks($_REQUEST['toBankId'],　$_REQUEST['money']);
  }
?>
```
危险网站B，仍然只是包含那句HTML代码：
``` html
<img src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>
```
和示例1中的操作一样，你首先登录了银行网站A，然后访问危险网站B，结果.....和示例1一样，你再次没了1000块～T_T，这次事故的原因是：银行后台使用了$_REQUEST去获取请求的数据，而$_REQUEST既可以获取GET请求的数据，也可以获取POST请求的数据，这就造成了在后台处理程序无法区分这到底是GET请求的数据还是POST请求的数据。在PHP中，可以使用$_GET和$_POST分别获取GET请求和POST请求的数据。在JAVA中，用于获取请求数据request一样存在不能区分GET请求数据和POST数据的问题。

**示例3：**

经过前面2个惨痛的教训，银行决定把获取请求数据的方法也改了，改用$_POST，只获取POST请求的数据，后台处理页面Transfer.php代码如下：

``` php
<?php
  session_start();
  if (isset($_POST['toBankId'] &&　isset($_POST['money']))
  {
    buy_stocks($_POST['toBankId'],　$_POST['money']);
  }
?>
```
然而，危险网站B与时俱进，它改了一下代码：

``` html
<html>
  <head>
    <script type="text/javascript">
      function steal(){
        iframe = document.frames["steal"];
        iframe.document.Submit("transfer");
      }
    </script>
  </head>

  <body onload="steal()">
    <iframe name="steal" display="none">
      <form method="POST" name="transfer"　action="http://www.myBank.com/Transfer.php">
        <input type="hidden" name="toBankId" value="11">
        <input type="hidden" name="money" value="1000">
      </form>
    </iframe>
  </body>
</html>
```
如果用户仍是继续上面的操作，很不幸，结果将会是再次不见1000块......因为这里危险网站B暗地里发送了POST请求到银行!

总结一下上面3个例子，CSRF主要的攻击模式基本上是以上的3种，其中以第1,2种最为严重，因为触发条件很简单，一个`<img\>`就可以了，而第3种比较麻烦，需要使用JavaScript，所以使用的机会会比前面的少很多，但无论是哪种情况，只要触发了CSRF攻击，后果都有可能很严重。

理解上面的3种攻击模式，其实可以看出，CSRF攻击是源于WEB的隐式身份验证机制！WEB的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的！

## CSRF防御
1. 尽量使用POST，限制GET

GET接口太容易被拿来做CSRF攻击，看第一个示例就知道，只要构造一个img标签，而img标签又是不能过滤的数据。接口最好限制为POST使用，GET则无效，降低攻击风险。

当然POST并不是万无一失，攻击者只要构造一个form就可以，但需要在第三方页面做，这样就增加暴露的可能性。

2. 浏览器Cookie策略

IE6、7、8、Safari会默认拦截第三方本地Cookie（Third-party Cookie）的发送。但是Firefox2、3、Opera、Chrome、Android等不会拦截，所以通过浏览器Cookie策略来防御CSRF攻击不靠谱，只能说是降低了风险。

PS：Cookie分为两种，会话期 Cookie（在浏览器关闭后，就会失效，保存到内存里），持久性 Cookie（即只有到了Exprie时间后才会失效的Cookie，这种Cookie会保存到本地）。

PS：另外如果网站返回HTTP头包含[P3P Header](https://developer.mozilla.org/en-US/docs/Mozilla/Cookies_Preferences)，那么将允许浏览器发送第三方Cookie。

3. 加验证码

验证码，强制用户必须与应用进行交互，才能完成最终请求。在通常情况下，验证码能很好遏制CSRF攻击。但是出于用户体验考虑，网站不能给所有的操作都加上验证码。因此验证码只能作为一种辅助手段，不能作为主要解决方案。

4. Referer Check

Referer Check在Web最常见的应用就是“防止图片盗链”。同理，Referer Check也可以被用于检查请求是否来自合法的“源”（Referer值是否是指定页面，或者网站的域），如果都不是，那么就极可能是CSRF攻击。

但是因为服务器并不是什么时候都能取到Referer，所以也无法作为CSRF防御的主要手段。但是用Referer Check来监控CSRF攻击的发生，倒是一种可行的方法。

5. Anti CSRF Token

现在业界对CSRF的防御，一致的做法是使用一个Token（Anti CSRF Token）。

例子：

1. 用户访问某个表单页面。

2. 服务端生成一个Token，放在用户的Session中，或者浏览器的Cookie中。

3. 在页面表单附带上Token参数。

4. 用户提交请求后， 服务端验证表单中的Token是否与用户Session（或Cookies）中的Token一致，一致为合法请求，不是则非法请求。

这个Token的值必须是随机的，不可预测的。由于Token的存在，攻击者无法再构造一个带有合法Token的请求实施CSRF攻击。另外使用Token时应注意Token的保密性，尽量把敏感操作由GET改为POST，以form或AJAX形式提交，避免Token泄露。

注意：

CSRF的Token仅仅用于对抗CSRF攻击。当网站同时存在XSS漏洞时候，那这个方案也是空谈。所以XSS带来的问题，应该使用XSS的防御方案予以解决。

# 参考
[浅谈CSRF攻击方式](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)
[Cross-Site Request Forgery (CSRF)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29)
[站点安全](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/First_steps/Website_security)
[Web安全之CSRF攻击](https://www.cnblogs.com/lovesong/p/5233195.html)