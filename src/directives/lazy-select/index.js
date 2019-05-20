import LazySelect from './lazy-select'

const install = function (Vue) {
  Vue.directive('lazy-select', LazySelect)
}

if (window.Vue) {
  window['lazy-select'] = LazySelect
  Vue.use(install) // eslint-disable-line
}

LazySelect.install = install
export default LazySelect
