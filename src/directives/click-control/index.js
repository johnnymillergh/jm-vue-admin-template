import ClickCtrl from './click-control'

const install = function (Vue) {
  Vue.directive('click-control', ClickCtrl)
}

if (window.Vue) {
  window['click-control'] = ClickCtrl
  Vue.use(install) // eslint-disable-line
}

ClickCtrl.install = install
export default ClickCtrl
