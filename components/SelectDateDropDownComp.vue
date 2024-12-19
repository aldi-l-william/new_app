<script setup lang="ts">
import { ref } from 'vue';

// Data untuk dropdown
const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1-31
const months = [
  'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i); // 100 tahun ke belakang

// Reactive state untuk menyimpan nilai yang dipilih
const selectedDay = ref('');
const selectedMonth = ref('');
const selectedYear = ref('');
</script>

<template>
  <div class="dropdown-container">
    <!-- Dropdown untuk Hari -->
    <select v-model="selectedDay" class="dropdown">
      <option disabled value="">Day</option>
      <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
    </select>

    <!-- Dropdown untuk Bulan -->
    <select v-model="selectedMonth" class="dropdown">
      <option disabled value="">Month</option>
      <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
    </select>

    <!-- Dropdown untuk Tahun -->
    <select v-model="selectedYear" class="dropdown">
      <option disabled value="">Year</option>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>

    <!-- Hasil -->
    <p>
      Selected Date: 
      <span v-if="selectedDay && selectedMonth && selectedYear">
        {{ selectedDay }}/{{ selectedMonth }}/{{ selectedYear }}
      </span>
      <span v-else>None</span>
    </p>
  </div>
</template>

<style scoped>
.dropdown-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px;
}

.dropdown {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.dropdown:focus {
  border-color: #007bff;
}
</style>
