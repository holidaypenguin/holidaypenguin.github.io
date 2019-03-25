---
title: vue 项目添加 eslint
description: <!-- more -->
translate_title: vue-project-add-eslint
tags:
  - Vue
categories:
  - eslint
date: 2019-03-18 14:42:59
updated: 2019-03-18 14:42:59
---

> 本篇为随笔，紧紧作为记录作用

使用eslint 官网 http://eslint.org

standardjs 风格 https://standardjs.com/

  https://github.com/standard/standard


vue检验规则 https://eslint.vuejs.org/rules/



eslint 支持postcss

	使用 https://github.com/postcss/eslint-config-postcss

	暂未使用，postcss-bem写法警告还是存在 (Unknow at rule @component-namespace css.lint.unknownAtRules(unknownAtRules))，且会检验typescript格式。

	eslint-config-postcss 依赖 @logux/eslint-config eslint-plugin-jest eslint-plugin-security eslint-plugin-prefer-let 和 eslint-config-standard eslint-plugin-promise eslint-plugin-standard eslint-plugin-import  eslint-plugin-node，后一部分为当前项目使用的依赖

https://github.com/postcss/eslint-config-postcss



css规则 https://blog.csdn.net/lfcss/article/details/82787113



npm i -D eslint eslint-plugin-vue eslint-config-standard eslint-friendly-formatter eslint-loader eslint-plugin-html eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard

.eslintignore
```
    /build/
    /config/
    /node_modules/*
    /output/
    /static/
```


.eslintrc.js
```
    module.exports = {
      root: true,
      parser: 'babel-eslint',
      parserOptions: {
        sourceType: 'module'
      },
      env: {
        browser: true,
      },
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
      ],
      // required to lint files
      plugins: [
        "html",
        "standard",
        // standard风格的依赖包
        "promise",
        "vue"
      ],
      // add your custom rules here
      rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    
      }
    }
    
```



```
    https://github.com/standard/standard/blob/master/docs/RULES-en.md // 符合这个标准
    // 代码刷新后  浏览器会报出 warning  浏览器中能看到
    // 针对容易网架构
    // 1. 在package.json中添加
    	"eslint": "^3.19.0",
        "eslint-config-standard": "^10.2.1",
        "eslint-friendly-formatter": "^3.0.0",
        "eslint-loader": "^1.7.1",
        "eslint-plugin-html": "^3.0.0",
        "eslint-plugin-import": "^2.7.0",
        "eslint-plugin-node": "^5.2.0",
        "eslint-plugin-promise": "^3.4.0",
        "eslint-plugin-standard": "^3.0.1",
        "babel-eslint": "^7.1.1"
    // 2.在webpack.site.base.js 中添加
        // 一个函数
        function resolve (dir) {
          return path.join(__dirname, '..', dir)
        }
    	// 在rules中添加
    	{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include:[resolve('business')],
            options: {
              formatter: require('eslint-friendly-formatter'),
              emitWarning: true
            }
        }
    // 3 引入.eslintrc.js // 编辑还能检测的 推荐使用vscode 安装eslink插件 并全局安装 cnpm install -g eslint
    // https://eslint.org/docs/user-guide/configuring
    module.exports = {
      root: true,
      parser: 'babel-eslint',
      parserOptions: {
        sourceType: 'module'
      },
      env: {
        browser: true,
      },
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      extends: 'standard',
      // required to lint *.vue files
      plugins: [
        'html'
      ],
      // add your custom rules here
      rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
      }
    }
    // 4 引入.editorconfig //  安装EditorConfig插件 保证建立的文件一致
    root = true
    
    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    end_of_line = lf
    insert_final_newline = true
    trim_trailing_whitespace = true
    // 5 引入.eslintignore
     /build/
```




vue配置例子 1：https://www.cnblogs.com/fengyingYZ/p/10369703.html

vue配置例子2：https://www.cnblogs.com/hahazexia/p/6393212.html
