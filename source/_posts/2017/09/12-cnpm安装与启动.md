---
title: cnpm安装与启动
description: cnpm的安装简要过程<!-- more -->
translate_title: installation-and-startup-of-cnpm
tags:
  - cnpm
  - 杂项
  - 自定义npm
categories:
  - Npm
date: 2017-09-12 11:54:20
updated: 2017-09-12 11:54:20
---


## Node安装
安装目录：`/usr/local/node`
安装命令：`copy`
启动命令：环境变量指向此位置，无需

## Python3安装
安装目录：`/usr/local/python3`
环境变量执行此位置 `export PATH=/usr/local/python3/bin:/usr/local/node/bin:$PATH`

## Nginx安装
安装目录：`/usr/local/nginx`
安装命令：
```
./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_ssl_module --with-http_sub_module --with-http_gzip_static_module --with-http_stub_status_module  --with-http_realip_module
make
make install
```
启动命令：
```
#cp /usr/local/nginx/sbin         
#./nginx
#ps -ef | grep nginx          
#kill -9 23325
```


## Mysql安装

安装目录：
```
[root@rhel5 ~]# find / -name mysql -print
/etc/logrotate.d/mysql
/etc/rc.d/init.d/mysql
/var/lib/mysql
/var/lib/mysql/mysql
/var/lock/subsys/mysql
/usr/lib/mysql
/usr/include/mysql
/usr/share/mysql
/usr/bin/mysql
```
而 data默认放在：`/var/lib/mysql`
mysql默认安装在了：`/usr/share/mysql`中
安装命令：`rpm`安装
启动命令：`service mysql start`


## Cnpmjs.org安装

安装目录：`/root/cnpmjs.org-2.6.2`
安装命令：`copy`
启动命令：`#cp /root/cnpmjs.org-2.6.2         #node dispatch.js`


# 访问：
```
http://192.168.33.21:7001
http://192.168.33.21:7002
```

使用npm的时候也可以加上 --verbose参数来查看更详细的日志