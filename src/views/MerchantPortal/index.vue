<template>
  <div class="scoring-page">
    <div class="header-fixed"><CommonHeader title="舒摊鬲" /></div>
    <div class="content">
      <div class="information flex flex-between">
        <!-- <div class="img-box" @click="goApply">
          <img src="@/assets/images/jb.png" alt="申请摊主" />
          <div class="text">申请摊主</div>
        </div> -->
        <div class="img-box" @click="goReservation">
          <img src="@/assets/images/ax.png" alt="摊位预约" />
          <div class="text">摊位预约</div>
        </div>
        <div class="img-box" @click="goCheckin">
          <img src="@/assets/images/xj.png" alt="摊位打卡" />
          <div class="text">摊位打卡</div>
        </div>
        <div class="img-box" @click="goProfile">
          <img src="@/assets/images/person.png" alt="个人信息" />
          <div class="text">个人信息</div>
        </div>
      </div>

      <div class="notice-container">
        <div class="notice-section">
          <div class="section-header">
            <div class="notice-icon">
              <img src="@/assets/images/xxtx.png" alt="" />
            </div>
            <div @click="goMore" class="more">更多</div>
          </div>
          <div class="notice-content-scroll">
            <div class="history-list">
              <div
                class="list-item"
                v-for="(item, index) in historyList"
                :key="index"
              >
                <div v-if="item.type == 1" class="title-img">
                  <img src="@/assets/images/tj.png" alt="" />
                </div>
                <div v-if="item.type == 2" class="title-img">
                  <img src="@/assets/images/ts.png" alt="" />
                </div>
                <div v-if="item.type == 3" class="title-img">
                  <img src="@/assets/images/yj.png" alt="" />
                </div>
                <div class="item-header">
                  <div>
                    <span v-if="item.type == 1" class="his-title">{{
                      "审核通知"
                    }}</span>
                    <span v-if="item.type == 2" class="his-title">{{
                      "消费者投诉"
                    }}</span>
                    <span v-if="item.type == 3" class="his-title">{{
                      "违规预警"
                    }}</span>
                  </div>
                  <div class="his-title">{{ item.createTime }}</div>
                </div>
                <div class="item-content">{{ item.content }}</div>
                <div
                  class="item-images"
                  v-if="item.images && item.images.length"
                >
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
              </div>
            </div>
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
import { getToken } from "@/utils/auth";
import { getListPage } from "@/api/merchantPortal.js";
const router = useRouter();
const historyList = ref([]);

const goMore = () => {
  router.push({
    path: "/todoList",
  });
};
const goReservation = () => {
  router.push({
    path: "/stallBrowse",
  });
};
const goCheckin = () => {
  router.push({
    path: "/stallCheck",
  });
};
const goProfile = () => {
  router.push({
    path: "/PersonalInfo",
  });
};
const queryParams = ref({
  size: 10,
  current: 1,
});
const getList = () => {
  getListPage(queryParams.value).then((res) => {
    historyList.value = res.data.records;
  });
};

// 图片预览方法
const handleImagePreview = (images, startPosition = 0) => {
  showImagePreview({
    images,
    startPosition,
    closeable: true,
  });
};
onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.scoring-page {
  height: 100vh;
  background: #f5f5f5;
  .content {
    position: relative;
    padding: 2.75rem 0.75rem 0.75rem 0.75rem;
    height: 100vh;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
      url(@/assets/images/jrbb.png) no-repeat;
    background-size: 100% auto;
    background-position: center 2.75rem;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 防止整体内容滚动 */
  }
  .notice-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: 0.75rem;
  }
  .notice-content-scroll {
    padding: 0 1rem;
    height: calc(50vh - 3rem);
    overflow-y: scroll; /* 改为scroll而不是auto，始终显示滚动条 */
    -webkit-overflow-scrolling: touch;
  }
  .notice-section {
    background: #ffffff;
    box-shadow: 0 0.5rem 2rem 0 rgba(207, 213, 225, 0.33);
    border-radius: 0.5rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    height: 50vh; /* 设置固定高度 */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding:0 1rem;
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

    .history-list {
      .list-item {
        margin-bottom: 0.5rem;
        padding-bottom: .8rem;
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
  width: 100%;
  border-radius: 0.5rem;
  background: #ffffff;
  margin-top: 9.25rem;
  padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .img-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    width: 4rem;

    img {
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .text {
      font-size: 0.75rem;
      color: #333;
      text-align: center;
    }

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
