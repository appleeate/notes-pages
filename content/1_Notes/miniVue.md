#TODO 
miniVue 学习复盘
学习
初始化项目
```shell
yarn init -y
```
增加 ts
```shell
yarn add typescript --dev
```
初始化 ts项目，增加ts 的配置文件 **`tsconfig.json`**
```shell
npx tsc --init
```
增加 jest 和类型
```shell
yarn add jest @types/jest --dev 
```
在`tsconfig.json`中 compilerOptions -> types 增加 jest
```json
{
	compilerOptions: {
		types: ["jest"]
	}
}
```
在`package.json`中增加指令
```json
{
	"script": "jest"
}
```
`tsconfig.json`中的 `noImplicitAny` 设置为 `false` 参数没有写类型，默认为 any 不会爆红了
jest 默认执行环境是 nodeJs 所以不支持 import 需要使用 babel
安装 babel
```shell
yarn add --dev babel-jest @babel/core @babel/preset-env
```
创建`babel.config.js`并写入
```js
module.exports = {  
	presets: [['@babel/preset-env', {targets: {node: 'current'}}]],  
};
```
增加 babel 的 ts 支持
```shell
yarn add --dev @babel/preset-typescript
```
`babel.config.js`改为
```js
module.exports = {
	presets: [
		['@babel/preset-env', {targets: {node: 'current'}}],
		'@babel/preset-typescript'
	],
};
```
在 jest 指令后面增加名字 会自动匹配这个测试文件并执行
```shell
yarn test reactive
```
jest 的等于 是 toBe 方法 不等于是 not.toBe 方法
tsconfig.json 里面的 lib 加了 ES6 就可以支持 es6 语法了

单元测试里面 it() 就是直接执行 it.skip 就是跳过当前这个 it.only 就是只执行这个




`|` 两位都为 0 才为 0
`&` 两位都为 1 才为 1
所以 `|` 用来修改 `&` 用来查找