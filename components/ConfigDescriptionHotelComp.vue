<script setup lang="ts">
   import { defineProps } from 'vue';
   import ViewsIcon from '~/public/icons/view.svg';
   import NoViewsIcon from '~/public/icons/noviews.svg';

   const props = defineProps({
      isCondition:{
        type: Boolean,
        default:true
      },
      settingName:{
        type: String
      }
   })
</script>
<template>
    <div class="p-3 font-semibold flex justify-between border-b">
        <div>{{ settingName }}</div>
        <div class="flex justify-center items-center hover:bg-gray-100 rounded-full">
            <component :is="props.isCondition ? ViewsIcon : NoViewsIcon" fill="" class="w-4 h-4 m-1"/>
        </div>               
    </div>
</template>