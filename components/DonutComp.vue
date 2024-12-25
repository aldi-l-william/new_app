<script setup>
import { defineProps, computed } from 'vue';

// Menerima persentase dan ukuran melalui props
const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    validator(value) {
      return value >= 0 && value <= 100; // Memastikan nilai berada di antara 0 dan 100
    }
  },
  size: {
    type: Number,
    required: true,
    validator(value) {
      return value > 0; // Memastikan ukuran lebih besar dari 0
    }
  }
});

// Mengatur style dinamis berdasarkan persentase dari props
const donutStyle = computed(() => {
  return {
    background: `conic-gradient(#4caf50 0% ${props.percentage}%, #f3f3f3 ${props.percentage}% 100%)`,
    width: `${props.size}px`,
    height: `${props.size}px`,
    borderRadius: '50%',
    position: 'relative', // untuk memastikan inner circle bisa diposisikan di dalam donut
  };
});

// Menghitung ukuran ring (lingkaran putih di tengah donut)
const ringSize = computed(() => {
  return props.size * 0.8; // Menentukan ukuran inner ring 60% dari donut's size
});
</script>

<template>
  <div class="donut-container">
    <!-- Donut Outer Circle -->
    <div class="donut" :style="donutStyle">
      <!-- Inner Circle (Lubang Tengah) -->
      <div class="inner-ring" :style="{ width: ringSize + 'px', height: ringSize + 'px' }"></div>
      <!-- Percentage text in the center -->
      <div class="percentage text-green-600 text-xs">{{ props.percentage }}</div>
    </div>
  </div>
</template>

<style scoped>
.donut-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.donut {
  position: relative;
  margin: 0 auto;
  transition: background 0.3s ease;
  display: inline-block;
}

.inner-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: white; /* Warna latar belakang inner ring */
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}
</style>
