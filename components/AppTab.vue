<script setup lang="ts">
import { ref } from 'vue';
import { 
    TabComp, 
    AppDealsTab, 
    AppPhotosTab, 
    AppInfoTab 
} from '#components';


const TabPanel = ref([
    { icon:'badge', tabName:'DEALS', alt:'deals', color:'#007aff',isActive:true },
    { icon:'box', tabName:'PHOTOS', alt:'photos', color:'#007aff', isActive:false },
    { icon:'info', tabName:'INFO', alt:'info', color:'#007aff', isActive:false }
]);

const changeTab = (tabName: string) => {
    TabPanel.value.forEach((tab) => {
        tab.isActive = tab.tabName === tabName
    });
}

// Objek untuk memetakan nama ke komponen ikon
const tabs = {
        DEALS: AppDealsTab,
        PHOTOS: AppPhotosTab,
        INFO: AppInfoTab,
}

// Komponen dinamis untuk tab yang aktif
const DynamicTab = computed(() => {
    const activeTab = TabPanel.value.find((tab) => tab.isActive);
    return activeTab ? tabs[activeTab.tabName] : null;
});

</script>

<template>
    <div class="max-1032-container flex justify-center items-center">
        <div v-for="(item, index) in TabPanel">
            <TabComp :icon="item.icon" :tab-name="item.tabName" :alt="item.alt" :color="item.color" :is-active="item.isActive" @click="changeTab(item.tabName); changeIndex(index)"/>
        </div>
    </div>
    <div class="max-1032-container">
            <!-- Render ikon secara dinamis -->
            <component
                v-if="DynamicTab"
                :is="DynamicTab" 
            />
            <div v-else>
                <p>Tab Not Found</p>
            </div>
    </div>
</template>