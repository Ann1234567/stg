/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-07 09:35:24
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 13:53:48
 */
import axios from 'axios'
import { showToast } from 'vant'
import router from '@/router'
// 创建 axios 实例
const service = axios.create()
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    const superToken = localStorage.getItem('superToken')
    if (router.currentRoute.value.path === '/regulatoryScoring') {
      if (superToken) {
        config.headers['Authorization'] = `Bearer ${superToken}`
      }
    } else if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else if (res.code === 401 || res.code === 403) {
      if (router.currentRoute.value.path === '/regulatoryScoring') {
        // 清除 token
        localStorage.removeItem('superToken')
        showToast({
          type: 'fail',
          message: res.msg
        })
        router.replace('/regulatoryScoring/login')
        return Promise.reject(new Error(res.msg))
      } else {
        // 清除 token
        localStorage.removeItem('token')
        showToast({
          type: 'fail',
          message: res.msg
        })
        router.replace('/login')
        return Promise.reject(new Error(res.msg))
      }

    } else {
      showToast({
        type: 'fail',
        message: res.msg || '请求失败'
      })
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
  },
  error => {
    console.error('响应错误：', error)
    if (error.response && error.response.status === 401) {
      // 清除 token
      localStorage.removeItem('token')
      // 显示提示
      showToast({
        type: 'fail',
        message: '登录已过期，请重新登录'
      })
      // 跳转到登录页
      router.replace('/login')
      return Promise.reject(error)
    }

    showToast({
      type: 'fail',
      message: error.message || '服务器错误'
    })
    return Promise.reject(error)
  }
)

export default service