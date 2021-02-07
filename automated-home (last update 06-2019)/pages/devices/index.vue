<template>    
    <div class="devices">
        <nuxt-link v-for="device in devices" :key="device.id" :to="'/devices/' + device.id">
            <component :is="'icon-' + device.name" :active="true"></component>
        </nuxt-link>
    </div>
</template>

<script>
import DeviceIcons from "~/components/icons/devices";

export default {
  components: DeviceIcons,
  computed: {
    devices() {
      return this.$store.getters.devices;
    }
  }
};
</script>

<style>
</style>
