---
title: IDE-Sublime lint-JSHint 配置选项
description: <!-- more -->
translate_title: ide-sublime-lint-jshint-configuration-options
date: 2017-03-13 18:05:58
updated: 2017-03-13 18:05:58
tags:
    - IDE
    - Sublime
    - 工具
categories:
    - IDE
---


JSHint选项
此页面的内容源自[JSHint](https://github.com/jshint/jshint)项目存储库。如果您发现错误，请[打开一个问题](https://github.com/jshint/jshint/issues/new)或（更好的）[提出拉请求](https://github.com/jshint/jshint/compare)！

来自官方文档 http://jshint.com/docs/options/#enforceall  google翻译

# 强制执行选项

当设置为true时，这些选项将使JSHint产生更多关于您的代码的警告。


## bitwise 
此选项禁止使用按位运算符，例如^（XOR）， |（OR）和其他。位运算符在JavaScript程序中非常罕见，而且往往&只是一个错误类型&&。

## camelcase
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项允许强制所有变量名称使用camelCase样式或带下划线的UPPER_CASE。

## curly 
此选项要求您始终在循环和条件中的块周围放置花括号。当块仅包含一个语句时，JavaScript允许您省略花括号，例如：while (day)  shuffle();然而，在某些情况下，它可能导致错误（你会认为这 sleep()是循环的一部分，而实际上它不是）：while (day)  shuffle();  sleep();

## enforceall 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 如果不自动选择让用户使用新功能，则无法维护该选项。这可能会导致在次要版本的JSHint之间升级时出现意外的警告/错误。此选项是JSHint版本2.6.3中提供的最严格的JSHint配置的简写。它启用所有强制执行选项并禁用在该版本中定义的所有轻松选项。

## eqeqeq 
此选项禁止使用==和!=支持===和 !==。前者在比较之前尝试强制值，这可能导致一些意想不到的结果。后者不做任何强制，所以他们一般更安全。如果你想更多地了解JavaScript中的类型强制，我们推荐 Angus Croll的真理，平等和JavaScript。

## es3 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 请esversion: 3改用。这个选项告诉JSHint你的代码需要遵守ECMAScript 3规范。如果您需要您的程序在旧版浏览器（如Internet Explorer 6/7/8/9）和其他旧版JavaScript环境中可执行，请使用此选项。

## es5 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 请esversion: 5改用。此选项启用首先在ECMAScript 5.1规范中定义的语法。这包括允许保留关键字作为对象属性。

## esversion 
此选项用于指定代码必须遵守的ECMAScript版本。它可以采用以下值之一：3 - 如果您需要您的程序在旧版浏览器（如Internet Explorer 6/7/8/9）和其他旧版JavaScript环境中可执行5- 启用首先在ECMAScript 5.1规范中定义的语法。这包括允许保留关键字作为对象属性。6- 告诉JSHint你的代码使用ECMAScript 6的特定语法。请注意，并非所有浏览器都实现它们。

## forin 
此选项需要所有for in循环过滤对象的项目。for语句允许循环遍历对象的所有属性的名称，包括通过原型链继承的那些属性的名称。此行为可能导致对象中的意外项目，因此通常更安全地筛选继承属性，如示例所示：for (key in obj) {  if (obj.hasOwnProperty(key)) {    // We are sure that obj[key] belongs to the object and was not inherited.  }}要更深入地了解JavaScript中的for in循环，请 参阅 Angus Croll 探索JavaScript for-in循环。

## freeze 
这个选项禁止重写本地对象如原型 Array，Date等等。// jshint freeze:trueArray.prototype.count = function (value) { return 4; };// -> Warning: Extending prototype of native object: 'Array'.

## funcscope 
此选项抑制关于在控制结构内声明变量的警告，同时从外部访问它们。即使JavaScript只有两个真实范围 - 全局和函数 - 这样的实践导致新的语言和难以调试的bug的人之间的混乱。这就是为什么，默认情况下，JSHint警告在预期范围之外使用的变量。function test() {  if (true) {    var x = 0;  }  x += 1; // Default: 'x' used out of scope.            // No warning when funcscope:true}

## futurehostile 
此选项启用有关使用在未来版本的JavaScript中定义的标识符的警告。虽然覆盖它们在没有实现的上下文中没有效果，但是当将代码库迁移到该语言的较新版本时，这种做法会引起问题。

## globals 
此选项可用于指定未在源代码中正式定义的全局变量的白名单。当与undef选项组合时，这是最有用的，以便抑制特定于项目的全局变量的警告。设置条目以true启用读取和写入该变量。将其设置为false将触发JSHint将该变量视为只读。另请参见“环境”选项：一组选项，用于启用在常见JavaScript环境中定义的全局变量。要globals在单个文件中配置，请参阅内联配置。

## immed 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项禁止使用立即函数调用，而不将其包含在括号中。括号括号帮助您的代码的读者理解表达式是函数的结果，而不是函数本身。

## indent 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项为代码设置特定的制表符宽度。

## iterator 
此选项禁止有关__iterator__属性的警告。此属性不受所有浏览器支持，因此请仔细使用它。

## latedef 
此选项禁止在定义变量之前使用变量。JavaScript只有函数范围，除此之外，所有的变量总是被移动或悬挂到函数的顶部。这种行为可以导致一些非常讨厌的错误，这就是为什么它是更安全的总是使用变量只有在它们被明确定义之后。将此选项设置为“nofunc”将允许忽略函数声明。为了更深入地了解JavaScript中的范围和提升，请阅读 Ben Cherry的JavaScript Scoping和Hoisting。

## maxcomplexity 
此选项允许您控制整个代码中的循环复杂性。环路复杂性测量通过程序源代码的线性独立路径的数量。阅读更多关于维基百科上的复杂性。

## maxdepth 
此选项允许您控制嵌套的嵌套方式：// jshint maxdepth:2function main(meaning) {  var day = true;  if (meaning === 42) {    while (day) {      shuffle();      if (tired) { // JSHint: Blocks are nested too deeply (3).          sleep();      }    }  }}

## maxerr 
此选项允许您设置JSHint将在放弃之前产生的最大警告量。默认值为50。

## maxlen 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项允许您设置线的最大长度。

## maxparams 
此选项允许您设置每个函数允许的形式参数的最大数量：// jshint maxparams:3function login(request, onSuccess) {  // ...}// JSHint: Too many parameters per function (4).function logout(request, isManual, whereAmI, onSuccess) {  // ...}

## maxstatements 
此选项允许您设置每个函数允许的最大语句数：// jshint maxstatements:4function main() {  var i = 0;  var j = 0;  // Function declarations count as one statement. Their bodies  // don't get taken into account for the outer function.  function inner() {    var i2 = 1;    var j2 = 1;    return i2 + j2;  }  j = i + j;  return j; // JSHint: Too many statements per function. (5)}

## newcap 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项需要大写构造函数的名称。与new操作符一起使用的大写函数只是一个约定，帮助程序员在视觉上区分构造函数和其他类型的函数，以帮助在使用时发现错误this。不这样做不会在任何浏览器或环境中破坏你的代码，但是通过阅读代码 - 如果函数应该使用或不使用新的，将更难一些。这很重要，因为当要使用的函数 new没有使用它时，this将指向全局对象而不是新对象。

## noarg 
此选项禁止使用arguments.caller和 arguments.callee。两者.caller并且.callee做了不少优化是不可能的，所以他们在JavaScript的未来版本中被弃用。事实上，ECMAScript 5禁止arguments.callee 在严格模式下使用。

## nocomma 
此选项禁止使用逗号运算符。当误用时，逗号运算符可能会掩盖语句的值，并促进错误的代码。

## noempty 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项在代码中具有空块时发出警告。JSLint最初是对所有空块的警告，我们只是使其可选。没有研究报告，JavaScript中的空块以任何方式破坏您的代码。

## nonbsp 
此选项警告“不间断的空格”字符。这些字符可以在Mac计算机上与选项空间一起输入，并有可能中断非UTF8网页。

## nonew
此选项禁止使用用于副作用的构造函数。有些人喜欢调用构造函数而不将其结果赋给任何变量：new MyConstructor();这种方法没有优势， MyConstructor因为操作符new创建的对象不在任何地方使用，所以你通常应该避免像这样的构造函数。

## notypeof 
此选项禁止有关无效typeof运算符值的警告。此运算符只有一组有限的可能返回值。默认情况下，JSHint警告，当您将其结果与一个无效值，通常可以是错字。// 'fuction' instead of 'function'if (typeof a == "fuction") { // Invalid typeof value 'fuction'  // ...}不要使用此选项，除非你绝对确定不需要这些检查。

## predef 
此选项允许您控制JSHint认为要在环境中隐式定义的变量。使用字符串值数组配置它。使用连字符（ - ）字符前缀变量名将从预定义变量的集合中删除该名称。JSHint将考虑以这种方式声明的变量是只读的。此选项不能在线指定; 它只能通过JavaScript API或外部配置文件使用。

## quotmark 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项强制在您的代码中使用的引号的一致性。它接受三个值：true如果你不想强制一个特定的风格，但想要一些一致性，"single"如果你只想允许单引号，并且"double"如果你只想允许双引号。

## shadow 
此选项禁止关于变量阴影的警告，即声明已在外部作用域中某处声明的变量。“inner” - 检查在同一范围内定义的变量“outer” - 检查外部作用域中定义的变量false - 与inner相同true - 允许可变阴影

## singleGroups 
当不严格要求时，此选项禁止使用分组运算符。这种使用通常反映对一元操作符的误解，例如：// jshint singleGroups: truedelete(obj.attr); // Warning: Unnecessary grouping operator.

## strict 
此选项要求代码在ECMAScript 5的strict模式下运行。 严格模式 是选择限制JavaScript版本的一种方式。严格模式消除了一些JavaScript错误，没有通过更改它们产生错误不会导致错误。它还修正了错误，使JavaScript引擎难以执行某些优化。“全球” - "use strict";在全球层面必须有一个指令“隐含” - 将代码看作有"use strict";指令false - 禁用关于严格模式的警告true - "use strict";在函数级别必须有一个指令;        this is preferable for scripts intended to be loaded in web        browsers directly because enabling strict mode globally        could adversely effect other scripts running on the same        page

## undef 
此选项禁止使用明确未声明的变量。此选项对于发现泄漏和错误的变量非常有用。// jshint undef:truefunction test() {  var myVar = 'Hello, World';  console.log(myvar); // Oops, typoed here. JSHint with undef will complain}如果你的变量在另一个文件中定义，你可以使用global 指令告诉JSHint它。

## unused 
此选项在定义和不使用变量时发出警告。这对于一般的代码清理非常有用，特别是在除了使用之外 undef。// jshint unused:truefunction test(a, b) {  var c, d = 2;  return a + d;}test(1, 2);// Line 3: 'b' was defined but never used.// Line 4: 'c' was defined but never used.除此之外，此选项将警告您通过该global伪指令声明的未使用的全局变量。这可以设置为vars仅检查变量，而不是函数参数，或strict检查所有变量和参数。默认（true）行为是允许未使用的参数，后跟一个使用的参数。
## varstmt 
当设置为true时，禁止使用VariableStatements。例如：// jshint varstmt: truevar a; // Warning: `var` declarations are forbidden. Use `let` or `const` instead.


# 放松的选择

当设置为true时，这些选项将使JSHint对您的代码产生较少的警告。

## asi 
此选项禁止有关缺少的分号的警告。有很多关于分号的FUD被社区中的很多人传播。常见的神话是，分号是一直需要的（他们不是），并且他们是不可靠的。JavaScript有关于分号的规则，所有浏览器都遵循这些规则，所以由您自己决定是否应该在代码中使用分号。有关JavaScript中的分号的更多信息，请参阅 Isaac Schlueter的分号和JavaScript分号插入对JavaScript领导人的公开信。

## boss 
此选项在预期进行比较的情况下禁止关于分配的使用的警告。通常情况下，代码if (a = 10) {}就是一个拼写错误。但是，它可以在这样的情况下有用：for (var i = 0, person; person = people[i]; i++) {}您可以通过使用括号包围该分配来按用途隐藏此错误，例如：for (var i = 0, person; (person = people[i]); i++) {}

## debug 
此选项禁止对debugger代码中的语句的警告。
elision 此选项告诉JSHint您的代码使用ES3数组elision元素，或空元素（例如，[1, , , 4, , , 7]）。

## eqnull 
此选项禁止有关== null比较的警告。当你想检查一个变量是null或是时，这种比较通常是有用的 undefined。

## esnext 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 请esversion: 6改用。此选项告诉JSHint您的代码使用ECMAScript 6特定的语法。请注意，并非所有浏览器都实现这些功能。更多信息：ECMAScript 6规范

## evil 
此选项禁止有关使用的警告eval。使用是 eval不鼓励的，因为它可以使您的代码易受各种注入攻击，这使得JavaScript解释器很难做某些优化。

## expr 
此选项禁止有关使用通常希望看到赋值或函数调用的表达式的警告。大多数时候，这样的代码是拼写错误。但是，它不被规范禁止，这就是为什么这个警告是可选的。

## globalstrict 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 使用strict: "global"。此选项禁止关于使用全局严格模式的警告。全局严格模式可以打破第三方小部件，因此不推荐使用。有关严格模式的详细信息，请参阅strict选项。

## lastsemic 
此选项禁止有关缺少的分号的警告，但仅在单行块中的最后一条语句省略分号时：var name = (function() { return 'Anton' }());这是一个非常小众的用例，只有当您使用自动JavaScript代码生成器时才有用。

## laxbreak 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项抑制大多数有关代码中可能不安全的换行符的警告。它不抑制关于逗号优先编码风格的警告。要抑制那些你必须使用laxcomma（见下文）。

## laxcomma 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项禁止关于逗号优先编码样式的警告：var obj = {    name: 'Anton'  , handle: 'valueof'  , role: 'SW Engineer'};

## loopfunc 
此选项禁止对循环中的函数的警告。定义循环中的函数可能会导致如下的错误：var nums = [];for (var i = 0; i < 10; i++) {  nums[i] = function (j) {    return i + j;  };}nums[0](2); // Prints 12 instead of 2要修复上面的代码，你需要复制的值i：var nums = [];for (var i = 0; i < 10; i++) {  (function (i) {    nums[i] = function (j) {        return i + j;    };  }(i));}

## moz 
这个选项告诉JSHint你的代码使用Mozilla JavaScript扩展。除非您专门为Firefox Web浏览器开发，否则不需要此选项。更多信息：新的JavaScript 1.7

## multistr 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项抑制有关多行字符串的警告。多行字符串在JavaScript中是很危险的，因为如果你不小心在转义字符（\）和一个新行之间放了一个空格，所有的地狱都会松动。请注意，即使此选项允许正确的多行字符串，它仍然警告多行字符串没有转义字符或转义字符和空格之间的任何东西。// jshint multistr:truevar text = "Hello\World"; // All good.text = "HelloWorld"; // Warning, no escape character.text = "Hello\World"; // Warning, there is a space after \

## noyield 
此选项抑制关于生成函数的警告，其中没有 yield语句。

## plusplus 
此选项禁止使用一元增量和减量运算符。有些人认为，++并--降低了他们的编码风格的质量，有编程语言，如Python，完全没有这些运算符。

## proto 
此选项禁止有关__proto__属性的警告。

## scripturl 
此选项会禁止关于使用以脚本为目标的网址的警告，例如javascript:...。

## sub 
警告此选项已被弃用，将在JSHint的下一个主要版本中删除。 JSHint将其范围限制为代码正确性的问题。如果你想强制执行有关代码风格的规则，请查看JSCS项目。此选项将禁止使用有关的警告[]符号时，它可以在点符号来表示：person['name']对person.name。

## supernew 
此选项抑制关于“怪异”结构的警告，如 new function () { ... }和new Object;。这种结构有时用于在JavaScript中产生单例：var singleton = new function() {  var privateVar;  this.publicMethod  = function () {}  this.publicMethod2 = function () {}};

## validthis 
当代码以严格模式运行并this在非构造函数中使用时，此选项将禁止有关可能的严重违规的警告。你应该使用这个选项 - 在一个函数范围内 - 当你肯定你的使用this在严格模式是有效的（例如，如果你调用你的函数使用 Function.call）。注意：此选项只能在函数作用域内使用。如果您尝试全局设置此选项，JSHint将失败并显示错误。

## withstmt 
此选项禁止有关使用语句的警告with。语句的with语义可能导致开发人员之间的混乱和全局变量的意外定义。更多信息：与声明考虑有害

# 环境

这些选项让JSHint知道一些预定义的全局变量。

## browser 
此选项定义了现代浏览器暴露全局：从好老一路document和navigator对HTML5 FileReader在浏览器世界等新的发展。注意：此选项不会公开像alert或的 变量console。有关详细信息，请参阅选项devel。

## browserify 
此选项定义使用Browserify工具构建项目时可用的全局变量。

## couch 
此选项定义由CouchDB公开的全局变量 。CouchDB是一个面向文档的数据库，可以使用JavaScript以MapReduce方式查询和索引。

## devel 
此选项定义通常用于记录恶意调试的全局变量：console，alert等等。通常不建议在生产环境中运行它们，因为例如console.log在Internet Explorer的旧版本中断。

## dojo 
此选项定义由Dojo Toolkit公开的全局变量。

## jasmine 
此选项定义由Jasmine单元测试框架公开的全局变量。

## j query （出现未知情况，加空格解决）
此选项定义由jQuery JavaScript库公开的全局变量。

## mocha 
此选项定义由摩卡单元测试框架的“BDD”和“TDD”UI公开的全局变量 。

## module 
此选项通知JSHint输入代码描述了ECMAScript 6模块。所有模块代码都被解释为严格模式代码。

## mootools 
此选项定义由MooTools JavaScript框架公开的全局变量 。

## node 
此选项定义当代码在Node运行时环境中运行时可用的全局变量。Node.js是一个使用异步事件驱动模型的服务器端JavaScript环境。此选项还会跳过在浏览器环境中有意义的一些警告，但在节点（如文件级use strict编译指示和console.log语句）中没有意义。

## nonstandard 
此选项定义非标准但广泛采用的全局变量，如 escape和unescape。

## phantom 
此选项定义当您的核心在PhantomJS运行时环境中运行时可用的全局变量。PhantomJS 是一个使用JavaScript API的无头WebKit脚本。它支持各种Web标准的快速和本地支持：DOM处理，CSS选择器，JSON，Canvas和SVG。

## prototypejs 
此选项定义由Prototype JavaScript框架公开的全局变量 。

## qunit 
此选项定义由QUnit单元测试框架公开的全局变量。

## rhino 
此选项定义当代码在Rhino运行时环境中运行时可用的全局变量。Rhino 是一个完全用Java编写的JavaScript的开源实现。

## shelljs 
此选项定义由ShellJS库公开的全局变量。

## typed 
此选项为类型化数组构造函数定义全局变量。更多信息：JavaScript类型数组

## worker 
此选项定义当代码在Web Worker中运行时可用的全局变量。Web Workers为Web内容在后台线程中运行脚本提供了一种简单的方法。

## wsh 
此选项定义当代码作为Windows脚本宿主的脚本运行时可用的全局变量。

## yui 
此选项定义由YUI JavaScript框架公开的全局变量。
