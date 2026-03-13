---
created: 2025-12-08 11:20
---
# ref vs reactive

## 1. 设计目的和使用场景
  首先 ref 和 reactive 都是 vue3 中 为了响应式系统服务的 api
  ref 的设计目的是为了包装基础值类型的 比如 string number boolean 等
  reactive 是为了包装 对象类型的 比如 Object Array 等
  所以对应的使用场景就是 基础类型使用 ref 对象类型使用 reactive
  当然实际中 其实我用 ref 一把梭比较多

vue 官方也是更推荐使用 ref 一把梭，原因有两点
1. 代码的一致性。使用响应式的时候，都是.value
2. 对 ts 更友好。 ref 的类型推导更直观 #todo 为什么更直观 
3. reactive 的类型在复杂嵌套时可能出问题 #todo 为什么会出问题 出的什么问题

## 2. 底层实现原理（简要）
  ref 底层就是使用 类的 getter 和 setter 返回一个 RefImp 实例。
  reactive 就是直接返回一个 proxy 对象

ref 的实现细节
```typescript
// 简化的 RefImpl
class RefImpl<T> {
  privite _value: T
  privite _rawValue: T
  
  constructor(value: T) {
    this._value = value
    this._rawValue = value
  }
  
  get value(){
    track(this. 'get', 'value')
    return this._value
  }
  
  set value(newValue){
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = newValue
      trigger(this, 'set', 'value') // 这里是不是写错了，为何用字符串'value'
    }
  }
}

// 关键点：
// 1. 依赖收集发生在 get value() 中
// 2. 触发更新发生在 set value() 中
// 3. 通过 _rawValue 比较，避免不必要的更新
```

reactive 实现细节
```typescript
const reactiveHanlder: ProxyHandler<any> = {
  get (target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    track(target, 'get', key)
    // 如果值是对象的话， 递归代理
    return isObject(res) ? reactive(res) : res
  }
  
  set (target, key, value, receiver) {
    const oldValue = target[key]
    const result = Reflect.set(targer, key, value, receiver)
    if (hasChanged(value, oldValue)) {
      trigger(target, 'set', key) // 触发更新
    }
    return result;
  }
}
```

## 3. 实际项目中的选择标准
  在我的实际开发中，使用 ref 的比例是远远大于 reactive 的
  甚至部分时候 我还要把 reactive 改回 ref

## 4. 常见的坑和最佳实践
  最常见的一个坑就是 reactive 赋值的话 会丢失响应式
  比如 let obj = reactive({ a: 1 })
  obj = { a: 2 }
  这个时候 obj 就是普通对象了
  但是 const obj = ref({ a: 1 })
  obj.value = { a: 2 }
  obj 依旧是响应式的。
  还有就是 reactive 解构会丢失响应式 需要使用 toRef 包裹一下才可以
目前我的最佳实践就是 全部 ref 一把梭

## 5. 我还不确定/需要查证的部分
ref 底层写的不是很对。 或者说写的不是我想要的回答 但是我想不出更细致的点了
使用 toRef 还是 toRefs 包裹 不确定
  toRef 是单个的 toRefs 是多个的
底层实现原理 应该还可以写的更多的。 但是我目前只能想到这里

---
回答完成时间：2025 年 12 月 8 日 11:42:23
回答用时：9分钟
自我感觉：有些模糊