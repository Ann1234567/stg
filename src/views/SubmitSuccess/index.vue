<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-01 16:47:23
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 10:45:04
-->
<template>
  <div class="submit">
    <div class="header-fixed">
      <CommonHeader title="信息提交" />
      <div class="submit-center">
        <van-image width="200" height="200" :src="submitImg" />
        <div class="success-info">提交成功</div>
        <div class="submit-btn">
          <van-button
            block
            type="primary"
            native-type="submit"
            @click="onSubmit"
          >
            返回
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CommonHeader from "@/components/CommonHeader.vue";
import submitImg from "@/assets/images/submit.png";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const router = useRouter();

const onSubmit = () => {
  router.replace("/home");
};
</script>
<style lang="scss" scoped>
.success-info {
  font-size: 1.25rem;
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
