<script setup lang="ts">
    import InfoIcon from '~/public/icons/info.svg';
    import PlusIcon from '~/public/icons/plus.svg';
    import MinusIcon from '~/public/icons/minus.svg';

    const counterGuest = ref<number>(1);
    const counterRoom = ref<number>(1);
    const maxRoomNumber = ref<number>(8);
    const minRoomNumber = ref<number>(1);

    const maxGuestNumber = ref<number>(10);
    const minGuestNumber = ref<number>(1);

    const emit = defineEmits(['getCount']);
   
    const handleCounter = (type:string) => {
       if(type === 'minguest'){
            counterGuest.value -= 1;
            if(counterGuest.value <= minGuestNumber.value){
                counterGuest.value = minGuestNumber.value;
            }
       }else if(type === 'plusguest'){
            counterGuest.value += 1;
            if(counterGuest.value >= maxGuestNumber.value){
                counterGuest.value = maxGuestNumber.value;
            }
       }else if(type === 'minroom'){
           counterRoom.value -= 1;
           if(counterRoom.value <= minRoomNumber.value){
              counterRoom.value = minRoomNumber.value;
           }
       }else{
           counterRoom.value += 1;
           if(counterRoom.value >= maxRoomNumber.value){
              counterRoom.value = maxRoomNumber.value;
           }
       }

       emit('getCount', [counterRoom.value, counterGuest.value]);
    }
</script>
<template>
    <div class="absolute bg-white w-[300px] px-6 shadow-xl rounded-xl border-t top-[90%]">
        <div class="flex justify-between items-center border-b py-4">
            <div class="flex justify-center items-center cursor-pointer hover:bg-gray-100 text-3xl rounded-full">
                <button @click="handleCounter('minguest')">
                    <component :is="MinusIcon" fill="#808080" class="w-8 h-8 m-1"/>
                </button>
            </div>
            <div class="text-center">
                <div>
                    <span v-if="counterGuest === 1">Single Room</span>
                    <span v-if="counterGuest === 2">Double Room</span>
                    <span v-if="counterGuest === 3">Triple Room</span>
                    <span v-if="counterGuest >= 4">Group of {{ counterGuest }}</span>
                </div>
                <div><span class="text-blue-500 font-bold">{{ counterGuest }}</span> guest<span v-if="counterGuest > 1">s</span>/room</div>
                <div class="text-xs text-gray-500 flex justify-normal items-center">
                    <component :is="InfoIcon" fill="#808080" class="w-4 h-4 m-1"/>
                    <div class="ml-1">What about children?</div>
                </div>
            </div>
            <div class="flex justify-center items-center cursor-pointer hover:bg-blue-100 text-3xl rounded-full">
                <button @click="handleCounter('plusguest')">
                    <component :is="PlusIcon" fill="#3b82f6" class="w-8 h-8 m-1"/>
                </button>
            </div>
        </div>
        <div class="flex justify-between items-center py-4">
            <div class="flex justify-center items-center cursor-pointer hover:bg-gray-100 text-3xl rounded-full">
                <button @click="handleCounter('minroom')">
                    <component :is="MinusIcon" fill="#808080" class="w-8 h-8 m-1"/>
                </button>
            </div>
            <div><span class="text-blue-500 font-bold">{{ counterRoom }}</span> Room<span v-if="counterRoom > 1">s</span></div>
            <div class="flex justify-center items-center cursor-pointer hover:bg-blue-100 text-3xl rounded-full">
                <button @click="handleCounter('plusroom')">
                    <component :is="PlusIcon" fill="#3b82f6" class="w-8 h-8 m-1"/>
                </button>
            </div>
        </div> 
    </div> 
</template>