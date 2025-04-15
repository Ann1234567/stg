<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-03-31 16:29:16
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 15:01:41
-->
<template>
  <div class="header">
    <div class="back-icon" @click="handleBack" v-if="showBack">
      <img :src="backIcon" alt="back" class="arrow-left" />
    </div>
    <!-- 添加搜索框 -->
    <div v-if="showSearch" class="search-box">
      <van-field
        v-model="searchValue"
        placeholder="请输入店铺名称"
        :border="false"
        readonly
        @click="handleSearch"
      >
        <template #right-icon>
          <div @click="handleSearch" class="searchClass">搜索</div>
        </template>
      </van-field>
    </div>
    <!-- 标题和搜索互斥显示 -->
    <div v-else class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import backIcon from "@/assets/images/back-black.png";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  backPath: {
    type: String,
    default: "",
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  showSearch: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["search"]);
const searchValue = ref("");
const router = useRouter();

const handleBack = () => {
  if (props.backPath) {
    router.replace(props.backPath);
  } else {
    router.back();
  }
};

const handleSearch = () => {
  emit("search", searchValue.value);
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  padding: 0 1rem;
  background: #fff;
  position: relative;

  .back-icon {
    position: absolute;
    left: 1rem;
    display: flex;
    align-items: center;

    .arrow-left {
      width: 0.5rem;
    }
  }

  .search-box {
    flex: 1;
    margin: 0 0.5rem;
    :deep(.van-field) {
      padding: .1rem .2rem .1rem 1rem;
      background: #fff;
      border-radius: 2rem;
      border: 1px solid #5399FF;
      font-size: .75rem;
      .van-field__body {
        height: 1.75rem;
      }
    }
  }

  .title {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
  }
}
.searchClass {
  background: linear-gradient(270deg, #4390fb 0%, #81b4ff 100%);
  width: 3rem;
  height: 1.5rem;
  border-radius: 6.25rem;
  color: #fff;
  font-size: .75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
