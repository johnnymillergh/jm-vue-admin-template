export default {
  inserted (el, binding, vnode) {
    el.addEventListener('click', e => {
      if (!el.disabled) {
        const { value } = binding
        let timeInterval = 1000
        if (value) {
          timeInterval = value
        }
        el.className += ' is-loading'
        const $loading = document.createElement('i')
        $loading.className = 'el-icon-loading'
        el.appendChild($loading)
        el.disabled = true
        setTimeout(() => {
          el.removeChild($loading)
          el.className = el.className.replace('is-loading', '')
          el.disabled = false
        }, timeInterval)
      }
    })
  }
}
