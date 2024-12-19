<script setup lang="ts">
import { AppSearchDetail } from '#components';
useSeoMeta({
  ogImage: '/icons/search.svg'
})
</script>
<template>
    <div class="max-1032-container flex justify-between my-2">
        <div class="py-2">
            <img src="https://project-exterior-technical-test-app.up.railway.app/img/logo.png" alt="Wisata App" class="w-[180px]"/>
        </div>
        <div class="py-2">
            <button class="px-4 py-2 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded w-[590px] max-w-screen-lg">
               <img src="/icons/search.svg" alt="icon" class="w-[15px] mx-2"/>
               <span class="mx-1">G7 Hotel </span> <span class="mx-1">-</span> <span class="mx-2">4 - 8 Mar 2025</span>
            </button>
        </div>
        <div class="py-2">
            <button class="bg-blue-600 text-white px-3 py-2 rounded">
                Sign in
            </button>
        </div>
    </div>
    <div>
        <AppSearchDetail />
    </div>
</template>