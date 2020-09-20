// Observer
/**
 * 负责把 data 选项中的属性转换成响应式数据
 * data 中的某个属性也是对象，把该属性都转换成相应数据
 * 数据变化发送通知
 */

class Observer {
  constructor(data) {
    this.walk(data)
  }

  // 遍历所有的属性
  walk(data) {
    // 判断 data 是否是对象
    if (!data || typeof data !== 'object') return

    // 遍历 data 对象所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  // 定义响应式数据
  defineReactive(obj, key, val) {
    // 如果 val 是对象，把对象类型数据转换成响应式数据
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val
      },
      // 使用箭头函数改变 this 的指向
      set: (newVal) => {
        if (newVal === val) return
        val = newVal
        // 当前属性重新 set 的时候，如果是 Object 类型，让里面的属性变成响应式数据
        this.walk(val)
        // 发送通知
      }
    })
  }
}
