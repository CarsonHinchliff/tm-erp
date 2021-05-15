import mouseEnterTrigger from './directive'
import Vue from 'vue';

const directiveSelector = "mouse-enter-trigger"
const install = function() {
  Vue.directive(directiveSelector, mouseEnterTrigger)
}

if (window.Vue) {
  window[directiveSelector] = mouseEnterTrigger
  Vue.use(install); // eslint-disable-line
}

mouseEnterTrigger.install = install
export default mouseEnterTrigger
