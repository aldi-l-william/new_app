<script setup lang="ts">
    import { defineProps } from 'vue';
    const props = defineProps({
        rate_nightly:{
            type:String
        }
    })
</script>
<template>
    <div>
        <span class="font-semibold">{{ props.rate_nightly }}</span> / night *
    </div>
</template>