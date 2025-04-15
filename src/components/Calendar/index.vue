<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-body">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="day"
        :class="{
          checked: checkedDays.includes(day),
          current: day === currentDay,
          empty: !day,
        }"
      >
        <div class="day-text">{{ day || "" }}</div>
        <img
          v-if="checkedDays.includes(day)"
          src="@/assets/images/qdsuccess.png"
          alt=""
          style="width:1rem;height:1rem;"
        />
        <div v-else style="width:1rem;height:1rem;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  year: {
    type: Number,
    default: () => new Date().getFullYear(),
  },
  month: {
    type: Number,
    default: () => {
      const currentDate = new Date();
      return currentDate.getMonth() + 1;  // 修改这里，确保返回1-12的月份
    },
  },
  checkedDays: {
    type: Array,
    default: () => [],
  },
});

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
const currentDay = new Date().getDate();

const days = computed(() => {
  // 获取当月第一天是星期几
  const firstDay = new Date(props.year, props.month - 1, 1).getDay();
  
  // 获取当月天数
  const lastDayOfMonth = new Date(props.year, props.month, 0);
  const totalDays = lastDayOfMonth.getDate();
  
  console.log('当前月份:', props.month);
  console.log('当月天数:', totalDays);
  
  const result = new Array(42).fill("");

  for (let i = 0; i < totalDays; i++) {
    result[firstDay + i] = i + 1;
  }

  return result;
});
</script>

<style lang="scss" scoped>
.calendar {
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;

  .calendar-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 1rem;

    .weekday {
      text-align: center;
      color: #999;
      font-size: 0.875rem;
    }
  }

  .calendar-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;

    .day {
      position: relative;
      height: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1rem;

      &.empty {
        pointer-events: none;
      }

      &.checked {
        .check-mark {
          position: absolute;
          bottom: 0.25rem;
          color: #165dff;
          font-size: 0.75rem;
        }
      }

      &.current {
        .day-text {
          background: #165dff;
          color: #fff;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .check-mark {
          color: #fff;
        }
      }
    }
  }
}
</style>
