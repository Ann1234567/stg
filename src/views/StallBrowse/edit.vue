<template>
  <div class="stallBrowse">
    <div class="header-fixed">
      <CommonHeader title="摊位详情" />
    </div>
    <div class="content">
      <div class="stall-list">
        <div class="stall-item">
          <div class="stall-title">{{ form?.areaName }}</div>
          <div class="stall-info">
            <div class="info-item">
              <div class="label">摊位数量</div>
              <div class="value">
                <span class="font-12"
                  >已申请：<span class="applied">{{
                    form?.applyCount
                  }}</span></span
                >
                <span class="total">总数：{{ form?.count }}</span>
              </div>
            </div>
            <div class="divider"></div>
            <div class="info-item">
              <div class="label">
                <i class="time-icon"></i>
                <span class="time">
                  {{ form?.openTime }}~{{ form?.closeTime }}
                </span>
              </div>
            </div>
            <div class="info-item">
              <div class="label">
                <i class="location-icon"></i>
                {{ form?.address }}
              </div>
            </div>
          </div>
          <div class="dx-button" @click="navigate(form)">
            <div class="btn-box">
              <img
                src="@/assets/images/feiji.png"
                style="width: 1rem; height: 1rem"
                alt=""
              />
              {{ form.distance }}
            </div>
          </div>
        </div>
      </div>

      <!-- 摊位详情部分 -->
      <div class="stall-detail">
        <div class="detail-title">
          <div class="notice-icon">
            <img src="@/assets/images/twxq.png" alt="" />
          </div>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="detail-list">
              <div
                class="detail-item"
                v-for="(item, index) in stallDetailList"
                :key="index"
              >
                <div class="item-number">
                  {{ String(index + 1).padStart(2, "0") }}
                </div>
                <div class="item-content">
                  <div class="item-code">摊位编号：{{ item.stallCode }}</div>
                  <div class="item-status">
                    <span>可否预约：</span>
                    <span
                      :class="item.applyStatus ? 'can-book' : 'cannot-book'"
                      >{{ item.applyStatus ? "可预约" : "不可预约" }}</span
                    >
                  </div>
                  <div class="item-tags">
                    <span class="tag tag-fire" v-if="item.isFire === 1">禁明火</span>
                    <span class="tag tag-danger" v-if="item.isDetonation === 1"
                      >禁易燃易爆</span
                    >
                  </div>
                </div>
                <div class="item-action">
                  <button
                    class="book-btn"
                    :class="{ disabled: !isInBusinessHours }"
                    :disabled="!isInBusinessHours"
                    @click="goApply(item)"
                  >
                    预约
                  </button>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getStallEdit, subscribe } from "@/api/stallBrowse.js";
import { getCurrentLocation } from "@/utils/mapUtils";
import { showDialog } from "vant";
const isFirstLoad = ref(true); // 添加首次加载标记
const router = useRouter();
const route = useRoute();
const form = ref({});
onMounted(() => {
  queryParams.value.areaId = route.params.areaId;
  form.value = { ...route.query };
  getLocation();
  getList();
});
// 判断当前时间是否在营业时间内
const isInBusinessHours = computed(() => {
  if (!form.value?.openTime || !form.value?.closeTime) return false;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMinute] = form.value.openTime.split(":").map(Number);
  const [closeHour, closeMinute] = form.value.closeTime.split(":").map(Number);

  const openTimeMinutes = openHour * 60 + openMinute;
  const closeTimeMinutes = closeHour * 60 + closeMinute;

  return currentTime >= openTimeMinutes && currentTime <= closeTimeMinutes;
});
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const queryParams = ref({
  current: 1,
  size: 10,
  areaId: "",
});
// 摊位详情列表数据
const stallDetailList = ref([]);
const getList = () => {
  loading.value = true;
  getStallEdit(queryParams.value)
    .then((res) => {
      const { records, total } = res.data;
      if (refreshing.value) {
        stallDetailList.value = records;
        refreshing.value = false;
      } else {
        stallDetailList.value.push(...records);
      }
      if (records.length === 0 || stallDetailList.value.length >= total) {
        finished.value = true;
      }
    })
    .catch(() => {
      if (!refreshing.value) {
        queryParams.value.current -= 1;
      }
      showToast("加载失败");
    })
    .finally(() => {
      loading.value = false;
    });
};

const onRefresh = () => {
  refreshing.value = true;
  queryParams.value.current = 1;
  finished.value = false;
  getList();
};

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
const currentLocation = ref(null); // 添加当前位置存储

// 更新获取位置的函数
const getLocation = async () => {
  try {
    currentLocation.value = await getCurrentLocation();
  } catch (error) {
    console.error(error.message);
    showToast("获取位置信息失败");
  }
};
//调用地图
const navigate = (store) => {
  console.log(store, "store");
  if (!currentLocation.value) {
    console.error("未获取到当前位置");
    return;
  }
  // 使用经纬度坐标进行导航
  const baiduMapUrl = `https://api.map.baidu.com/direction?origin=${currentLocation.value.latitude},${currentLocation.value.longitude}&destination=${store.latitude},${store.longitude}&mode=walking&region=全国&output=html&src=webapp.baidu.openAPIdemo`;
  window.open(baiduMapUrl, "_blank");
};
//预约
const goApply = (item) => {
  showDialog({
    title: "预约确认",
    message: `确定要预约摊位编号：${item.stallCode} 吗？`,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(() => {
      // 用户点击确定
      subscribe({ stallId: item.stallId }).then((res) => {
        router.push("/merchantPortal");
      });
    })
    .catch(() => {
      // 用户点击取消
    });
};
</script>

<style lang="scss" scoped>
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
}
.stallBrowse {
  background: #e8f0f7;
  height: 100vh;
}
.content {
  height: calc(100vh - 2.75rem);
  padding: 0.5rem 0.75rem 1rem 0.75rem;
  margin-top: 2.75rem;
  box-sizing: border-box;
}
.stall-list {
  margin-top: 1rem;
  .stall-item {
    background: url(@/assets/images/map.png) no-repeat;
    background-size: 100% auto;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
    position: relative;
  }
  .stall-title {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.75rem;
  }
  .stall-info {
    .info-item {
      margin-bottom: 0.5rem;
      &:last-child {
        margin-bottom: 0;
      }
      .label {
        color: #666;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        i {
          width: 1rem;
          height: 1rem;
          margin-right: 0.25rem;
          margin-bottom: 0.1rem;
          &.time-icon {
            width: 0.75rem;
            height: 0.75rem;
            background: url(@/assets/images/time1.png) no-repeat center/contain;
          }
          &.location-icon {
            width: 0.75rem;
            height: 0.75rem;
            background: url(@/assets/images/location1.png) no-repeat
              center/contain;
          }
        }
      }
      .value {
        display: flex;
        gap: 1rem;
        font-size: 0.75rem;
        .applied {
          color: #ff6b6b;
          font-weight: 500;
        }
        .total {
          color: #333;
          font-weight: 500;
        }
      }
      .time {
        color: #4883ff;
      }
    }
  }
}
.dx-button {
  border: 1px solid #4883ff;
  border-radius: 6.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #4883ff;
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;
  position: absolute;
  right: 1.5rem;
  top: 3rem;
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}

/* 新增摊位详情样式 */
.stall-detail {
  margin-top: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  padding-top: 1rem;
  :deep(.van-pull-refresh) {
    height: calc(100vh - 24rem);
    overflow: auto;
    padding: 0 1rem;
  }
  .detail-title {
    font-size: 1rem;
    font-weight: bold;
    color: #4883ff;
    margin-bottom: 1rem;
    position: sticky;
    background: #fff;
    top: 0;
    padding: 0 1rem;
    .notice-icon {
      width: 3.5rem;
    }
  }

  .detail-list {
    height: 100%;
    overflow: visible;
    .detail-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }

      .item-number {
        width: 1.5rem;
        height: 1rem;
        background: #62cab9;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        margin-left: -1rem;
        flex-shrink: 0;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        margin-top: 0.1rem;
        z-index: 100;
      }

      .item-content {
        flex: 1;
        margin-left: 0.5rem;
        .item-code {
          font-size: 0.875rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        .item-status {
          font-size: 0.75rem;
          color: #666;
          margin-bottom: 0.5rem;
          .can-book {
            color: #34c759;
          }
          .cannot-book {
            color: #ff6b6b;
          }
        }
        .item-tags {
          display: flex;
          gap: 0.5rem;
          .tag {
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;

            &.tag-fire {
              background: #fff5e6;
              color: #ff9500;
            }

            &.tag-danger {
              background: #ffe6f0;
              color: #ff2d55;
            }
          }
        }
      }

      .item-action {
        margin-top: 1.5rem;
        .book-btn {
          background: #4883ff;
          color: #fff;
          border: none;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          cursor: pointer;
          width: 4rem;
          height: 2rem;
          &.disabled {
            background: #ccc;
            cursor: not-allowed;
          }
        }
      }
    }
  }
}
</style>
