<script setup lang="ts">
import { ref, watch } from 'vue';
// Reactive state untuk menyimpan tanggal yang dipilih
const selectedDate = ref({start: new Date(), end: new Date()});

const emit = defineEmits(['closeCalendar','selectedDate']);

watch(selectedDate, (newValue, oldValue) => {
    // Format tanggal menjadi string yang lebih mudah dibaca
    const startDate = newValue.start;
    const endDate = newValue.end;
    
    const startFormatted = new Intl.DateTimeFormat('id-ID', { day: 'numeric' }).format(startDate);
    const endFormatted = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(endDate);

    const formattedDate = `${startFormatted} - ${endFormatted}`;

    console.log(formattedDate, "date");
    
    // Emit the formatted string
    emit('selectedDate', formattedDate);
    emit('closeCalendar');
})

</script>

<template>
  <div class="calendar-container absolute top-[90%]">
    <VDatePicker v-model.range="selectedDate"/>
  </div>
</template>

<style scoped>
.calendar-container {
  margin: 0px 6px;
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
