<script setup lang="ts">
import LocationIcon from '~/public/icons/location.svg';
import CrossCircleIcon from '~/public/icons/cross-circle.svg';

// Reactive state for input focus
import { ref } from 'vue';
const inputValue = ref('');
const isFocused = ref(false);
</script>

<template>
  <div class="input-container">
    <!-- Ikon Kiri -->
    <span class="icon left-icon">
      <component :is="LocationIcon" :fill="isFocused ? '#1a73e8':'#757575'" class="w-6 h-6" />
    </span>

    <!-- Input -->
    <input
      v-model="inputValue"
      type="text"
      @focus="isFocused = true"
      @blur="isFocused = inputValue !== ''"
    />

    <!-- Label (Floating) -->
    <label
      class="floating-label"
      :class="{ active: isFocused || inputValue }"
    >
      Where are you going?
    </label>

    <!-- Ikon Kanan -->
    <span
      v-if="inputValue"
      class="icon right-icon clickable"
      @click="inputValue = ''; isFocused = false"
    >
      <component :is="CrossCircleIcon" :fill="isFocused ? '#1a73e8':'#757575'" class="w-6 h-6" />
    </span>
  </div>
</template>

<style scoped>
/* Container Utama */
.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

/* Input */
.input-container input {
  width: 100%;
  padding: 16px 80px; /* Ruang untuk ikon kiri dan kanan */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-container input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Label (Floating) */
.floating-label {
  position: absolute;
  left: 40px; /* Agar sejajar dengan padding input */
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #888;
  pointer-events: none;
  transition: all 0.3s ease;
}

.floating-label.active {
  top: -2px;
  left: 3px; /* Label naik ke atas */
  font-size: 12px; /* Label lebih kecil */
  color: #007bff; /* Warna biru saat aktif */
  background: #fff; /* Latar belakang putih */
  padding: 0 5px; /* Memberikan padding kecil */
}

/* Ikon */
.icon {
  position: absolute;
  font-size: 18px;
  pointer-events: none;
}

.left-icon {
  left: 10px;
}

.right-icon {
  right: 10px;
}

.clickable {
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.2s;
}

.clickable:hover {
  transform: scale(1.1);
}

/* Responsif */
@media (max-width: 600px) {
  .input-container {
    max-width: 100%;
  }

  .floating-label {
    font-size: 14px;
  }

  .floating-label.active {
    font-size: 10px;
  }
}
</style>
