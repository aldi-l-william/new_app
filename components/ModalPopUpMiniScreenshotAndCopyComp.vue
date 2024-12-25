<script setup lang="ts">
    import { defineProps } from 'vue';
    
    const props = defineProps({
        index:{
            type:Number,
            required:true
        }
    })
</script>
<template>
    <div class="border border-gray-300 w-[200px] rounded-lg p-2 right-0 bg-white">
        <div class="px-1 py-3 text-xs">
           ACTIONS
        </div>

        <div @click="$emit('copy', props.index)" class="flex justify-normal cursor-pointer hover:bg-gray-100 px-1 py-3 rounded-md">
            <div class="mr-3">
                <img src="/icons/copy.svg" alt="spon coret" class="w-6 h-6" />
            </div>
            <div>
                Copy offer
            </div>
        </div>
        
        <div @click="$emit('screenshot', props.index)" class="flex justify-normal cursor-pointer hover:bg-gray-100 px-1 py-3 rounded-md">
            <div class="mr-3">
                <img src="/icons/screenshot.svg" alt="spon coret" class="w-6 h-6" />
            </div>
            <div>
                Screnshot offer
            </div>
        </div>
    </div>
</template>