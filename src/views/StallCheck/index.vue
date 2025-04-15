<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-04-01 10:41:00
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 17:54:15
-->
<template>
  <div class="hotlist-page">
    <div class="header-fixed">
      <CommonHeader />
    </div>
    <div class="content">
      <div class="bg-box">
        <!-- <div class="number">88-1177</div> -->
        <!-- <img src="@/assets/images/twbh.png" style="width: 5rem" alt="" /> -->
      </div>

      <div class="notice-section">
        <div class="section-header">
          <div class="notice-title">签到日历</div>
          <div class="notice-qd">
            本月出摊 <span class="red">{{ checkDay?.length }}</span> 天
          </div>
        </div>
        <Calendar :checked-days="checkDay" />
        <div class="submit-btn">
          <van-button
            block
            type="primary"
            @click="onSubmit('setup')"
            v-if="!signInInfo?.startTime"
          >
            <div class="flex flex-center">
              <img
                style="width: 1.3rem; height: 1rem"
                src="@/assets/images/photo.png"
                alt=""
              />
              <span class="button-text">拍照出摊</span>
            </div>
          </van-button>
          <van-button
            block
            type="success"
            @click="onSubmit('packup')"
            style="background: #0cd9b5"
            v-else-if="!signInInfo?.endTime"
          >
            <div class="flex flex-center">
              <img
                style="width: 1.3rem; height: 1rem"
                src="@/assets/images/photo.png"
                alt=""
              />
              <span class="button-text">拍照收摊</span>
            </div>
          </van-button>
          <div v-else class="qiandaoClass">今日已全部签到 </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import Calendar from "@/components/Calendar/index.vue";
import {
  listByMonth,
  openStallSignIn,
  closeStallSignIn,
  getSignInInfo,
} from "@/api/stallCheck.js";
import { uploadFile } from "@/api/applyVendor.js";
import { useRouter } from "vue-router";
import { showToast } from "vant";
const router = useRouter();
const fileInput = ref(null);

// 添加拍照上传方法
const handlePhotoUpload = (type) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.capture = "camera";

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 创建 FormData
    const formData = new FormData();
    formData.append("file", file);

    // 调用签到接口
    const res = await uploadFile(formData);
    let signRes;
    if (type === "setup") {
      signRes = await openStallSignIn({ openUrl: res.data.filePath });
    } else if (type === "packup") {
      signRes = await closeStallSignIn({ closeUrl: res.data.filePath });
    }
    if (signRes.code === 200) {
      if (type === "setup") {
        showToast("签到成功");
        router.push({
          path: "/stallCheck/success",
          query: { type: "setup" },
        });
      } else if (type === "packup") {
        showToast("签退成功");
        router.push({
          path: "/stallCheck/success",
          query: { type: "packup" },
        });
      }
    } else {
      showToast(signRes.msg);
    }
  };

  input.click();
};

// 修改按钮点击事件
const onSubmit = (type) => {
  handlePhotoUpload(type);
};
onMounted(() => {
  getList();
  getCheckInfo();
});
const checkDay = ref([]);
const getList = () => {
  listByMonth().then((res) => {
    checkDay.value = res.data;
  });
};
const signInInfo = ref({});
const getCheckInfo = () => {
  getSignInInfo().then((res) => {
    signInInfo.value = res.data;
  });
};
</script>

<style lang="scss" scoped>
.hotlist-page {
  height: 100vh;
  background: #f5f5f5;

  .content {
    position: relative;
    padding-top: 2.75rem;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
      url(@/assets/images/twdk.png) no-repeat;
    background-size: 100% auto;
    background-position: center 2.75rem;
    position: relative;
    .bg-box {
      position: absolute;
      left: 2rem;
      top: 5rem;
      .number {
        color: #333b69;
        font-size: 2rem;
        font-weight: bold;
        font-family: DIN;
      }
    }
  }

  .notice-section {
    margin-top: 9.5rem;
    background: #ffffff;
    box-shadow: 0 0.5rem 2rem 0 rgba(207, 213, 225, 0.33);
    border-radius: 0.5rem;
    padding: 1rem;
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .notice-title {
        font-size: 1rem;
        font-weight: 600;
      }
      .notice-qd {
        font-size: 0.75rem;
      }
    }
  }
}
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
}
.button-text {
  font-size: 1rem;
  margin-left: 1rem;
}
.red {
  color: #f94b30;
}
.qiandaoClass{
  text-align: center;
}
</style>
