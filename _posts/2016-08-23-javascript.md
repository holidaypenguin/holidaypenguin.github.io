---
layout: post
title:  "Javascript 函数节流"
date:   2016-08-23 18:30:22 +0800
categories: update
---

[点击查看原文](http://www.cnblogs.com/dolphinX/p/3403821.html)

>最近在做网页的时候有个需求，就是浏览器窗口改变的时候需要改一些页面元素大小，于是乎很自然的想到了window的resize事件,于是乎我是这么写的

```
<!DOCTYPE html>
<html>
<head>
    <title>Throttle</title>
</head>
<body>
    <script type="text/javascript">
        n=0;
        function resizehandler(){
            console.log(new Date().getTime());
            console.log(++n);
        }
        window.onresize=resizehandler;
    </script>
</body>
</html>
```

功能倒是实现了，但是我拖拽的方式改变浏览器窗口大小的时候看了下控制台
![图1](http://upload-images.jianshu.io/upload_images/2530160-36b45f1916c8e9f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

没错，简单的一个拖拽让我的resizeHandler()方法执行了52次，这完全不是我想要的效果，实际上我的resizeHandler()方法的代码很复杂，甚至会使用ajax向服务器发送请求，要是简单的一次改变窗口大小就要调用52次这还了得

### 函数节流

其实我的本意只是窗口resize后页面做一些调整就可以，而window的resize事件并不是在resize结束后才触发的，具体则么个频率我也不知道，但却是在不停的调用，直到窗口大小不再变化。其实类似的机制还有鼠标的mousemove，都是在短时间内重复触发。

在《JavaScript高级程序设计》中有专门应对此问题的函数节流

{% highlight javascript %}
function throttle(method,context){
    clearTimeout(method.tId);
    method.tId=setTimeout(function(){
        method.call(context);
    },500);

}
{% endhighlight %}

原理很简单，利用定时器，让函数执行延迟500毫秒，在500毫秒内如果有函数又被调用则删除上一次调用，这次调用500毫秒后执行，如此往复。这样我刚才的代码可以改为



    <script type="text/javascript">
        n=0;
        function resizehandler(){
            console.log(new Date().getTime());
            console.log(++n);
        }
        function throttle(method,context){
            clearTimeout(method.tId);
            method.tId=setTimeout(function(){
                method.call(context);
            },500);
        }
        window.onresize=function(){
            throttle(resizehandler,window);
        };
    </script>

拖拽一下试试，果真只执行了一次

![图2](http://upload-images.jianshu.io/upload_images/2530160-9fc72cccec37f948.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 另一种做法 

网上还有一种函数节流方案，它是这么做的


    function throttle(method,delay){
        var timer=null;
        return function(){
            var context=this, args=arguments;
            clearTimeout(timer);
            timer=setTimeout(function(){
                method.apply(context,args);
            },delay);
        }
    }


调用一下试试，一样的效果


    <script type="text/javascript">
        n=0;
        function resizehandler(){
            console.log(new Date().getTime());
            console.log(++n);
        }
        function throttle(method,delay){
            var timer=null;
            return function(){
                var context=this, args=arguments;
                clearTimeout(timer);
                timer=setTimeout(function(){
                    method.apply(context,args);
                },delay);
            }
        }
        window.onresize=throttle(resizehandler,500);//因为返回函数句柄，不用包装函数了
    </script>


![图3](http://upload-images.jianshu.io/upload_images/2530160-fad95919ca2489d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 比较 
两种方法都是利用了setTimeout，不同的是第二种方法加入的函数延迟执行时间，这个在第一种方案中很容易也具有此功能，加一个参数的事儿。

但第一种方案把tId设为函数的一个变量保存，而第二种创建了一个闭包来存储。个人觉得差距不大，很喜欢第一种，简单，高效。

#### 新需求 
有一天做了个类似的东西，就像百度首页输入自动提示一样的东西，我在text上绑定keyup事件，每次键盘弹起的时候自动提示，但是又不想提示那么频繁，于是我用了上面方法，但是悲剧了，只有停止输入等500毫秒才会提示，在输入过程中根本就没有提示。看了一下代码，可不是嘛，只要是用户会盲打，在500毫秒内按一下键盘，提示函数就会不断被延迟，这样只有停下来的时候才会提示，这就没意义了。

能不能在函数节流的基础上间隔固定时间就执行一次？

#### 小改动 
在网上搜了一下我们可以根据第二种写法（第一种为函数拓展多个变量感觉有些不好）做些改动，添加一个参数作为到固定间隔必须执行



    function throttle(method,delay,duration){
        var timer=null, begin=new Date();
        return function(){
            var context=this, args=arguments, current=new Date();;
            clearTimeout(timer);
            if(current-begin>=duration){
                 method.apply(context,args);
                 begin=current;
            }else{
                timer=setTimeout(function(){
                    method.apply(context,args);
                },delay);
            }
        }
    }



这样每次我们判断间隔了多久，要是超过设置时间则立即执行一次，以刚才例子试一试效果


    window.onresize=throttle(resizehandler,100,200);



![图4](http://upload-images.jianshu.io/upload_images/2530160-66e55fc1264a808e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

果真既没有频繁执行也没有就最后执行


# 自己的想法
> 看了半小时，中午想了想加入了一点自己的想法
> 1.  为什么不把限制参数、传递到句柄的参数分开？
> 2.  而且还有另外一种情况可供选择，在等待时间内不清空定时器，直到定时器执行完再继续执行。
 下面开始试验。

不知道上面的例子为什么要将this传递进去，根据下面的分析


    function EE(){console.log(this)}
    EE();       // 全局作用域
    new EE();   // 局部作用域

    function FF(){return function(){console.log(this)}}
    FF()();       // 全局作用域
    new FF()();   // 全局作用域

    function GG(){return {a: function(){console.log(this)}}}
    GG().a();       // 局部作用域
    new GG().a();   // 局部作用域

    var hh = {
        a: function(){console.log(this);},
        ee0: function(){EE();},
        ee: function(){new EE();},
        ff0: function(){FF()();},
        ff: function(){new FF()();},
        ff1: FF(),
        gg: function(){new GG().a()}
    };

    hh.a();        // hh的局部作用域
    hh.ee0();    // 全局作用域
    hh.ee();      // ee的局部作用域
    hh.ff0();     // 全局作用域
    hh.ff();       // 全局作用域
    hh.ff1();     // hh的局部作用域 --- 从此解开谜底
    hh.gg();     // GG的局部作用域


从上面的分析来看我想要分析的东西已经看到了，请看此处`解开谜底`。
执行FF()方法，返回一个方法给当前作用域里面的一个变量，也就是说改变了返回方法的作用域为当前作用域，因此才可以在当前作用域执行handler方法。

*也就是说我的第一个问题已经解决完毕，可用下面实现如下方式的调用*


    var throttleOne = new throttle(handler, 200, 300);
    throttleOne("id", "name")


*同时让`duration`等于`delay`就能解决我的第二个问题。真是多次一举。*


在实际开发过程中可能因为各种原因导致一些问题，比如要发生请求道服务器，所以要合理设置delay时间，防止无用请求占用服务器资源。
