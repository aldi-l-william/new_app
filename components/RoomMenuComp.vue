<template>
    <div @click="$emit('copy')" class="cursor-pointer mx-2 hover:bg-gray-100 px-1 py-1 rounded-full">
      <img src="/icons/copy.svg" alt="spon coret" class="w-6 h-6" />
    </div>
    <div class="cursor-pointer mx-1 hover:bg-gray-100 px-1 py-1 rounded-full">
      <img src="/icons/screenshot.svg" alt="spon coret" class="w-6 h-6" />
    </div>
    <div class="cursor-pointer mx-1 hover:bg-gray-100 px-1 py-1 rounded-full">
      <img src="/icons/threedots.svg" alt="spon coret" class="w-6 h-6" />
    </div>
</template>