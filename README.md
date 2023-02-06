
## Quick Start

1. node-gyp:"^9.3.1"
2. electron-rebuild:"^3.2.9"
3. python:"^3.10.9"
4. Microsoft Visual Studio 2019
5. nodeJs:"^16.15.0"
6. electron:"^20.3.8"

### 安装相关依赖

项目使用better-sqlite3作为数据存储，需要安装相关依赖套件

```sh
npm i -g node-gyp@9.3.1


npm install --global windows-build-tools
// better-sqllite3需要 vs2019以上
npm install --global windows-build-tools --vs2019


// 其余依赖请自行安装
```

### 对better-sqlite3进行编译

package.json已进行脚本配置

```sh
npm i --save-dev electron-rebuild@3.2.9
npm run rebuild
```

### 运行项目

```sh
npm install
npm run dev
```



### 打包构建

在构建阶段，请删除数据库相关文件，以减少安装包容量

程序运行后会自动配置数据库

目前提供win x64版本

```sh
npm run build
```



## 其他

electron在20版本后有地方改动，如果你不是非常熟悉electron配置，无需更改electron代码部分
