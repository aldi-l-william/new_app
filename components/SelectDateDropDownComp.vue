<script setup lang="ts">
import { ref } from 'vue';

// Reactive state untuk menyimpan tanggal yang dipilih
const selectedDate = ref(null);
</script>

<template>
  <div class="calendar-container">
    <!-- V-Calendar -->
    <VCalendar
      v-model="selectedDate"
      is-inline
      class="calendar"
      :attributes="[
        {
          key: 'today',
          highlight: true
        }
      ]"
    />

    <!-- Menampilkan Tanggal yang Dipilih -->
    <p v-if="selectedDate">Selected Date: {{ selectedDate }}</p>
  </div>
</template>

<style scoped>
.calendar-container {
  margin: 20px 0px;
}

.calendar {
  max-width: 350px;
  font-size: 16px;
}

.calendar button {
  border-radius: 5px;
  padding: 10px;
  background-color: #f5f5f5;
}

.calendar button:hover {
  background-color: #007bff;
  color: white;
}
</style>
