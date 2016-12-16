# 我是你的 热 啊

> Replace build blocks in HTML. Like useref but done right.
 

# Table of Contents

- [Usage](#usage)
- [API](#api)
- [Example](#example)
- [Upgrade](#upgrade)


## 用法
安装:

```shell
npm install --save-dev gulp-html-replace
```

在HTML文件中放置一些块：
```html
<!-- build:<name> -->
Everything here will be replaced
<!-- endbuild -->
```
`name` 是块的名称。 可以由字母，数字，下划线（_）和连字符（ - ）符号组成。

## API
### htmlreplace(tasks, options)

#### tasks
Type: `Object` `{task-name: replacement}`

* **task-name** - HTML中的块的名称
* **replacement** - 可使用String | Array | stream.Readable | Object替换。 请参见下面的例子。

###### Simple example: - 简单示例


```javascript
// Options is a single string
htmlreplace({js: 'js/main.js'})

// Options is an array of strings
htmlreplace({js: ['js/monster.js', 'js/hero.js']})
```

> 如果你的选项字符串以`.js`或`.css`结尾，它们将被正确的脚本/样式标签代替，所以你不需要像下面的例子那样指定模板。

###### 高级示例：
```javascript
// Options is an object
htmlreplace({
  js: {
    src: 'img/avatar.png',
    tpl: '<img src="%s" align="left" />'
  }
})

// Multiple tag replacement
htmlreplace({
  js: {
    src: [['data-main.js', 'require-src.js']],
    tpl: '<script data-main="%s" src="%s"></script>'
  }
})
```
* **src** - `String | Array | stream.Readable` 与简单示例中的相同。
* **tpl** - `String`格式的模板字符串。 在内部使用[util.format()](http://nodejs.org/api/util.html#util_util_format_format)。

> 在第一个示例中，`%s`将替换为`img/avatar.png`，生成`<img src ="img/avatar.png" align ="left">`作为结果。

> 在第二个示例中，`data-main="%s"`和`src ="%s"`将相应地替换为data-main.js和require-src.js，产生`<script data-main ="data-main.js" src ="require-src.js"> </ script>`作为结果

###### Extended replacements: - 扩展替换：
```javascript
// 基于正在处理的文件进行替换
htmlreplace({
  js: {
    src: null,
    tpl: '<script src="%f".js></script>'
  }
})
// 扩展更换结合标准更换
htmlreplace({
  js: {
    src: 'dir',
    tpl: '<script src="%s/%f".js"></script>'
  }
})

```
* **src** - `null | String | Array | stream.Readable` 与上述示例相同，但如果模板中没有标准替换，则为null。
* **tpl** - `String` 模板字符串。 扩展替换不使用util.format（），并在标准替换之前执行。


> 在第一个示例中，src为null，因为没有标准替换。 `%f`替换为当前正在处理的文件的名称（无扩展名）。 如果正在处理的文件是`xyzzy.html`，结果是`<script src ="xyzzy.js"> </ script>`。

> 在第二个示例中，`src`已设置为字符串`dir`。 首先处理扩展替换，将`%f`替换为`xyzzy`，然后`%s`将替换为`dir`，导致`<script src="dir/xyzzy.js"></script>`。

有效的扩展替换是：

* **%f** - 这将被替换为文件名，没有扩展名。
* **%e** - 这将被包括`.`字符的扩展名替换。

###### 流替换
每个地方都可以给出一个字符串替换，a stream of vinyl is also accepted。 每个文件的内容将被视为UTF-8文本，并用于替换。 如果流产生多个文件，则行为与给定数组时的行为相同。
```javascript
// Replacement is a stream
htmlreplace({
  cssInline: {
    src: gulp.src('style/main.scss').pipe(sass()),
    tpl: '<style>%s</style>'
  }
})

```

#### options
Type: `object`
  
所有默认为 false

- {Boolean} **keepUnassigned** - 是否使用未使用的名称保留块或删除它们 
- {Boolean} **keepBlockTags** - 是否保留`<!-- build -->` 和 `<!-- endbuild -->`注释或删除它们
- {Boolean} **resolvePaths** - 尝试解析相对路径。 例如，如果您的`cwd`是``/``，您的html文件是`/page/index.html`，并将替换设置为`lib/file.js`，该html中的结果路径将是`../lib/file.js`  

###### Options example:
```javascript
htmlreplace({
  js: {
    src: null,
    tpl: '<script src="%f".js></script>'
  }
}, {
  keepUnassigned: false,
  keepBlockTags: false,
  resolvePaths: false
})
```

## Example
index.html:

```html
<!DOCTYPE html>
<html>
    <head>

    <!-- build:css -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <!-- endbuild -->

    </head>
    <body>

    <!-- build:js -->
    <script src="js/player.js"></script>
    <script src="js/monster.js"></script>
    <script src="js/world.js"></script>
    <!-- endbuild -->
```

gulpfile.js:

```javascript
var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');

gulp.task('default', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'styles.min.css',
        'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('build/'));
});
```

Result:

```html
<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="styles.min.css">

    </head>
    <body>

    <script src="js/bundle.min.js"></script>
```

## Upgrade

### From 0.x to 1.x
> 此版本引入了流媒体支持，较少混淆的API，新选项keepUnused和全代码检修。
* 如果你使用单个任务，像这样：`htmlreplace('js', 'script.js')` 只是更改为`htmlreplace({js: 'script.js'})` 
* 如果你使用单一任务模板：`htmlreplace('js', 'script.js', '<script="%s">')`将其更改为`htmlreplace({js: {src: 'script.js', tpl: '<script="%s">'})`    
* 文件重命名为src，请参见上一个示例。 如果需要，重命名。

### From 1.1.x to 1.2.x
>此版本切换到指定选项的新方式，这种方式更加面向未来。 在它是`htmlreplace(tasks, keepUnassigned = false)`之前，现在它的`htmlreplace(tasks, {keepUnassigned: false})`。 不需要任何操作，旧的语法仍然可以工作，但是建议切换到新的语法。

[npm-url]: https://npmjs.org/package/gulp-html-replace
[npm-image]: http://img.shields.io/npm/v/gulp-html-replace.svg
[travis-url]: https://travis-ci.org/VFK/gulp-html-replace
[travis-image]: https://travis-ci.org/VFK/gulp-html-replace.svg
[appveyor-url]: https://ci.appveyor.com/project/VFK/gulp-html-replace
[appveyor-image]: https://ci.appveyor.com/api/projects/status/66kwbnis5a1gwp6d?svg=true
[coveralls-url]: https://coveralls.io/github/VFK/gulp-html-replace?branch=master
[coveralls-image]: https://coveralls.io/repos/VFK/gulp-html-replace/badge.svg?branch=master&service=github
