import Vue from 'vue'              // 引入vue
import App from './app.vue'        // 引入app组件

const root = document.createElement('div'); // 根节点
document.body.appendChild(root);

new Vue({
  render: (h) => h(App)             // 将App渲染至根节点
}).$mount(root)