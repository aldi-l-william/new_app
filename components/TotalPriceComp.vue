<script setup lang="ts">
   import { defineProps } from 'vue';

   const props = defineProps({
       price_total:{
          type:String
       }
   })
</script>
<template>
    <div class="flex justify-between">
            <div class="text-md text-gray-400">
                Total: {{ props.price_total }}
            </div>
            <div>
                <button class="bg-blue-500 text-white px-6 py-1 rounded">Book Now</button>
            </div>
        </div>
</template>