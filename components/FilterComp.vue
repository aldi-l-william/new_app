<script setup lang="ts">
    import { defineProps } from 'vue'

    const props = defineProps({
        filter_name:{
            type: String
        },
        icon:{
            type: String
        }
    });
</script>
<template>
            <div class="flex justify-start items-center border-gray-300 border rounded-full px-2 py-1">
                <div class="mx-2">
                    <img :src="`/icons/${props.icon}`" alt="spons" class="w-4 h-4" />
                </div>
                <div class="text-sm">
                    {{ props.filter_name }}
                </div>
            </div>
</template>