<template>
  <div class="login-page">
    <div class="header">
      <div class="back-icon">
        <!-- <img :src="backIcon" alt="location" class="arrow-left" /> -->
      </div>
    </div>

    <div class="login-content">
      <div class="login-header">
        <h2 class="login-title">请登录</h2>
      </div>

      <div class="login-form">
        <van-field
          v-model="formData.account"
          placeholder="请输入账号"
          :border="false"
          class="form-item"
          left-icon="user-o"
        />
        <van-field
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          :border="false"
          class="form-item"
          left-icon="lock"
        />
        <button class="login-button" @click="handleLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import backIcon from "@/assets/images/back-white.png";
import { login } from "@/api/regulatoryScoring.js";
import { setSuperToken } from "@/utils/auth";

const router = useRouter();
const route = useRoute();
const formData = ref({
  account: "",
  password: "",
});

// 检查是否已登录
const checkLogin = () => {
  const superToken = localStorage.getItem('superToken');
  if (superToken) {
    router.push({ path: '/regulatoryScoring' });
  }
};

const handleLogin = () => {
  if (!formData.value.account || !formData.value.password) {
    return;
  }
  login(formData.value).then((res) => {
    setSuperToken(res.data);
    router.push({path:'/regulatoryScoring'})
  });
};

onMounted(() => {
  checkLogin();
});
</script>

<style lang="scss" scoped>
.login-page {
  background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
    url(@/assets/images/login-bg.png) no-repeat;
  background-size: 100% auto;
  background-position: top center;
  height: auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.75rem;
  width: 100%;
  padding: 0 1rem;
}
.back-icon {
  position: absolute;
  left: 1rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.75rem;
  .arrow-left {
    height: 0.75rem;
  }
}

.login-content {
  padding: 0rem 1.5rem;
  margin-top: 14.6rem;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;

  .login-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }
}

.login-form {
  .form-item {
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    background: #f5f7fa;

    :deep(.van-field__left-icon) {
      font-size: 1.25rem;
      color: #999;
    }

    :deep(.van-field__control) {
      font-size: 1rem;
      color: #333;

      &::placeholder {
        color: #999;
      }
    }
  }
}

.login-button {
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  border: none;
  border-radius: 0.5rem;
  background: #4080ff;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;

  &:active {
    background: #3672e6;
  }
}
</style>
