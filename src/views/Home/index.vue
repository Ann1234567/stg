<template>
  <div class="scoring-page">
    <div class="header-fixed">
      <CommonHeader
        :showBack="false"
        @search="hanldeSearch"
        :show-search="true"
      />
    </div>
    <!-- 
    <van-search
      v-model="searchQuery"
      placeholder="请输入店铺名称"
      shape="round"
      background="transparent"
    >
      <template #right-icon>
        <span class="search-text">搜索</span>
      </template>
    </van-search> -->
    <div class="content">
      <div class="information flex flex-between">
        <van-swipe
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
          vertical
          :height="35"
        >
          <van-swipe-item
            v-for="item in noticeList"
            :key="item.newsId"
            @click="clickDetail(item)"
          >
            <div class="ell flex flex-between">
              <div class="left-content flex">
                <div class="gg-box">
                  <img src="@/assets/images/ggzx.png" alt="" />
                </div>
                <span class="swipe-title">
                  {{ item.title }}
                </span>
              </div>
              <span class="edit">查看详情</span>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="menu-grid">
        <div class="menu-list">
          <div class="menu-item merchant" @click="goPortal">
            <div class="menu-title">商户入口</div>
          </div>
          <div class="menu-item scoring" @click="goLogin">
            <div class="menu-title">监管打分</div>
          </div>
          <div class="menu-item consult" @click="goSuggesions">
            <div class="menu-title">咨询建议</div>
          </div>
          <div class="menu-item evaluate" @click="goComplaint">
            <div class="menu-title">投诉评价</div>
          </div>
        </div>
      </div>
      <div class="notice-container">
        <div class="notice-section">
          <div class="section-header">
            <div class="notice-icon">
              <img src="@/assets/images/tzgg.png" alt="" />
            </div>
            <div @click="goMore" class="more">更多</div>
          </div>
          <div class="notice-content-scroll">
            <van-cell-group :border="false">
              <van-cell
                @click="clickDetail(item)"
                v-for="item in noticesList"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { useRouter } from "vue-router";
import { getNews } from "@/api/hotList.js";
import { getListSlideshow } from "@/api/home.js";
import { getToken } from "@/utils/auth";
const router = useRouter();
const noticesList = ref([]);
const noticeList = ref([]);
onMounted(() => {
  getListnew();
  getNewList();
});
const getNewList = () => {
  let obj = {
    current: 1,
    size: 10,
  };
  getNews(obj).then((res) => {
    noticesList.value = res.data.records;
  });
};
const getListnew = () => {
  getListSlideshow().then((res) => {
    noticeList.value = res.data;
  });
};
const clickDetail = (item) => {
  console.log(item,'===')
  router.push({
    path: `/hotList/detail/${item.newsId}`,
  });
};
const goPortal = () => {
  if (!getToken()) {
    router.push({
      path: "/login",
      query: { toPath: "/merchantPortal" },
    });
    return;
  }
  router.push({
    path: "/merchantPortal",
  });
};
const goLogin = () => {
  router.push({
    path: "/regulatoryScoring/login",
  });
};
const goComplaint = () => {
  router.push({
    path: "/complaint",
  });
};
const goSuggesions = () => {
  router.push({
    path: "/suggestions",
  });
};
const goMore = () => {
  router.push({
    path: "/hotList",
  });
};

//搜索
const hanldeSearch = () => {
  router.push({
    path: "/scoring",
  });
};
</script>

<style lang="scss" scoped>
.scoring-page {
  height: 100vh;
  background: #f5f5f5;
  :deep(.van-search) {
    padding: 0.75rem;
    .van-search__content {
      background: #fff;
      border: 1px solid #e5e7eb;
    }
    .search-text {
      color: #1677ff;
      font-size: 0.875rem;
    }
  }
  .content {
    position: relative;
    padding: 2.75rem 0.75rem 0 0.75rem;
    height: 100vh;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
      url(@/assets/images/home-bg.png) no-repeat;
    background-size: 100% auto;
    background-position: center 2.75rem;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 防止整体内容滚动 */
  }

  /* 新增容器样式 */
  .notice-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-bottom: 0.75rem;
    min-height: 0; /* 这是关键，确保flex子项可以正确收缩 */
  }
  .notice-content-scroll {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* 增强iOS滚动体验 */
    height: 100%; /* 确保有足够的高度可滚动 */
    max-height: calc(100vh - 20rem); /* 设置一个最大高度，根据实际情况调整 */
    padding: 0 1rem;
  }
  .menu-grid {
    margin: 0.8rem 0;
    .menu-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
    .menu-item {
      height: 5rem;
      border-radius: 0.5rem;
      padding: 1rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      &.merchant {
        background: url(@/assets/images/home-img1.png) no-repeat center/cover;
      }

      &.scoring {
        background: url(@/assets/images/home-img2.png) no-repeat center/cover;
      }

      &.consult {
        background: url(@/assets/images/home-img3.png) no-repeat center/cover;
      }

      &.evaluate {
        background: url(@/assets/images/home-img4.png) no-repeat center/cover;
      }

      .menu-title {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
  .notice-section {
    background: #ffffff;
    box-shadow: 0 0.5rem 2rem 0 rgba(207, 213, 225, 0.33);
    border-radius: 0.5rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0; /* 这是关键，确保flex子项可以正确收缩 */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0 1rem;
      .notice-icon {
        width: 3.5rem;
      }
      .more {
        color: #222229;
        font-size: 0.75rem;
        width: 2.5rem;
        text-align: right;
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
.information {
  height: 2.2rem;
  width: 100%;
  border-radius: 0.5rem;
  background: #ffffff;
  margin-top: 9.25rem;
  font-size: 0.75rem;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  .notice-swipe {
    flex: 1;
    height: 2.2rem;
    line-height: normal;  // 修改这里
    .van-swipe__track {
      display: flex;      // 修改这里
      align-items: center;// 新增这里
    }
  }
  .ell {
    display: flex;
    align-items: center;  // 新增这里
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;  // 修改为100%
    .left-content {
      flex: 1;
      overflow: hidden;
      margin-right: 10px;
    }
    .gg-box {
      width: 3.5rem;
    }
    .swipe-title {
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .edit {
      color: #4883ff;
      font-weight: 500;
      white-space: nowrap;
    }
  }
}
.img-box {
  width: 8.25rem;
  position: absolute;
  left: 1.5rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.moresj {
  top: 8rem;
}
.storerz {
  top: 6rem;
}
.van-swipe-item{
  display: flex;
  align-items: center
}
</style>
