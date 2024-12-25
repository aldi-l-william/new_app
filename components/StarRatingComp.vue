<script setup lang="ts">
import { computed } from 'vue'
import { useHotelStore } from '~/stores/Hotel';

const hotelStore = useHotelStore();

// Menghitung jumlah bintang penuh
const fullStars = computed(() => Math.floor(hotelStore.propertyHotel?.catalog?.star_rating ?? 0));
const halfStar = computed(() => hotelStore.propertyHotel?.catalog?.star_rating % 1 >= 0.3);
const emptyStars = computed(() => 5 - fullStars.value - (halfStar.value ? 1 : 0));
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


  