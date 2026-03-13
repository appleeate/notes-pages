1. loader 的加载顺序是从右往左
2. loader 接收一个参数是源代码，返回一个新的源代码
3. loader 有一个属性是 pitch
4. loader 的实际加载顺序是 loader1.pitch 返回代码就结束，没返回就继续加载 loader2.pitch 返回就直接走 loader1 的处理 等等等。 所有的 pitch 没返回，那就倒序开始执行 loader。
	![[1_Notes/前端/进阶篇/构建工具/webpack/assets/loader+性能优化/image.png]]
5. 性能优化可以 
	- 限制 loader 的应用范围。 `exclude`去掉不处理的文件 比如 lodash jquery
	- 缓存 loader 结果 使用 `cache-loader`
	- 为 loader 开启多线程 `thread-loader` **但是线程的开启和管理需要浪费时间。小项目用不到**
6. `module.noParse` 直接写上不需要解析的模块