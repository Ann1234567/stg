/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-03-31 12:59:22
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-08 17:08:23
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [vue(), basicSsl()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/stg': {
        target: 'https://192.168.0.155:8080',
        changeOrigin: true,
        secure: false,  // 添加此行，禁用证书验证
        rewrite: (path) => path.replace(/^\/stg/, '/stg')
      }
    }
  }
})