// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/reset.css'
import './assets/css/markdown.css'

import Axios from 'axios'
import qs from 'qs'

// vuex
import store from './vuex/store.js'

// antd
import { Button, Layout, Menu, Card, Input, Select, Icon, Upload, Modal, Divider, message, notification, Table, Tag } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false

Vue.component(Button.name, Button);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Card.name, Card);
Vue.component(Input.name, Input);
Vue.component(Input.TextArea.name, Input.TextArea);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Icon.name, Icon);
Vue.component(Upload.name, Upload);
Vue.component(Modal.name, Modal);
Vue.component(Divider.name, Divider);
Vue.component(Table.name, Table);
Vue.component(Tag.name, Tag);

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;

// Vue.use(Antd)

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器
Axios.interceptors.request.use(
  config => {
    config.withCredentials = true;
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    if (localStorage.token || sessionStorage.token) { 
      // config.headers.Authorization = localStorage.token;
      config.headers = {
        'access-token': localStorage.token || sessionStorage.token,
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

Vue.prototype.$http = Axios;

const URL = 'https://mherobrine.com:4000';
Vue.prototype.URL = URL;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
