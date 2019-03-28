---
title: Hexo文章目录样式调整
description: <!-- more -->
translate_title: hexo-article-catalog-style-adjustment
categories: Hexo
date: 2019-01-08 10:56:08
updated: 2019-01-08 10:56:08
tags:
---

# 修改自定义样式文件
样式文件文件位于
```
themes/hexo/source/css/_common/components/sidebar/sidebar-toc.styl
```

文章目录默认展开
```
// 文章目录默认展开
.post-toc .nav .nav-child { display: block; }
```

# 修改主题配置文件
主题配置文件位于

```
themes/hexo/_config.yml
```

每行目录超长自动换行

```
toc:
  enable: true  
  wrap: true  
```