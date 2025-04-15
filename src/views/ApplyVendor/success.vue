<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-02 14:12:30
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 10:51:30
-->
<template>
  <div class="submit">
    <div class="header-fixed">
      <CommonHeader title="信息提交" />
    </div>

    <div class="submit-center">
      <van-image width="142" height="135" :src="submitImg" />
      <div class="success-info">您已提交成功</div>
      <div class="submit-btn">
        <van-button block type="primary" native-type="submit" @click="onSubmit">
          返回
        </van-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import CommonHeader from "@/components/CommonHeader.vue";
import submitImg from "@/assets/images/applySuccess.png";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const onSubmit = () => {
  const toPath = route.query.toPath || "/home";
  router.replace(toPath);
};
</script>
<style lang="scss" scoped>
.success-info {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}
.submit-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  .submit-btn {
    width: 8.75rem;
    height: 3.5rem;
    border-radius: 0.25rem;
    margin-top: 1.25rem;
  }
}
</style>
