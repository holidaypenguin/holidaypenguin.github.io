---
title: GIT 异常
description: <!-- more -->
translate_title: git-anomaly
date: 2016-01-20 09:02:31
updated: 2016-01-20 09:02:31
tags:
    - Git
categories:
    - Git
---

# Couldn't reserve space for cygwin's heap, Win32 error 0
问题表现：
    0 [main] us 0 init_cheap: VirtualAlloc pointer is null, Win32 error 487 AllocationBase 0x0, BaseAddress 0x68560000, RegionSize 0x390000, State 0x10000 C:\Program Files\Git\bin\sh.exe: *** Couldn't reserve space for cygwin's heap, Win32 error 0

解决办法：
    http://stackoverflow.com/questions/18502999/git-extensions-win32-error-487-couldnt-reserve-space-for-cygwins-heap-win32
    在安装目录下X:\xxx\xxx\bin执行如下命令
    rebase.exe -b 0x50000000 msys-1.0.dll