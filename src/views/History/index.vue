<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-01 15:30:27
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 14:07:38
-->
<template>
  <div class="history">
    <div class="header-fixed">
      <CommonHeader title="历史信息" />
    </div>
    <div class="content">
      <div class="form-card">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            class="list-wrapper"
            finished-text="已加载全部"
            @load="onLoad"
          >
            <div
              class="list-item"
              v-for="(item, index) in historyList"
              :key="index"
            >
              <div v-if="item.type === '消费者评价'" class="title-img">
                <img src="@/assets/images/pj.png" alt="" />
              </div>
              <div v-if="item.type === '消费者投诉'" class="title-img">
                <img src="@/assets/images/ts.png" alt="" />
              </div>
              <div class="item-header">
                <div>
                  <span class="his-title">{{ item.type }}</span>
                </div>
                <div class="his-title">{{ item.time }}</div>
              </div>
              <div class="item-content">{{ item.content }}</div>
              <div class="item-images" v-if="item.images && item.images.length">
                <van-image
                  v-for="(img, imgIndex) in item.images"
                  :key="imgIndex"
                  :src="img"
                  width="60"
                  height="60"
                  radius="4"
                  @click="handleImagePreview(item.images, imgIndex)"
                />
              </div>
              <div class="divider"></div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { showImagePreview } from "vant"; // 图片预览
import { getHistoryList } from "@/api/history";
import { showToast } from "vant"; // Toast提示
import { useRoute } from "vue-router";
const route = useRoute();
const historyList = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const isFirstLoad = ref(true); // 添加首次加载标记
const queryParams = ref({
  userId: "",
  current: 1,
  size: 10,
});
// 加载数据
const onLoad = () => {
  if (refreshing.value) return;
  if (isFirstLoad.value) {
    isFirstLoad.value = false;
    loading.value = false;
    return;
  }
  queryParams.value.current += 1;
  getList();
};
// 刷新数据
const onRefresh = () => {
  refreshing.value = true;
  queryParams.value.current = 1;
  finished.value = false;
  historyList.value = [];
  getList();
};
// 图片预览方法
const handleImagePreview = (images, startPosition = 0) => {
  showImagePreview({
    images,
    startPosition,
    closeable: true,
  });
};
const getList = () => {
  getHistoryList(queryParams.value)
    .then((res) => {
      const { records, total } = res.data;
      if (refreshing.value) {
        historyList.value = records;
        refreshing.value = false;
      } else {
        historyList.value.push(...records);
      }
      // 判断是否加载完成
      finished.value = historyList.value.length >= total;
    })
    .catch(() => {
      showToast("加载失败");
    })
    .finally(() => {
      loading.value = false;
    });
};
onMounted(() => {
  queryParams.value.userId = route.query.userId;
  getList();
});
</script>
<style lang="scss" scoped>
.history {
  min-height: 100vh;
  background: #f5f5f5;
  .content {
    padding-top: 2.75rem;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
      url(@/assets/images/history.png) no-repeat;
    background-size: 100% auto;
    background-position: center 2.75rem;
    :deep(.van-pull-refresh) {
      min-height: 100%;
    }
  }
  .form-card {
    margin: 6rem 0.75rem 0.75rem 0.75rem;
    height: calc(100vh - 10rem);
    background: #fff;
    border-radius: 0.5rem;
    padding: 0.75rem;
    overflow-y: auto;
    :deep(.van-field) {
      padding: 0.75rem 1rem;
    }
  }
  .history-list {
    .list-item {
      margin-bottom: 0.5rem;
      padding-bottom: 1rem;
      padding-left: 1.5rem;
      border-bottom: 1px solid #eee;
      list-style: none;
      position: relative;
      .title-img {
        width: 1.25rem;
        height: 1.25rem;
        position: absolute;
        left: 0;
        top: 0.25rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:last-child {
        border-bottom: none;
      }
      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.25rem;
        .his-title {
          font-size: 0.75rem;
          font-weight: 500;
          color: #333436;
        }
      }

      .item-content {
        color: #666666;
        font-size: 0.75rem;
        margin-bottom: 0.25rem;
      }

      .item-images {
        display: flex;
        gap: 0.5rem;
      }
    }

    .list-bottom {
      text-align: center;
      color: #999;
      font-size: 0.875rem;
      padding: 1rem 0;
    }
  }
}
</style>
