<script setup lang="ts">
    import { useRoute } from 'vue-router';
    const route = useRoute();
    import { defineProps } from 'vue';
    import BadgeIcon from '~/public/icons/badge.svg'
    import BoxIcon from '~/public/icons/box.svg'
    import InfoIcon from '~/public/icons/info.svg' 
    const props = defineProps({
      checkin:{
        type: String
      },
      checkout:{
        type: String
      },
      guest_per_room:{
        type: Number
      },
      number_of_room:{
        type: Number
      },
      slug:{
        type: String
      }
    })

    // Fungsi untuk memeriksa apakah tab aktif berdasarkan path URL
    const isActiveTab = (tab:string) => {
      // Aktifkan tab Deals jika path adalah '/stay/[slug]'
      if (tab === 'deals' && route.path === `/stay/${route.params.slug}`) {
        return true
      }

      // Aktifkan tab Photos jika path mengandung '/photos'
      if (tab === 'photos' && route.path === `/stay/${route.params.slug}/photos`) {
        return true
      }

      // Aktifkan tab Info jika path mengandung '/info'
      if (tab === 'info' && route.path === `/stay/${route.params.slug}/info`) {
        return true
      }

      return false
    }
</script>

<template>
  <div class="max-1032-container flex justify-center items-center">
    <!-- Tab Deals -->
    <div
      class="flex justify-normal py-4 px-2 items-center"
      :class="isActiveTab('deals') ? 'border-t-4 border-blue-500' : ''"
    >
      <div>
        <component :is="BadgeIcon" :fill="isActiveTab('deals') ? '#3B82F6' : ''" />
      </div>
      <nuxt-link
        :to="{
          path: `/stay/${route.params.slug}`,
          query: {
            checkin: props.checkin,
            checkout: props.checkout,
            guest_per_room: props.guest_per_room,
            number_of_room: props.number_of_room
          }
        }"
        class="mx-2"
        :class="isActiveTab('deals') ? 'text-blue-500' : 'text-gray-500'"
      >
        DEALS
      </nuxt-link>
    </div>

    <!-- Tab Photos -->
    <div
      class="flex justify-normal p-4 items-center"
      :class="isActiveTab('photos') ? 'border-t-4 border-blue-500' : ''"
    >
      <div>
        <component :is="BoxIcon" :fill="isActiveTab('photos') ? '#3B82F6' : ''" />
      </div>
      <nuxt-link
        :to="{
          path: `/stay/${route.params.slug}/photos`,
          query: {
            checkin: props.checkin,
            checkout: props.checkout,
            guest_per_room: props.guest_per_room,
            number_of_room: props.number_of_room
          }
        }"
        class="mx-4"
        :class="isActiveTab('photos') ? 'text-blue-500' : 'text-gray-500'"
      >
        PHOTOS
      </nuxt-link>
    </div>

    <!-- Tab Info -->
    <div
      class="flex justify-normal p-4 items-center"
      :class="isActiveTab('info') ? 'border-t-4 border-blue-500' : ''"
    >
      <div>
        <component :is="InfoIcon" :fill="isActiveTab('info') ? '#3B82F6' : ''" />
      </div>
      <nuxt-link
        :to="{
          path: `/stay/${route.params.slug}/info`,
          query: {
            checkin: props.checkin,
            checkout: props.checkout,
            guest_per_room: props.guest_per_room,
            number_of_room: props.number_of_room
          }
        }"
        class="mx-4"
        :class="isActiveTab('info') ? 'text-blue-500' : 'text-gray-500'"
      >
        INFO
      </nuxt-link>
    </div>
  </div>
</template>
<style scoped>

</style>