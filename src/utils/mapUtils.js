// 计算两点之间的距离
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 地球半径，单位公里
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 格式化距离显示
export const formatDistance = (distance) => {
  return distance < 1
    ? `${Math.round(distance * 1000)}米`
    : `${distance.toFixed(1)}公里`;
};

// 格式化时间显示
export const formatDuration = (duration) => {
  return duration < 60
    ? `${duration}分钟`
    : `${Math.floor(duration / 60)}小时${duration % 60}分钟`;
};

// 获取当前位置
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (typeof BMap === "undefined") {
      reject(new Error("Baidu Maps API is not loaded"));
      return;
    }

    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          resolve({
            latitude: r.point.lat,
            longitude: r.point.lng,
          });
        } else {
          reject(new Error("定位失败：" + this.getStatus()));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

// 更新商铺列表的距离信息
export const updateStoresDistance = (stores, currentLocation) => {
  const walkingSpeed = 4; // 步行速度，公里/小时
  
  return stores.map((store) => {
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      store.latitude,
      store.longitude
    );
    const duration = Math.round((distance / walkingSpeed) * 60);

    return {
      ...store,
      distance: formatDistance(distance),
      duration: formatDuration(duration),
    };
  });
};