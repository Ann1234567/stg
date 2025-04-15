<template>
  <div class="scoring-page">
    <div class="header-fixed">
      <CommonHeader />
    </div>
    <div class="content">
      <div class="information flex flex-center">
        <div class="info-title" v-if="formData?.stall?.stallCode">
          今日已预约摊位编号
        </div>
        <div class="info-title" v-else>今日尚未预约</div>
        <div class="number" v-if="formData?.stall?.stallCode">
          {{ formData?.stall?.stallCode }}
        </div>
      </div>
      <div class="notice-section">
        <div class="section-header">
          <div class="notice-icon">
            <img src="@/assets/images/sbxx.png" alt="" />
          </div>
          <div @click="updateInfo" class="updateInfo">
            <van-icon name="edit" style="margin-right: 0.3rem" />修改信息
          </div>
        </div>

        <van-cell-group :border="false">
          <van-cell title="摊位名称" :value="formData.stallName" />
          <van-cell title="姓名" :value="formData.userName" />
          <van-cell title="身份证" class="idCard">
            <template #value>
              <div class="value-box">
                <span class="view-photo" @click="viewImage('id')"
                  >查看照片</span
                >
                <span>{{ formData.idNumber }}</span>
                <van-icon name="arrow" />
              </div>
            </template>
          </van-cell>
          <van-cell title="健康证">
            <template #value>
              <div class="value-box">
                <span class="view-photo" @click="viewImage('health')"
                  >查看照片</span
                >
              </div>
            </template>
          </van-cell>
          <van-cell
            title="经营种类"
            :value="businessType"
            is-link
            @click="showBusinessPicker = true"
          />
          <van-cell title="是否退伍军人" :value="formData.isVeteran" is-link />
          <van-cell title="是否残疾人" :value="formData.isDisabled" is-link />

          <van-popup v-model:show="showBusinessPicker" position="bottom">
            <van-picker
              :columns="businessColumns"
              @confirm="onBusinessConfirm"
              @cancel="showBusinessPicker = false"
            />
          </van-popup>

          <van-popup v-model:show="showVeteranPicker" position="bottom">
            <van-picker
              :columns="yesNoColumns"
              @confirm="onVeteranConfirm"
              @cancel="showVeteranPicker = false"
            />
          </van-popup>

          <van-popup v-model:show="showDisabledPicker" position="bottom">
            <van-picker
              :columns="yesNoColumns"
              @confirm="onDisabledConfirm"
              @cancel="showDisabledPicker = false"
            />
          </van-popup>
        </van-cell-group>

        <div class="qr-section" v-if="formData.qrCodeUrl">
          <div class="qr-code">
            <div class="qrImg">
              <img :src="formData.qrCodeUrl" alt="二维码" />
            </div>
          </div>
          <div class="qr-text">
            <span>经营者二维码</span>
            <span class="save-btn">长按保存</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUserInfo } from "@/api/applyVendor.js";
import { ref, onMounted } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { useRouter } from "vue-router";
import { showImagePreview } from "vant";
const router = useRouter();
onMounted(() => {
  getUserInfos();
});
const formData = ref({});
//获取个人信息
const getUserInfos = () => {
  getUserInfo().then((res) => {
    formData.value = res.data;
    formData.value.qrCodeUrl = `/stg${res.data.qrCodePath}`;
  });
};
const updateInfo = () => {
  router.push({
    path: "/applyVendor",
    query: {
      toPath: "/personalInfo",
    },
  });
};
const viewImage = (type) => {
  const images = [];

  if (type === "id") {
    images.push(
      `/stg${formData.value.idCardFront}`,
      `/stg${formData.value.idCardBack}`
    );
  } else if (type === "health") {
    images.push(`/stg${formData.value.healthProve}`);
  }

  showImagePreview({
    images,
    closeable: true,
    showIndex: true,
  });
};

const businessType = ref("生鲜、冷冻食品");
const isVeteran = ref("否");
const isDisabled = ref("否");

const showBusinessPicker = ref(false);
const showVeteranPicker = ref(false);
const showDisabledPicker = ref(false);

const businessColumns = [
  { text: "熟食" },
  { text: "水果" },
  { text: "蔬菜" },
  { text: "其他" },
  { text: "生鲜、冷冻食品" },
];
const yesNoColumns = [{ text: "是" }, { text: "否" }];
const onBusinessConfirm = (value) => {
  businessType.value = value.selectedOptions[0].text;
  showBusinessPicker.value = false;
};

const onVeteranConfirm = (value) => {
  isVeteran.value = value.selectedOptions[0].text;
  showVeteranPicker.value = false;
};

const onDisabledConfirm = (value) => {
  isDisabled.value = value.selectedOptions[0].text;
  showDisabledPicker.value = false;
};
</script>

<style lang="scss" scoped>
.scoring-page {
  height: 100vh;
  background: #f5f5f5;
  .content {
    position: relative;
    padding-top: 2.75rem;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
      url(@/assets/images/information.png) no-repeat;
    background-size: 100% auto;
    background-position: center 2.75rem;
    position: relative;
  }
  .notice-section {
    background: #ffffff;
    box-shadow: 0 0.5rem 2rem 0 rgba(207, 213, 225, 0.33);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 0.6rem 0.5rem 0.5rem 0.5rem;
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      .notice-icon {
        width: 3.5rem;
      }
      .updateInfo {
        color: #4883ff;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }
  }
}
.information {
  border-radius: 0.5rem;
  background: #ffffff;
  margin: 6.25rem 0.5rem 0.5rem 0.5rem;
  padding: 0.5rem;
  .info-title {
    font-weight: 500;
    font-size: 1rem;
    color: #333333;
    margin-right: 0.6rem;
  }
  .number {
    color: #4883ff;
    font-weight: 500;
    font-size: 1.5rem;
  }
}
:deep(.van-cell) {
  padding: 0.875rem 0;

  .van-cell__title {
    color: #666;
    font-size: 0.875rem;
  }

  .van-cell__value {
    color: #333;
    font-size: 0.875rem;
  }
}
.qr-section {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .qr-code {
    width: 10rem;
    height: 10rem;
    border: 1px solid #e5e7eb;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background: #c8e7f6;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .qrImg {
    width: 8.75rem;
    height: 9rem;
    padding: 0.65rem;
    background: url(@/assets/images/qr-border.png) no-repeat;
    background-size: 100% auto;
  }
  .qr-text {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #333b69;
    font-weight: 600;
    .save-btn {
      color: #4883ff;
    }
  }
}
:deep(.van-cell) {
  padding: 0.875rem 0;

  .van-cell__title {
    color: #666;
    font-size: 0.875rem;
    flex: 0 0 5.5rem;
  }

  .van-cell__value {
    color: #333;
    font-size: 0.875rem;
    flex: 1;
    text-align: right;
  }
}

.value-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end; // 添加这行使内容靠右
  .view-photo {
    color: #4883ff;
    font-size: 0.75rem;
    order: -1;
    cursor: pointer;
    white-space: nowrap;
  }
}
</style>
