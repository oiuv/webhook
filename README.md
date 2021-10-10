# Git WebHook

简单易用的webhook脚本，支持linux、windows、macOS系统，自动化部署Github、Gitee等仓库的代码。

## 复制代码

    cd ~ && git clone git@github.com:oiuv/webhook.git && cd webhook

## 启动服务

    node webhook.js

默认监听`8008`端口，做好域名解析后配置在webhook中即可生效。

## 代理服务(可选)

如果你要在个人电脑上测试，可以使用ngrok反向代理服务，并把ngrok提供的URL配置在webhook中。

    ngrok http 8008

## 配置脚本

参考·sh·和·bat·目录中的`webhook.sh`和`webhook.cmd`。如果是linux系统，只用在`sh`目录中配置和仓库同名的`.sh`脚本即可，如果是windows系统，需要在`bat`目录中配置和仓库同名的`.cmd`批处理文件调用`.sh`脚本。