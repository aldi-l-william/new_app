<script setup lang="ts">
    import BoxChecklistIcon from '~/public/icons/box-checklist.svg';
    import { defineProps } from 'vue';
    
    const props = defineProps({
        cancel_policy_description:{
            type:String
        }
    })

</script>

<template>
    <div class="flex justify-start items-center text-green-500">
            <div class="mr-2">
                <component
                    :is="BoxChecklistIcon"
                    :fill="'#238636'" 
                    class="w-6 h-6"
                />
            </div> 
            <div>
                {{ props.cancel_policy_description }}
            </div> 
        </div>
</template>