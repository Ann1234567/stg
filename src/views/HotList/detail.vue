<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-01 10:51:45
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-14 16:47:28
-->
<template>
  <div class="hotlist-detail">
    <div class="header-fixed"><CommonHeader /></div>
    <div v-if="loading" class="loading-container">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <div v-else class="content">
      <div class="title">{{ form.title }}</div>
      <div class="issueTime">{{ form.issueTime }}</div>
      <van-image
        :src="'/stg' + form.backgroundImg"
        radius="8"
        class="notice-image"
      />
      <div class="notice-content" v-html="form.content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import CommonHeader from "@/components/CommonHeader.vue";
import { getNewsEdit } from "@/api/hotList.js";
const route = useRoute();
const newsId = ref(null);
const loading = ref(false);
const form = ref({
  title: "",
  issueTime: "",
  backgroundImg: "",
  content: "",
});

onMounted(() => {
  newsId.value = route.params.newsId;
  getDetail();
});

const getDetail = async () => {
  try {
    loading.value = true;
    const res = await getNewsEdit(newsId.value);
    form.value = await res.data;
  } catch (error) {
    console.error("获取详情失败:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.hotlist-detail {
  min-height: 100vh;
  background: #fff;
  .content {
    padding: 2.5rem 1rem 1rem 1rem;
    background: #fff;
  }
  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333436;
  }
  .issueTime{
    font-size: 0.75rem;
    color: #333333;
    margin-top: 0.5rem;
  }
  .notice-image{
    width: 100%;
  }
  .notice-content{
    font-size: 0.9rem;
    color: #333436;
    margin-top: 1rem;
  }
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #fff;
  }
}
</style>
