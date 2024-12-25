<script setup lang="ts">
   import { CarouselPhotosComp } from '#components';
</script>
<template>
    <div class="relative">
        <CarouselPhotosComp @closed="$emit('closed')"/>
    </div>   
</template>