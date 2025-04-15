<template>
  <div class="qr-scanner">
    <video ref="video" class="scanner-video"></video>
    <canvas ref="canvas" style="display: none;"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import jsQR from 'jsqr';

const video = ref(null);
const canvas = ref(null);
const emit = defineEmits(['result']);

let stream = null;
let animationFrame = null;

const startScanning = async () => {
  try {
    // 添加移动端兼容性处理
    if (!navigator.mediaDevices) {
      navigator.mediaDevices = {};
    }
    
    if (!navigator.mediaDevices.getUserMedia) {
      // 尝试获取移动端专有API
      const getUserMedia = navigator.getUserMedia || 
                         navigator.webkitGetUserMedia || 
                         navigator.mozGetUserMedia || 
                         navigator.msGetUserMedia;
      
      if (!getUserMedia) {
        throw new Error('当前浏览器不支持相机访问，请使用系统自带浏览器或Chrome浏览器');
      }

      navigator.mediaDevices.getUserMedia = function(constraints) {
        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { exact: "environment" }, // 强制使用后置摄像头
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });
    
    video.value.srcObject = stream;
    video.value.setAttribute('playsinline', true); // iOS 需要
    video.value.setAttribute('webkit-playsinline', true); // iOS 需要
    await video.value.play();
    
    requestAnimationFrame(scan);
  } catch (err) {
    console.error('相机访问失败:', err);
    emit('error', err.message);
  }
};

const scan = () => {
  if (!video.value) return;
  
  const canvasElement = canvas.value;
  const context = canvasElement.getContext('2d');
  
  canvasElement.width = video.value.videoWidth;
  canvasElement.height = video.value.videoHeight;
  
  context.drawImage(video.value, 0, 0, canvasElement.width, canvasElement.height);
  
  const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  
  if (code) {
    emit('result', code.data);
  }
  
  animationFrame = requestAnimationFrame(scan);
};

const stopScanning = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
};

onMounted(() => {
  startScanning();
});

onUnmounted(() => {
  stopScanning();
});
</script>

<style scoped>
.qr-scanner {
  width: 100%;
  height: 100%;
  position: relative;
}

.scanner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>