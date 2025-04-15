<template>
  <div class="scoring-page">
    <div class="header-fixed"><CommonHeader title="舒摊鬲" /></div>
    <div class="search-box">
      <i class="search-icon">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </i>
      <input
        v-model="paramsQuery.stallName"
        type="text"
        placeholder="请输入摊位名称"
        class="search-input"
      />
      <span class="search-text" @click="handleSearch('search')">搜索</span>
    </div>

    <div class="store-list">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        :head-height="80"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="store in storesList" :key="store.id" class="store-card">
            <!-- 原有的 store-card 内容保持不变 -->
            <div class="store-header">
              <img :src="storeIcon" alt="store" class="store-icon" />
              <span class="store-name">{{ store.stallName }}</span>
              <img
                :src="phoneIcon"
                alt="phone"
                class="phone-icon"
                @click="callPhone(store.phone)"
              />
            </div>
            <div class="flex flex-between">
              <div>
                <div class="store-id">摊位号：{{ store.stallCode }}</div>
                <div
                  class="store-status flex flex-justify-center"
                  :class="{
                    'status-active': store.businessStatus === '营业中',
                  }"
                >
                  {{ store.businessStatus }}
                </div>
              </div>
              <button
                class="rate-button flex flex-center"
                @click="handleRate(store)"
              >
                投诉评价
              </button>
            </div>
            <div class="divider"></div>
            <div class="store-location flex flex-align-center">
              <img :src="locationIcon" alt="location" class="location-icon" />
              <span class="address-text">{{ store.address }}</span>
              <img
                :src="navigationIcon"
                alt="navigation"
                class="navigation-icon"
                @click="navigate(store)"
              />
            </div>
            <div class="distance-text">
              距您步行{{ store.distance }}，需要{{ store.duration }}
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { getCurrentLocation, updateStoresDistance } from "@/utils/mapUtils";
import { getList } from "@/api/home.js";
const paramsQuery = ref({
  current: 1,
  size: 10,
  stallName: "",
});
const storesList = ref([]);
const currentLocation = ref(null);
import storeIcon from "@/assets/images/store.png";
import phoneIcon from "@/assets/images/phone.png";
import locationIcon from "@/assets/images/location.png";
import navigationIcon from "@/assets/images/navigation.png";
import CommonHeader from "@/components/CommonHeader.vue";
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const handleSearch = (search) => {
  if (search === "search") {
    paramsQuery.value.current = 1;
    storesList.value = [];
    isFirstLoad.value = true; // 搜索时重置首次加载标记
  }
  finished.value = false;
  loading.value = true;
  getList(paramsQuery.value).then((res) => {
    const { records, total } = res.data;
    if (refreshing.value) {
      storesList.value = records;
      refreshing.value = false;
    } else {
      storesList.value = storesList.value.concat(records);
    }
    // 获取列表后更新距离信息
    if (currentLocation.value) {
      storesList.value = updateStoresDistance(
        storesList.value,
        currentLocation.value
      );
      console.log("更新距离后：", storesList.value); // 添加这一行以查看更新后的 storesList.value
    }
    loading.value = false;
    if (storesList.value.length >= total) {
      finished.value = true;
    }
  });
};

// 更新获取位置的函数
const getLocation = async () => {
  try {
    currentLocation.value = await getCurrentLocation();
    console.log("获取到的当前位置：", currentLocation.value); // 添加这一行以查看获取到的 currentLocation.value
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(async () => {
  await getLocation(); // 先获取位置
  await handleSearch(); // 再获取列表
});
// 添加刷新方法
const onRefresh = () => {
  refreshing.value = true;
  paramsQuery.value.current = 1;
  finished.value = false;
  handleSearch();
};
// 添加首次加载标记
const isFirstLoad = ref(true);
// 添加加载更多方法
const onLoad = () => {
  if (refreshing.value) return;
  if (isFirstLoad.value) {
    isFirstLoad.value = false;
    loading.value = false;
    return;
  }
  paramsQuery.value.current += 1;
  handleSearch();
};

const callPhone = (phone) => {
  window.location.href = `tel:${phone}`;
};
const navigate = (store) => {
  if (!currentLocation.value) {
    console.error("未获取到当前位置");
    return;
  }

  // 使用经纬度坐标进行导航
  const baiduMapUrl = `https://api.map.baidu.com/direction?origin=${currentLocation.value.latitude},${currentLocation.value.longitude}&destination=${store.latitude},${store.longitude}&mode=walking&region=全国&output=html&src=webapp.baidu.openAPIdemo`;

  window.open(baiduMapUrl, "_blank");
};

const handleRate = (store) => {
  router.push({
    path: "/complaint",
    query: {
      userId: store.userId,
    },
  });
};
</script>

<style lang="scss" scoped>
.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.05);
  margin: 0.5rem 0;
}
.scoring-page {
  height: 100vh;
  background: #f5f7fa;
}

.header {
  .title {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
  }

  .more-icon {
    position: absolute;
    right: 2.5rem;
  }

  .share-icon {
    position: absolute;
    right: 1rem;
  }
}

.search-box {
  border-radius: 0.5rem;
  overflow: hidden;
  position: fixed;
  top: 3.5rem;
  left: 0.75rem;
  width: calc(100vw - 1.5rem);
  z-index: 2;
  .search-input {
    width: calc(100% - 3.5rem);
    height: 2.25rem;
    padding-left: 2.5rem;
    font-size: 0.875rem;
    border: none;
    background: transparent;
    background: #f2f3f5;
    &::placeholder {
      color: #999;
    }
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);

    .icon {
      width: 1rem;
      height: 1rem;
      color: #4390fb;
    }
  }

  .search-text {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #4080ff;
    font-size: 0.875rem;
  }
}
.store-list {
  margin-top: 6.2rem;
  height: calc(100vh - 7rem);
  overflow-y: auto;
  position: relative;
  z-index: 1;
  :deep(.van-list) {
    height: calc(100vh - 7rem);
    overflow: visible;
  }
  :deep(.van-pull-refresh__track) {
    overflow: visible;
  }
}
.store-card {
  position: relative;
  margin: 0 0.75rem 0.75rem;
  padding: 0.75rem;
  background: #fff;
  border-radius: 0.5rem;
  background: linear-gradient(179deg, #eaf3ff 2%, #fcfeff 29%);
  box-shadow: 0px 8px 32px 0px rgba(1, 119, 251, 0.08);
  .store-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .store-icon {
    width: 1rem;
    height: 1rem;
  }

  .store-name {
    font-size: 0.9375rem;
    color: #333;
  }

  .phone-icon {
    width: 1rem;
    height: 1rem;
  }

  .store-id {
    font-size: 0.8125rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .store-location {
    margin-bottom: 0.25rem;
  }

  .location-icon {
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 0.25rem;
  }

  .address-text {
    font-size: 0.8125rem;
    color: #666;
    flex: 1;
  }

  .navigation-icon {
    width: 1rem;
    height: 1rem;
    margin-top: 0.8rem;
  }

  .distance-text {
    font-size: 0.75rem;
    color: #999;
    margin-left: 1.125rem;
    margin-top: 0.25rem;
  }

  .store-status {
    font-size: 0.75rem;
    border-radius: 0.125rem;
    border: 1px solid rgba(151, 151, 151, 0.35);
    color: #979797;
    background: #fff;
    width: 3.5rem;
    &.status-active {
      border: 1px solid rgba(52, 199, 89, 0.44);
      color: #34c759;
    }
  }

  .rate-button {
    background: #4080ff;
    color: #fff;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    border: none;
    width: 4rem;
    height: 2rem;
  }
}
</style>
