<!--
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-03-31 16:38:03
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-09 11:12:28
-->
<template>
  <div class="regulatoryScoring">
    <div class="header-fixed">
      <CommonHeader back-path="/home" title="监管打分" />
    </div>
    <div class="content">
      <van-form input-align="right">
        <div class="form-card" style="margin-top: 7rem">
          <van-field
            label-width="8rem"
            required
            readonly
            label="请扫描摊位二维码"
          >
            <template #right-icon>
              <van-icon
                name="scan"
                color="#1677FF"
                size="20"
                @click="handleScan"
              />
            </template>
          </van-field>
          <div class="qr-info flex flex-between" v-if="userId">
            <div class="color-black">
              摊主姓名：<span class="color-gray">{{ headData.userName }}</span>
            </div>
            <div class="color-black">
              摊位编号：<span class="color-gray">{{
                headData?.stall?.stallCode
              }}</span>
            </div>
          </div>
        </div>
        <div class="form-card">
          <van-field
            v-model="formData.typeName"
            is-link
            readonly
            required
            name="监管类型"
            label="监管类型"
            placeholder="请选择监管类型"
            @click="showTypePopup = true"
          />
          <van-popup v-model:show="showTypePopup" position="bottom">
            <van-picker
              :columns="
                supervisionTypeOptions.map((item) => ({
                  text: item.dictLabel,
                  value: item.dictValue,
                }))
              "
              @confirm="onTypeConfirm"
              @cancel="showTypePopup = false"
            />
          </van-popup>
          <van-field name="radio" label="评分">
            <template #input>
              <van-rate
                v-model="formData.score"
                :size="15"
                color="#F22D22"
                void-icon="star"
                void-color="#CCCCCC"
              />
            </template>
          </van-field>
          <van-field
            v-model="formData.content"
            rows="4"
            type="textarea"
            required
            maxlength="200"
            placeholder="请输入，不超过200字"
            show-word-limit
            label="监管内容"
          />

          <div class="upload-section">
            <div class="flex flex-between">
              <div class="section-title">上传照片（选填，最多4张）</div>
              <div class="upload-tip">上传的照片不能超过20M</div>
            </div>

            <van-uploader
              v-model="formData.images"
              :max-count="4"
              accept="image/*"
              multiple
              :after-read="afterRead"
            />
          </div>

          <!-- <div class="contact-info">
            <div class="section-title">联系方式</div>
            <van-field
              v-model="formData.name"
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
          </div> -->

          <div class="submit-btn">
            <van-button
              block
              type="primary"
              @click="onSubmit"
              native-type="submit"
            >
              确认提交
            </van-button>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { getTwInfo, saveRegulatoryInfo } from "@/api/regulatoryScoring.js";
import { uploadFiles } from "@/api/applyVendor.js";
import { getDictType } from "@/api/home.js";
import { showToast } from "vant";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const showTypePopup = ref(false);
const userId = ref();
const headData = ref({
  userName: "",
  stall: {
    stallCode: "",
  },
});
const formData = ref({
  type: "",
  content: "",
  images: [],
  name: "",
  phone: "",
});
// 上传状态控制
const isUploading = ref(false);

// 上传处理方法
const afterRead = (fileList) => {
  isUploading.value = true; // 开始上传
  const fileData = new FormData();
  const files = Array.isArray(fileList) ? fileList : [fileList];

  files.forEach((file) => {
    fileData.append("files", file.file);
  });

  uploadFiles(fileData)
    .then((res) => {
      if (res.code === 200) {
        // 保存文件路径
        if (!formData.value.files) {
          formData.value.files = [];
        }
        // 处理返回的文件路径数组
        const filePaths = Array.isArray(res.data) ? res.data : [res.data];
        formData.value.files.push(...filePaths);
      } else {
        showToast(res.msg || "上传失败");
        // 移除上传失败的图片
        files.forEach((file) => {
          const index = formData.value.images.findIndex(
            (img) => img.file === file.file
          );
          if (index !== -1) {
            formData.value.images.splice(index, 1);
          }
        });
      }
    })
    .catch((error) => {
      showToast("上传失败");
      // 移除上传失败的图片
      files.forEach((file) => {
        const index = formData.value.images.findIndex(
          (img) => img.file === file.file
        );
        if (index !== -1) {
          formData.value.images.splice(index, 1);
        }
      });
    })
    .finally(() => {
      isUploading.value = false; // 上传结束
    });
};
const handleScan = () => {
  router.replace({ path: "/scaner", query: { toPath: "/regulatoryScoring" } });
};

const onTypeConfirm = (value) => {
  formData.value.type = value.selectedOptions[0].value;
  formData.value.typeName = value.selectedOptions[0].text;
  showTypePopup.value = false;
};

// 表单提交校验
const onSubmit = () => {
  if (!userId.value) {
    showToast("请先扫描摊位二维码");
    return;
  }
  if (isUploading.value) {
    showToast("图片上传中，请稍候...");
    return;
  }
  if (!formData.value.type) {
    showToast("请选择监管类型");
    return;
  }
  if (!formData.value.score) {
    showToast("请进行评分");
    return;
  }
  if (!formData.value.content) {
    showToast("请输入监管内容");
    return;
  }

  let obj = {
    userId: userId.value,
    type: formData.value.type,
    content: formData.value.content,
    score: formData.value.score,
    files: formData.value.files,
  };

  saveRegulatoryInfo(obj).then((res) => {
    if (res.code === 200) {
      router.replace({
        path: "/submitSuccess",
      });
    }
  });
};
const supervisionTypeOptions = ref([]);
onMounted(async () => {
  if (route.query.userId) {
    userId.value = route.query.userId;
    getTwInfo(userId.value).then((res) => {
      headData.value = res.data;
    });
  }
  const { data } = await getDictType("supervision_type");
  supervisionTypeOptions.value = data;
});
</script>

<style lang="scss" scoped>
.regulatoryScoring {
  height: 100vh;
  background: #e7f0f7;
  .content {
    position: relative;
    padding: 2.75rem 0.75rem 0.75rem 0.75rem;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #eaf3ff 100%),
      url(@/assets/images/jgdf.png) no-repeat;
    background-size: 100% auto;
    background-position: center 2.75rem;
  }

  .upload-section {
    padding: 0.75rem 1rem;
    background: #fff;

    .section-title {
      font-size: 0.875rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .upload-tip {
      font-size: 0.75rem;
      color: #999;
      margin-bottom: 1rem;
    }
  }

  .contact-info {
    margin-top: 0.75rem;

    .section-title {
      padding: 1rem;
      font-size: 0.875rem;
      color: #333;
    }
  }

  .submit-btn {
    margin: 2rem 1rem;
  }

  :deep(.van-field__label) {
    color: #333;

    &::before {
      content: "*";
      color: #ee0a24;
      margin-right: 2px;
    }
  }
}
.form-card {
  background: #fff;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  overflow: hidden;
  :deep(.van-field) {
    padding: 0.75rem 1rem;
  }
}

.qr-info {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
}
</style>
