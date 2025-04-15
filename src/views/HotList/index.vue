<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-01 10:41:00
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 14:25:08
-->
<template>
  <div class="hotlist-page">
    <div class="header-fixed"><CommonHeader /></div>
    <div class="content">
      <div class="notice-section">
        <div class="section-header">
          <div class="notice-icon">
            <img src="@/assets/images/tzgg.png" alt="" />
          </div>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell-group :border="false">
              <van-cell
                @click="clickDetail(item)"
                v-for="item in notices"
                :key="item.newsId"
                class="notice-item"
              >
                <template #icon>
                  <van-image
                    :src="'/stg' + item.backgroundImg"
                    width="120"
                    height="80"
                    radius="8"
                    class="notice-image"
                  />
                </template>
                <template #title>
                  <div class="notice-content">
                    <div class="notice-title">{{ item.title }}</div>
                    <div class="notice-info">
                      <div class="notice-stats">
                        <span class="date">
                          <i class="time-icon"></i>
                          <span class="view-count">{{ item.issueTime }}</span>
                        </span>
                      </div>
                      <div class="notice-stats">
                        <span class="views">
                          <i class="view-icon"></i>
                          <span class="view-count">{{
                            item.browseAmount
                          }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </template>
              </van-cell>
            </van-cell-group>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { useRouter } from "vue-router";
import { getNews } from "@/api/hotList.js";

const router = useRouter();
// 分页相关变量声明
const current = ref(1);
const size = ref(10);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const notices = ref([]);
const isFirstLoad = ref(true); // 添加首次加载标记

// 获取列表数据
const getNewList = async () => {
  try {
    const obj = {
      current: current.value,
      size: size.value,
    };
    const res = await getNews(obj);
    const newList = res.data.records;

    if (refreshing.value) {
      notices.value = newList;
      refreshing.value = false;
    } else {
      notices.value = [...notices.value, ...newList];
    }

    // 判断是否还有更多数据
    if (newList.length < size.value) {
      finished.value = true;
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    finished.value = true;
  }
};
// 上拉加载
const onLoad = () => {
  if (refreshing.value) return;
  if (isFirstLoad.value) {
    isFirstLoad.value = false;
    loading.value = false;
    return;
  }
  current.value += 1;
  getNewList();
};

// 下拉刷新
const onRefresh = () => {
  finished.value = false;
  loading.value = true;
  current.value = 1;
  getNewList();
};
onMounted(() => {
  getNewList();
});
const clickDetail = (item) => {
  router.push({
    path: `/hotList/detail/${item.newsId}`,
  });
};
</script>

<style lang="scss" scoped>
.hotlist-page {
  height: 100vh;
  background: #f5f5f5;
  .content {
    position: relative;
    padding: 2.75rem 0.75rem 0.75rem 0.75rem;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
      url(@/assets/images/hotList-bg.png) no-repeat;
    background-size: 100% auto;
    background-position: center 2.75rem;
  }
  .notice-section {
    margin-top: 8.5rem;
    background: #ffffff;
    box-shadow: 0 0.5rem 2rem 0 rgba(207, 213, 225, 0.33);
    border-radius: 0.5rem;
    padding: 1rem 0;
    height: calc(100vh - 12rem); /* 设置固定高度 */
    display: flex;
    flex-direction: column;
    .section-header {
      position: sticky;
      top: 0;
      background: #fff;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0 1rem 1rem 1rem;
      .notice-icon {
        width: 3.5rem;
      }
    }

    :deep(.van-cell) {
      padding: 0.75rem 0;
      align-items: flex-start;
    }

    :deep(.van-cell__title) {
      font-size: 0.875rem;
      color: #333;
      margin-left: 0.75rem;
    }

    :deep(.van-cell__label) {
      margin-top: 0.5rem;
      color: #999;
    }
    .van-cell-group {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    :deep(.van-list) {
      min-height: 100%;
    }
    :deep(.van-pull-refresh) {
      overflow: auto;
      flex: 1;
      padding: 0 1rem;
    }
  }
  :deep(.notice-item) {
    padding: 0.75rem 0;
    .notice-image {
      margin-right: 0.75rem;
    }
    .notice-content {
      .notice-title {
        font-size: 0.875rem;
        color: #333;
        line-height: 1.25rem;
        margin-bottom: 0.75rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .notice-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.75rem;
        color: #999;
        .notice-stats {
          display: flex;
          gap: 0.5rem;
          .views,
          .date {
            display: flex;
            align-items: center;
            .view-icon {
              width: 0.75rem;
              height: 0.75rem;
              background: url(@/assets/images/view.png) no-repeat center/contain;
              margin-right: 0.25rem;
            }
            .view-count {
              color: #999;
            }
            .time-icon {
              width: 0.75rem;
              height: 0.75rem;
              background: url(@/assets/images/time.png) no-repeat center/contain;
              margin-right: 0.25rem;
            }
          }
        }
      }
    }
  }
}
</style>
