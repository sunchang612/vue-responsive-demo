/**
 * Compile
 * 负责模板编译，解析指令、差着表达式
 * 负责页面的首次渲染
 * 当数据变化后重新渲染视图
 */

class Complie {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模板，处理文本节点和元素节点
  compile(el) {
    // 遍历所有的节点
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode) { // 处理元素节点
        this.compileElement(node)
      }

      // 判断 node 节点是否还有子节点，并且子节点不等于 0
      if(node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译文本节点，处理差值表达式
  compileText(node) {
    // 匹配差值表达式
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    console.log('value ----->', value)
    if (reg.test(value)) {
      // 获取第一个分组内容
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
    }
  }

  // 编译元素节点，处理指令
  compileElement(node) {

  }

  // 判断元素属性是否为指令，只需判断是否以 v- 开头
  isDirective(attrName) {
    //startsWith: 方法用于检测字符串是否以指定的子字符串开始
    return attrName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断节点是否为元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}