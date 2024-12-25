<script setup lang="ts">
    import { defineProps } from 'vue'

    const props = defineProps({
        filter_name:{
            type: String
        },
        icon:{
            type: String
        },
        fillColor:{
            type: String,
            default:'#808080'
        }
    });
</script>
<template>
            <div class="flex justify-start items-center border-gray-300 border rounded-full px-2 py-1">
                <div class="mx-2">
                    <component :is="props.icon" class="w-4 h-4" :fill="props.fillColor" />
                </div>
                <div class="text-sm">
                    {{ props.filter_name }}
                </div>
            </div>
</template>