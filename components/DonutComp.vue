<script setup>
import { defineProps, computed } from 'vue'

// Menerima persentase melalui props
const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    validator(value) {
      return value >= 0 && value <= 100; // Memastikan nilai berada di antara 0 dan 100
    }
  }
})

// Mengatur style dinamis berdasarkan persentase dari props
const donutStyle = computed(() => {
  return {
    background: `conic-gradient(#4caf50 0% ${props.percentage}%, #f3f3f3 ${props.percentage}% 100%)`
  };
});
</script>

<template>
    <div class="donut-container">
      <div class="donut" :style="donutStyle">
        <div class="percentage text-green-600 text-xs">{{ percentage }}</div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .donut-container {
    text-align: center;
  }
  
  .donut {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: conic-gradient(#4caf50 0% 0%, #f3f3f3 0% 100%);
    position: relative;
    margin: 0 auto;
    transition: background 0.3s ease;
  }
  
  .donut:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 27px;
    height: 27px;
    background-color: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  .percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
  }
  
  .input-container {
    margin-top: 20px;
  }
  
  .input-container input {
    padding: 8px 15px;
    font-size: 16px;
    width: 60px;
    margin-top: 10px;
  }
  </style>
  