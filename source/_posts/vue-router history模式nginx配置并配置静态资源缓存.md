---
title: vue-router history模式nginx配置并配置静态资源缓存
description: <!-- more -->
translate_title: >-
  vue-router-history-mode-nginx-configuration-and-configuration-of-static-resource-cache
tags:
  - history模式
  - nginx配置
  - 资源缓存
categories:
  - VUE
date: 2019-02-18 18:29:49
updated: 2019-02-18 18:29:49
---

## 背景
1. vue-router配置history模式后，index.html在域名根目录，需要把页面指向index.html，加载成功后vue根据路由信息加载页面。
2. 每次更新都会更新index.html内引用资源的hash值，如何保证每次更新后不使用强制刷新就能加载正确的资源文件。

## 原始配置

一个基本的前端nginx会有接口转发，静态文件地址并指向默认文件。见如下代码：

``` bash
server {
    listen       80;
    server_name  localhost;

    # 接口转发
    location ~ ^/api {
        proxy_pass http://xxx.com:3000;
    }

    # 路由和静态文件配置
    location / {
        root /xxx/dist;
        index  index.html index.htm;
    }
}
```

## history模式配置

因为history不会指向具体的html地址，需要配置无法读取静态文件的地址指向起始页。

``` bash
server {
    listen       80;
    server_name  localhost;

    # 接口转发
    location ~ ^/api {
        proxy_pass http://xxx.com:3000;
    }

    # 路由和静态文件配置
    location / {
        root /xxx/dist;
        index  index.html index.htm;
        try_files $uri $uri/ @rewrites;    
    }

    # 路由index.html配置
    location @rewrites {
         rewrite ^(.+)$ /index.html break;
    }
}
```

## history模式升级版

在实际生产活动中，每一次上线都希望发布的的内容不需要用户强制刷新即可呈现在用户的眼前。

因此根据history模式的实际情况，首先对指定了具体文件格式的静态文件设定30天的有效期；
其次路由访问的index.html设置为不缓存。

``` bash
server {
    listen       80;
    server_name  localhost;

    # 静态文件设定30天的有效期
    location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$ {
        root   /xxx/dist;
        expires 30d;
    }

    # 接口转发
    location ~ ^/api {
        proxy_pass http://xxx.com:3000;
    }

    # 路由配置页面无缓存
    location / {
        root /xxx/dist;
        index  index.html index.htm;
        expires -1;
        add_header Cache-Control no-cache;
        try_files $uri $uri/ @rewrites;    
    }
    location @rewrites {
         rewrite ^(.+)$ /index.html break;
    }
}
```

## 再次应用

上面使用的配置皆是在一个域名下面只有一套静态页面，此次解决同一个域名多套静态页面，共用一个服务端接口。

### webpack的配置
输出编译后文件到项目根目录下的output/app_static目录下。当然因为多个项目，每个项目的名称肯定不同。

在此处`webpack`的配置中`moduleName`作为当前项目的名称.
``` js
const path = require('path');
const projectRoot = process.cwd();
const webpack = require('webpack');

let moduleName = 'app';
let staticName = `${moduleName}_static`;

module.exports = {
  entry: "./public/main/app.js",

  output: {
    libraryTarget: 'var',
    path: path.resolve(projectRoot, './output/' + staticName + '/'),
    publicPath: '/' + staticName + '/',
    filename: '[name]_[hash:8].js',
    chunkFilename: '[name]_[hash:8].js'
  },

  plugins: [
    // ......
    new webpack.DefinePlugin({
      ENV: JSON.stringify('online'),
      MODULE_NAME: JSON.stringify(moduleName)
    }),
    // ......
  ],
  // ......
}
```
### vue-router的配置
``` js
var router = new VueRouter({
  mode: 'history',
  base: `/${MODULE_NAME}/`,
  routes: [
    {
      path: '',
      name: `/${MODULE_NAME}`,
      redirect: { name: 'home' },
      component: resolve => require(['business'], resolve),
      children: [
        {
          path: 'home',
          name: 'home',
          component: resolve => require(['business/home'], resolve)
        },
        // ......
      ]
    },
    { 
      path: '*', 
      redirect: { name: 'home' },
      component: Vue.extend({
        template: '<router-view transition="fade" transition-mode="out-in"></router-view>'
      }) 
    }
  ]
});
```
### nginx根目录的文件结构
nginx根目录下面存在多个项目的静态文件
```
/xxxx/dist
|-- app_static
|   |-- ......
|   `-- index.html
|
|-- music_static
|   |-- ......
|   `-- index.html
`-- ......
```
### nginx的配置

``` bash
server {
    listen       80;
    server_name  localhost;

    # 静态文件设定30天的有效期
    location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$ {
        root   /xxx/dist;
        expires 30d;
    }

    # 接口转发
    location ~ ^/api {
        proxy_pass http://xxx.com:3000;
    }

    # 路由配置页面无缓存
    location ~ ^/(app|music)/ {
        root /xxx/dist;
        index  index.html index.htm;
        expires -1;
        add_header Cache-Control no-cache;
        try_files $uri $uri/ @rewrites;    
    }
    location @rewrites {
         rewrite ^/(app|music)/ /$1_static/index.html break;
    }
}
```

### 访问地址
http://localhost/app/home
http://localhost/music/home

## 多页配置
上面说的仅仅是单页应用的nginx配置，对于多页的还会有所不同，此处略，等实践之后再来补齐。

# 参考
https://www.cnblogs.com/bigberg/p/7644192.html
https://blog.csdn.net/fay462298322/article/details/54666636/
https://segmentfault.com/a/1190000002797606
