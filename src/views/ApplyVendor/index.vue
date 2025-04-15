<template>
  <div class="applyVendor">
    <div class="header-fixed"><CommonHeader title="申请摊主" /></div>
    <div class="content">
      <div class="background-images">
        <img src="@/assets/images/Vendor.png" class="vendor-img" alt="" />
        <img src="@/assets/images/sqcwtz.png" class="sqcwtz-img" alt="" />
        <img src="@/assets/images/rzsqb.png" class="rzsqb-img" alt="" />
      </div>
      <div class="form-card">
        <!-- <div class="form-tip">您是首次登录，请填写个人信息</div> -->
        <div class="form-scroll-container">
          <van-form input-align="right" class="form-container">
            <van-field
              v-model="formData.stallName"
              required
              label="摊位名称"
              placeholder="请填写您的摊位名称"
            />
            <van-field
              v-model="formData.businessTypeName"
              label="经营种类"
              placeholder="请选择经营种类"
              :label-width="100"
              readonly
              clickable
              @click="showBusinessPicker = true"
            />
            <van-popup v-model:show="showBusinessPicker" position="bottom">
              <van-picker
                :columns="
                  businessTypeOptions.map((item) => ({
                    text: item.dictLabel,
                    value: item.dictValue,
                  }))
                "
                @confirm="confirmBusiness"
                @cancel="showBusinessPicker = false"
              />
            </van-popup>
            <van-field
              v-model="formData.userName"
              required
              label="姓名"
              placeholder="请填写"
            />

            <van-field
              v-model="formData.phone"
              required
              label="手机号"
              placeholder="请填写"
              :rules="[
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
              ]"
            />
            <van-field
              v-if="route.query.toPath != '/personalInfo'"
              v-model="formData.password"
              required
              label="密码"
              type="password"
              placeholder="请填写"
              :rules="[{ required: true, message: '请输入密码' }]"
            />
            <van-field
              v-if="route.query.toPath != '/personalInfo'"
              v-model="confirmPassword"
              required
              label="确认密码"
              type="password"
              placeholder="请再次输入密码"
              :rules="[
                { required: true, message: '请确认密码' },
                {
                  validator: (val) => val === formData.password,
                  message: '两次输入的密码不一致',
                },
              ]"
            />
            <van-field
              v-model="formData.idNumber"
              required
              label="身份证号码"
              placeholder="请填写"
              :rules="[
                {
                  pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                  message: '请输入正确的身份证号',
                },
              ]"
            />

            <div class="upload-section">
              <div class="upload-title">
                <div class="section-title required">上传身份证正反面</div>
                <div class="upload-tip">
                  <img src="@/assets/images/jytg.png" alt="" />
                  身份证照片仅用于实名认证
                </div>
              </div>

              <div class="id-card-upload">
                <van-uploader
                  v-model="FrontList"
                  :max-count="1"
                  :after-read="afterReadFront"
                >
                  <div class="upload-box">
                    <img src="@/assets/images/zheng.png" alt="" />
                    <div class="upload-text-box">
                      <div class="upload-text">头像面</div>
                      <div class="upload-desc">上传您的身份证头像面</div>
                    </div>
                  </div>
                </van-uploader>
              </div>
              <div class="id-card-upload" style="margin-top: 0.5rem">
                <van-uploader
                  v-model="BackList"
                  :max-count="1"
                  :after-read="afterReadBack"
                >
                  <div class="upload-box">
                    <img src="@/assets/images/fan.png" alt="" />
                    <div class="upload-text-box">
                      <div class="upload-text">国徽面</div>
                      <div class="upload-desc">上传您的身份证国徽面</div>
                    </div>
                  </div>
                </van-uploader>
              </div>
            </div>
            <div class="upload-section">
              <div class="upload-title">
                <div class="section-title required">健康证</div>
              </div>

              <div class="id-card-upload">
                <van-uploader
                  v-model="healthProveList"
                  :max-count="1"
                  :after-read="afterReadHealth"
                >
                  <div class="upload-box">
                    <img src="@/assets/images/health.png" alt="" />
                    <div class="upload-text-box">
                      <div class="upload-text">健康证</div>
                      <div class="upload-desc">上传您的健康证照片</div>
                    </div>
                  </div>
                </van-uploader>
              </div>
            </div>
            <van-field
              v-model="formData.isVeteran"
              label="是否退伍军人"
              :label-width="100"
              readonly
              clickable
              @click="showVeteranPicker = true"
            />
            <van-popup v-model:show="showVeteranPicker" position="bottom">
              <van-picker
                :columns="veteranOptions"
                @confirm="confirmVer"
                @cancel="showVeteranPicker = false"
              />
            </van-popup>

            <van-field
              v-model="formData.isDisabled"
              label="是否残疾人"
              readonly
              clickable
              @click="showDisabledPicker = true"
            />
            <van-popup v-model:show="showDisabledPicker" position="bottom">
              <van-picker
                :columns="disabledOptions"
                @confirm="confirmDis"
                @cancel="showDisabledPicker = false"
              />
            </van-popup>
            <div class="submit-btn">
              <van-button block type="primary" @click="onSubmit">
                提交审核
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { uploadFile, getUserInfo } from "@/api/applyVendor.js";
import { getDictType } from "@/api/home.js";
import { ref, onMounted } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { useRouter, useRoute } from "vue-router";
import { register, update } from "@/api/login.js";
const router = useRouter();
const route = useRoute();
import { showToast } from "vant";
const formData = ref({
  stallName: "",
  phone: "",
  isVeteran: "否",
  isDisabled: "否",
});
const FrontList = ref([]);
const BackList = ref([]);
const healthProveList = ref([]);
const veteranOptions = [
  { text: "是", value: "是" },
  { text: "否", value: "否" },
];
const disabledOptions = [
  { text: "是", value: "是" },
  { text: "否", value: "否" },
];
const businessTypeOptions = ref([]);
const showBusinessPicker = ref(false);
const confirmVer = (value) => {
  formData.value.isVeteran = value.selectedValues[0];
  showVeteranPicker.value = false;
};
const confirmDis = (value) => {
  formData.value.isDisabled = value.selectedValues[0];
  showDisabledPicker.value = false;
};
// 添加控制弹出层的变量
const showVeteranPicker = ref(false);
const showDisabledPicker = ref(false);
const confirmPassword = ref("");
//提交
const onSubmit = async () => {
  // 校验必填字段
  if (!formData.value.userName) {
    showToast("请填写姓名");
    return;
  }
  if (!formData.value.phone) {
    showToast("请填写手机号");
    return;
  }
  if (!formData.value.idNumber) {
    showToast("请填写身份证号码");
    return;
  }
  if (!formData.value.password) {
    showToast("请填写密码");
    return;
  }
  if (!confirmPassword.value && route.query.toPath != "/personalInfo") {
    showToast("请确认密码");
    return;
  }
  if (
    confirmPassword.value !== formData.value.password &&
    route.query.toPath != "/personalInfo"
  ) {
    showToast("两次输入的密码不一致");
    return;
  }
  if (!formData.value.idCardFront) {
    showToast("请上传身份证正面照片");
    return;
  }
  if (!formData.value.idCardBack) {
    showToast("请上传身份证反面照片");
    return;
  }
  if (!formData.value.healthProve) {
    showToast("请上传健康证照片");
    return;
  }

  try {
    let res;
    if (route.query.toPath == "/personalInfo") {
      res = await update(formData.value);
    } else {
      res = await register(formData.value);
    }
    if (res.code === 200) {
      router.push({
        path: "/applyVendor/success",
        query: { toPath: route.query.toPath || "/home" },
      });
    } else {
      showToast(res.message || "提交失败");
    }
  } catch (error) {
    console.log(error, "error");
    showToast("提交失败，请重试");
  }
};
onMounted(async () => {
  try {
    //经营种类字典表
    const { data } = await getDictType("business_type");
    businessTypeOptions.value = data;
    if (route.query.toPath == "/personalInfo") {
      await getUserInfos();
    }
  } catch (error) {
    showToast("获取数据失败");
  }
});
//获取个人信息
const getUserInfos = () => {
  getUserInfo().then((res) => {
    formData.value = res.data;
    // 根据 businessType 查找对应的 businessTypeName
    const businessType = businessTypeOptions.value.find(
      (item) => item.dictValue == res.data.businessType
    );
    console.log(businessType, "businessType");
    if (businessType) {
      formData.value.businessTypeName = businessType.dictLabel;
    }

    BackList.value = [{ url: `/stg${res.data.idCardBack}` }];
    FrontList.value = [{ url: `/stg${res.data.idCardFront}` }];
    healthProveList.value = [{ url: `/stg${res.data.healthProve}` }];
  });
};
const confirmBusiness = (value) => {
  formData.value.businessType = value.selectedOptions[0].value;
  formData.value.businessTypeName = value.selectedOptions[0].text;
  showBusinessPicker.value = false;
};
const afterReadFront = (files, detail) => {
  const form = new FormData();
  form.append("file", files.file);
  uploadFile(form)
    .then((res) => {
      if (res.code === 200) {
        formData.value.idCardFront = res.data.filePath;
      } else {
        FrontList.value = [];
        showToast(res.message || "上传失败");
      }
    })
    .catch((error) => {
      FrontList.value = [];
      showToast("上传失败");
    });
};

const afterReadBack = (files, detail) => {
  const form = new FormData();
  form.append("file", files.file);
  uploadFile(form)
    .then((res) => {
      if (res.code === 200) {
        formData.value.idCardBack = res.data.filePath;
      } else {
        BackList.value = [];
        showToast(res.message || "上传失败");
      }
    })
    .catch((error) => {
      BackList.value = [];
      showToast("上传失败");
    });
};
const afterReadHealth = (files, detail) => {
  const form = new FormData();
  form.append("file", files.file);
  uploadFile(form)
    .then((res) => {
      if (res.code === 200) {
        formData.value.healthProve = res.data.filePath;
      } else {
        healthProveList.value = [];
        showToast(res.message || "上传失败");
      }
    })
    .catch((error) => {
      healthProveList.value = [];
      showToast("上传失败");
    });
};
</script>

<style lang="scss" scoped>
.applyVendor {
  height: 100vh;
  background: #f5f5f5;
  .content {
    position: relative;
    padding-top: 2.75rem;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
      url(@/assets/images/sqtz.png) no-repeat;
    background-size: 100% auto;
    background-position: center 2.75rem;

    .background-images {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      pointer-events: none;
      .vendor-img {
        width: 8.1rem;
        position: absolute;
        left: 2.5rem;
        top: 5.2rem;
      }

      .sqcwtz-img {
        width: 8.1rem;
        position: absolute;
        left: 2.5rem;
        top: 6.7rem;
      }

      .rzsqb-img {
        width: 5rem;
        position: absolute;
        left: 2.5rem;
        top: 8.1rem;
      }
    }

    .form-container {
      position: relative;
      z-index: 1;
    }
  }
  .submit-btn {
    margin: 0rem 1rem 2rem 1rem;
  }

  :deep(.van-field__label) {
    color: #333;
    font-size: 0.875rem;
    &::before {
      content: "*";
      color: #ee0a24;
      margin-right: 2px;
    }
  }
}
.form-card {
  background: #fff;
  border-radius: 0.5rem;
  margin: 9.4rem 0.75rem 0.75rem 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 12rem); /* 调整最大高度，根据实际情况调整 */

  .form-tip-fixed {
    padding: 0.75rem 1rem;
    color: #165dff;
    font-size: 0.75rem;
    display: flex;
    font-weight: 500;
    align-items: center;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 10;

    &::before {
      content: "";
      width: 0.75rem;
      height: 0.75rem;
      background: url("@/assets/images/info.png") no-repeat center/contain;
      margin-right: 0.5rem;
    }
  }

  .form-scroll-container {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    max-height: calc(100vh - 15rem);
  }
  .form-tip {
    padding: 0.75rem 1rem;
    color: #165dff;
    font-size: 0.75rem;
    display: flex;
    font-weight: 500;
    align-items: center;

    &::before {
      content: "";
      width: 0.75rem;
      height: 0.75rem;
      background: url("@/assets/images/info.png") no-repeat center/contain;
      margin-right: 0.5rem;
    }
  }

  .required::before {
    content: "*";
    color: #ee0a24;
    margin-right: 2px;
  }

  .upload-section {
    padding: 1rem;
    position: relative;
    .upload-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .section-title {
      font-size: 0.875rem;
      color: #333;
    }
    .upload-tip {
      font-size: 0.75rem;
      color: #999;
      display: flex;
      img {
        width: 0.75rem;
        height: 0.75rem;
        margin-top: 0.1rem;
        margin-right: 0.1rem;
      }
    }

    .upload-box {
      width: 100%;
      height: 8rem;
      background: #f4faff;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      img {
        height: 100%;
      }
      .upload-text-box {
        display: flex;
        flex-direction: column;
        padding-left: 1rem;
      }
      .upload-text {
        font-size: 1.25rem;
        color: #333;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .upload-desc {
        font-size: 0.75rem;
        color: #999;
      }
      .van-uploader__preview-image {
        width: 100%;
      }
    }
  }
}
</style>
