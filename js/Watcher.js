
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    
    this.cb = cb

    // 当前的 Watcher 对象记录到 Dep 类的静态属性 target 中
    // 触发 get 方法，在 get 方法中会调用 addSub
    Dep.target = this
    this.oldValue = vm[key]
    // 防止重复添加
    Dep.target = null
  }

  // 当数据发生变化的更新视图
  update() {
    let newValue = this.vm[this.key]
    if (newValue === this.oldValue) return
    // 调用回调函数，更新视图
    this.cb(newValue)
  }
}
