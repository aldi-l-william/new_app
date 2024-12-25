<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import { GetAPIHotelWisataApp, GetAPIProduct } from '~/api/wisata_app';
    import { useHotelStore } from '~/stores/Hotel';
    const route = useRoute();

    // dari pinia
    const hotelStore = useHotelStore();
    // Panggil initializeQuery saat komponen di-mount
    hotelStore.initializeQuery(route);

    const propertyItemsFromChild = ref({});

    const slug = ref<string>(route.params.slug as string);
    const propertyId = ref();


    onMounted(() => {
        if (typeof slug.value === 'string') {
            const propertyId = slug.value.split('-');
            const id = propertyId[propertyId.length - 1]; 
            
            GetAPIHotelWisataApp(id).then((res) => {
                hotelStore.propertyHotel = res[id];
            }).catch(err => {
                console.log(err, "err");
            })

            GetAPIProduct(id, hotelStore.checkin, hotelStore.checkout, hotelStore.guest_per_room, hotelStore.number_of_room).then(res => {
                hotelStore.propertyDetailHotel = res;
            }).catch(err => {
                console.log(err, "error");
            })
        } else if (Array.isArray(slug.value)) {
            console.log('Slug is an array', slug.value);
        } else {
            console.log('Slug is undefined or invalid');
        }
    });

    const handleGetData = (data: {id: string, propertyItems:object}) => {
            let id = propertyId.value[2];
            data.id = id;
            propertyItemsFromChild.value = data;
            console.log(propertyItemsFromChild.value, 'property value');
    }
</script>
<template>
   <AppHeader @get-property-items="handleGetData"/>
   <AppBody :items="propertyItemsFromChild"/>
   <AppTab
       :checkin="hotelStore.checkin"
       :checkout="hotelStore.checkout"
       :guest_per_room="hotelStore.guest_per_room"
       :number_of_room="hotelStore.number_of_room"
       :slug="hotelStore.slug"
    />
    <div class="max-1032-container">
        <AppInfoTab/>
    </div>
</template>