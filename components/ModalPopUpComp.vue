<script setup lang="ts">
  import { CarouselImageComp } from '#components';
 
</script>
  
<template>
    <div>
      <!-- Modal Overlay and Content with transitions -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      >
        <div 
          class="bg-white rounded-lg p-6 w-[900px] h-[550px] transition-transform duration-300 ease-in-out transform"
        >
        <div class="grid grid-cols-12">
            <div class="col-span-7 border border-black">
               <CarouselImageComp/>
            </div>
            <div class="col-span-5 border border-black"></div>
        </div>
          
        </div>
      </div>
    </div>
</template>
  
  