<script setup lang="ts">
    import { ref } from 'vue';
    const propertyItemsFromChild = ref({});

    const handleGetData = (data: {id: string, propertyItems:object}) => {
            propertyItemsFromChild.value = data;
            console.log(propertyItemsFromChild.value, 'property value');
    }
</script>
<template>
    <div>testing</div>
</template>