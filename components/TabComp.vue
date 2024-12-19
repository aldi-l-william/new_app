<script setup lang="ts">
   import { defineProps, ref } from 'vue'
   import BadgeIcon from '~/public/icons/badge.svg'
   import BoxIcon from '~/public/icons/box.svg'
   import InfoIcon from '~/public/icons/info.svg' 
   
   const props = defineProps({
       icon:{
          type: String
       },
       tabName:{
          type: String
       },
       alt:{
          type:String
       },
       color:{
         type:String
       },
       isActive:{
         type: Boolean,
         default: false
       }
   });

   // Objek untuk memetakan nama ke komponen ikon
    const icons = {
        badge: BadgeIcon,
        box: BoxIcon,
        info: InfoIcon,
    }

    // Pilih ikon dinamis berdasarkan props.icon
    const DynamicIcon = computed(() => icons[props.icon] || null)
   
</script>
<template>
    <div class="flex justify-start items-center mx-2 px-4 py-3 border-blue-500 cursor-pointer" :style="props.isActive ? `border-top:3px solid ${props.color};`:''">
        <div class="mr-2">
            <!-- Render ikon secara dinamis -->
            <component
                v-if="DynamicIcon"
                :is="DynamicIcon"
                :fill="isActive ? props.color: 'black'" 
                class="w-6 h-6"
            />
            <div v-else>
                <p>Icon not found</p>
            </div>
        </div>
        <div class="text-sm font-semibold" :style="props.isActive ? `color:${props.color}`:''">
            {{ props.tabName }}
        </div>
    </div>
</template>
