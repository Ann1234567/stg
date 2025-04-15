/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-07 14:43:35
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 09:26:50
 */
// Token key in localStorage
const TokenKey = 'token'
const SuperTokenKey = 'superToken'

// 获取摊主token
export function getToken() {
  return localStorage.getItem(TokenKey)
}

// 设置摊主token
export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

// 移除摊主token
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

// 获取监管token
export function getSuperToken() {
  return localStorage.getItem(SuperTokenKey)
}

// 设置监管token
export function setSuperToken(token) {
  return localStorage.setItem(SuperTokenKey, token)
}

// 移除监管token
export function removeSuperToken() {
  return localStorage.removeItem(SuperTokenKey)
}