<template>
  <div class="suggestions">
    <div class="header-fixed"><CommonHeader title="咨询建议" /></div>
    <div class="content">
      <van-form input-align="right">
        <div class="form-card" style="margin-top: 6.25rem">
          <van-field
            v-model="formData.typeName"
            is-link
            readonly
            required
            name="诉求类型"
            label="诉求类型"
            placeholder="请选择诉求类型"
            @click="showTypePopup = true"
          />
          <van-popup v-model:show="showTypePopup" position="bottom">
            <van-picker
              :columns="
                tatementTypeOptions.map((item) => ({
                  text: item.dictLabel,
                  value: item.dictValue,
                }))
              "
              @confirm="onTypeConfirm"
              @cancel="showTypePopup = false"
            />
          </van-popup>
        </div>
        <div class="form-card">
          <van-field
            v-model="formData.content"
            rows="4"
            type="textarea"
            required
            maxlength="200"
            placeholder="请输入，不超过200字"
            show-word-limit
            label="诉求内容"
          />

          <div class="upload-section">
            <div class="flex flex-between">
              <div class="section-title">诉求照片</div>
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

          <div class="contact-info">
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
            />
          </div>
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
import { getDictType } from "@/api/home.js";
import { submit } from "@/api/suggestion.js";
import { useRouter } from "vue-router";
import { uploadFiles } from "@/api/applyVendor.js";
import { showToast } from "vant";
const router = useRouter();

const formData = ref({
  type: "", // 默认选中评价
  content: "",
  images: [],
  name: "",
  phone: "",
});
const showTypePopup = ref(false);
const tatementTypeOptions = ref([]);
const onTypeConfirm = (value) => {
  formData.value.type = value.selectedOptions[0].value;
  formData.value.typeName = value.selectedOptions[0].text;
  showTypePopup.value = false;
};
const onSubmit = () => {
  if (isUploading.value) {
    showToast("图片上传中，请稍候...");
    return;
  }
  if (!formData.value.type) {
    showToast("请选择诉求类型");
    return;
  }
  if (!formData.value.content) {
    showToast("请输入诉求内容");
    return;
  }
  if (!formData.value.name) {
    showToast("请输入姓名");
    return;
  }
  if (!formData.value.phone) {
    showToast("请输入手机号");
    return;
  }
  // 添加手机号格式校验
  if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
    showToast("请输入正确的手机号");
    return;
  }
  let obj = {
    type: formData.value.type,
    content: formData.value.content,
    files: formData.value.files,
    phone: formData.value.phone,
    name: formData.value.name,
  };
  submit(obj).then((res) => {
    if (res.code === 200) {
      router.replace({
        path: "/submitSuccess",
      });
    }
  });
};
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
onMounted(async () => {
  const { data } = await getDictType("statement_type");
  tatementTypeOptions.value = data;
});
</script>

<style lang="scss" scoped>
.suggestions {
  height: 100vh;
  background: #e7f0f7;
  .content {
    position: relative;
    padding-top: 2.75rem;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    background: linear-gradient(179deg, transparent 50%, #e1eaf4 100%),
      url(@/assets/images/zxjy.png) no-repeat;
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
    margin: 0rem 1rem 2rem 1rem;
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
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  overflow: hidden;
  :deep(.van-field) {
    padding: 0.75rem 1rem;
  }
}
</style>
