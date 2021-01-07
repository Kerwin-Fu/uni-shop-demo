import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'

Vue.config.productionTip = false

uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

uni.$showMsg = function(title = "数据加载失败", duration = 1500) {
	uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
