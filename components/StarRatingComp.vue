<script setup>
import { defineProps, computed } from 'vue'
useSeoMeta({
  startHalf:'/icons/star-half.svg',
  star:'/icons/star.svg',
  starFilled:'/icons/star-filled.svg'
})

// Menerima nilai rating sebagai prop
const props = defineProps({
  rating: {
    type: Number,
    required: true,
  }
})

// Menghitung jumlah bintang penuh
const fullStars = computed(() => Math.floor(props.rating))

// Menentukan apakah ada bintang setengah
const halfStar = computed(() => props.rating % 1 >= 0.3)

// Menghitung jumlah bintang kosong
const emptyStars = computed(() => 5 - fullStars.value - (halfStar.value ? 1 : 0))
</script>

<template>
     <div class="flex space-x-1">
        <!-- Bintang penuh -->
        <img v-for="i in fullStars" :key="'full-' + i" src="/icons/star-filled.svg" alt="fullstar" class="w-4 full"/>
        
        <!-- Bintang setengah jika ada -->
        <img v-if="halfStar" src="/icons/star-half.svg" alt="halfstar" class="w-4 half"/>

        <!-- Bintang kosong -->
        <img v-for="i in emptyStars" :key="'empty-' + i" src="/icons/star.svg" alt="emptystar" class="w-4 empty"/>
    </div>
</template>


  