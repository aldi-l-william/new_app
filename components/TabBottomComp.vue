<script setup lang="ts">
const props = defineProps({
    isActive:{
        type:String,
        default:''
    },
    text:{
        type: String,
        default:''
    },
    icon: {  // Prop baru untuk ikon dinamis
        type: [String, Object],  // Bisa berupa path atau komponen ikon
        default: ''
    }
})

</script>
<template>
    <div class="flex justify-normal items-center p-4 " :class="props.isActive === props.text ? 'border-b-2 border-blue-500':''" @click="$emit('activated')">
        <div class="mr-1">
            <component :is="props.icon" :fill="props.isActive === props.text ? '#2563eb': '#808080'"/>
        </div>
        <div :class="props.isActive === props.text ? 'text-blue-500':'text-gray-500'">{{ props.text.toUpperCase() }}</div>
    </div>
</template>

