class Vue {
  // options 
  constructor(options) {
    this.$options = options || {}
    this.$data = options.data || {}
  
    // 获取DOM 元素，这里可能传递的是字符串
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

    // 把 data 中的成员转换成 getter 和 setter 并注入到 Vue 实例中
    this._proxyData(this.$data)
    // 调用 Observer ，监听数据的变化
    new Observer(this.$data)
  }

  // 代理数据
  _proxyData(data) {
    // 遍历所有的 data 属性
    Object.keys(data).forEach(d => {
      Object.defineProperty(this, d, {
        enumerable: true, // 可枚举
        configurable: true, // 可配置
        get() {
          return data[d]
        },
        set(newVal) {
          // 如果新的值和就的值相等，不需要重新赋值
          if (newVal === data[d]) return
          data[d] = newVal
        }
      })
    })
  }
}