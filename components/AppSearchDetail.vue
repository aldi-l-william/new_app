<script setup lang="ts">
    import SearchIcon from '~/public/icons/search.svg';
    import { InputSearchCustomComp } from '#components';
</script>
<template>
    <div class="max-1032-container flex justify-between">
       <div>
           <InputSearchCustomComp />
       </div>
       <div>
           <SelectDateDropDownComp />
       </div>
       <div>
           <input type="text" />
       </div>
       <div>
          <button class="flex justify-start items-center bg-blue-500 text-white px-6 py-4 rounded-md">
            <div class="mr-2">
                <component :is="SearchIcon" :fill="'white'" />
            </div>
            <div>
                Search
            </div>
          </button>
       </div>  
    </div>
</template>