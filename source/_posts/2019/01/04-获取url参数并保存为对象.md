---
title: 获取url参数并保存为对象
description: <!-- more -->
translate_title: get-url-parameters-and-save-them-as-objects
date: 2019-01-04 23:16:31
updated: 2019-01-04 23:16:31
tags:
  - url
categories:
  - JavaScript
---

```javascript
/**
 * 循环匹配一个?或者&
 * 接着至少匹配一个非?或者非&
 * 接着一个等号
 * 接着至少匹配一个非?或者非&
 *
 * 循环匹配后将key和value保存到一个对象中并返回，也可以保存在Map中
 */
function getQueryString(url){
    let params = {};
    url.replace(/[\?\&]([^\?\&]+)=([^\?\&]+)/g, function($0, $1, $2, $3){
        console.log($0, $1, $2)
        params[$1] = $2;
    });
    
    return params;
}

// run
getQueryString("http://www.rongyi.com?a=1&b=2&c");
```

out
``` json
{a: "1", b: "2"}
```

