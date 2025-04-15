/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-03-31 12:59:22
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-08 15:47:24
 */
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',//首页
      name: 'home',
      component: () => import('@/views/Home/index.vue'),
      meta: { requiresAuth: true }
    },
    {//热点列表
      path: '/hotList',
      name: 'hotList',
      component: () => import('@/views/HotList/index.vue'),
      meta: { requiresAuth: true }
    },
    {//热点列表详情
      path: '/hotList/detail/:newsId',
      name: 'hotList-detail',
      component: () => import('@/views/HotList/detail.vue'),
    },
    {//登录页面
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {//注册页面
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register/index.vue')
    },
    {//搜索页面
      path: '/scoring',
      name: 'scoring',
      component: () => import('@/views/Scoring/index.vue'),
      meta: { requiresAuth: true }
    },
    {//投诉评价
      path: '/complaint',
      name: 'complaint',
      component: () => import('@/views/Complaint/index.vue'),
      meta: { requiresAuth: true }
    },
    {//监管打分
      path: '/regulatoryScoring',
      name: 'regulatoryScoring',
      component: () => import('@/views/RegulatoryScoring/index.vue'),
      meta: { requiresAuth: true }
    },
    {//监管打分登录
      path: '/regulatoryScoring/login',
      name: 'regulatoryScoringLogin',
      component: () => import('@/views/RegulatoryScoring/login.vue'),
      meta: { requiresAuth: true }
    },
    {//咨询建议
      path: '/suggestions',
      name: 'suggestions',
      component: () => import('@/views/Suggestions/index.vue'),
      meta: { requiresAuth: true }
    },
    {//商户入口
      path: '/merchantPortal',
      name: 'merchantPortal',
      component: () => import('@/views/MerchantPortal/index.vue'),
      meta: { requiresAuth: true }
    },
    {//消息列表
      path: '/todoList',
      name: 'todoList',
      component: () => import('@/views/MerchantPortal/todoList.vue'),
      meta: { requiresAuth: true }
    },
    {//申请摊主
      path: '/applyVendor',
      name: 'applyVendor',
      component: () => import('@/views/ApplyVendor/index.vue'),
      meta: { requiresAuth: true }
    },
    {//申请摊主提交成功
      path: '/applyVendor/success',
      name: 'applyVendorSuccess',
      component: () => import('@/views/ApplyVendor/success.vue'),
      meta: { requiresAuth: true }
    },
    {//摊位打卡
      path: '/stallCheck',
      name: 'stallCheck',
      component: () => import('@/views/StallCheck/index.vue'),
      meta: { requiresAuth: true }
    },
    {//摊位打卡成功
      path: '/stallCheck/success',
      name: 'stallCheckSuccess',
      component: () => import('@/views/StallCheck/success.vue'),
      meta: { requiresAuth: true }
    },
    {//个人信息
      path: '/personalInfo',
      name: 'personalInfo',
      component: () => import('@/views/PersonalInfo/index.vue'),
      meta: { requiresAuth: true }
    },
    {//历史信息
      path: '/history',
      name: 'history',
      component: () => import('@/views/History/index.vue'),
      meta: { requiresAuth: true }
    },
    {//摊位浏览
      path: '/stallBrowse',
      name: 'stallBrowse',
      component: () => import('@/views/StallBrowse/index.vue'),
      meta: { requiresAuth: true }
    },
    {//摊位详情
      path: '/stallBrowse/edit/:areaId',
      name: 'stallBrowseEdit',
      component: () => import('@/views/StallBrowse/edit.vue'),
      meta: { requiresAuth: true }
    },
    {//提交信息
      path: '/submitSuccess',
      name: 'submitSuccess',
      component: () => import('@/views/SubmitSuccess/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/scoring/:id',
      name: 'scoring-detail',
      component: () => import('@/views/ScoringDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/consultation',
      name: 'consultation',
      component: () => import('@/views/ConsultationView.vue'),
      meta: { requiresAuth: true }
    },
    {//二维码扫描
      path: '/scaner',
      name: 'scaner',
      component: () => import('@/views/Scaner/scan.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next('/login')
  // } else if (to.path === '/login' && isAuthenticated) {
  //   next('/')
  // } else {
  //   next()
  // }
  next()
})

export default router