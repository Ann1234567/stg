<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-02 17:40:40
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-14 16:10:30
-->
<template>
  <div class="stallBrowse">
    <div class="header-fixed">
      <CommonHeader title="摊位浏览" />
    </div>
    <div class="content">
      <div class="form-card">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              class="stall-item"
              v-for="(item, index) in stallList"
              :key="index"
              @click="handleClick(item)"
            >
              <div class="stall-title">{{ item.areaName }}</div>
              <div class="stall-info">
                <div class="info-item">
                  <div class="label">摊位数量</div>
                  <div class="value">
                    <span class="font-12"
                      >已申请：<span class="applied">{{
                        item.applyCount
                      }}</span></span
                    >
                    <span class="total">总数：{{ item.count }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <div class="label">
                    <i class="time-icon"></i>
                    <span class="time">
                      {{ item.openTime }}~{{ item.closeTime }}
                    </span>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="info-item">
                  <div class="label">
                    <i class="location-icon"></i>
                    {{ item.address }}
                  </div>
                </div>
              </div>
              <div class="dx-button" @click.stop="navigate(item)">
                <div class="btn-box">
                  <img
                    src="@/assets/images/feiji.png"
                    style="width: 1rem; height: 1rem"
                    alt=""
                  />
                  {{ item.distance }}
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
import { ref, onMounted } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { useRouter } from "vue-router";
import { getStallList } from "@/api/stallBrowse.js";
import { getCurrentLocation, updateStoresDistance } from "@/utils/mapUtils";
import { showToast } from "vant";
const router = useRouter();
const stallList = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const isFirstLoad = ref(true); // 添加首次加载标记
const queryParams = ref({
  current: 1,
  size: 10,
});
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

const getList = () => {
  loading.value = true;
  getStallList(queryParams.value)
    .then((res) => {
      const { records, total } = res.data;
      if (refreshing.value) {
        stallList.value = records;
        refreshing.value = false;
      } else {
        stallList.value.push(...records);
      }
      // 获取列表后更新距离信息
      if (currentLocation.value) {
        stallList.value = updateStoresDistance(
          stallList.value,
          currentLocation.value
        );
      }
      // 判断是否还有更多数据
      if (records.length === 0 || stallList.value.length >= total) {
        finished.value = true;
      }
    })
    .catch(() => {
      if (!refreshing.value) {
        queryParams.value.current -= 1;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(async () => {
  await getLocation(); // 只获取定位
  await getList();
});
const onRefresh = () => {
  refreshing.value = true;
  queryParams.value.current = 1;
  finished.value = false;
  getList();
};
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
const handleClick = (form) => {
  router.push({
    path: `/stallBrowse/edit/${form.areaId}`,
    query: {
      areaName: form.areaName,
      address: form.address,
      openTime: form.openTime,
      closeTime: form.closeTime,
      count: form.count,
      applyCount: form.applyCount,
      longitude: form.longitude,
      latitude: form.latitude,
      distance: form.distance,
    },
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
  padding-top: 2.75rem;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  :deep(.van-pull-refresh) {
    min-height: 100%;
  }
}
.form-card {
  height: calc(100vh - 7rem);
  border-radius: 0.5rem;
  padding: 0.75rem;
  overflow-y: auto;
}
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
</style>
