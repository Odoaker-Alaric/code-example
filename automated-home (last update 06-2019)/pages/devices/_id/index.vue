<template>
  <div>
      <!-- <nuxt-link :to="'/devices'">Jít na přehled všech zařízení</nuxt-link> -->
      <div v-if="device">
        <component :is="device.name + '-detail'" :device="device"></component>
        <!-- <nuxt-link :to="'/devices/' + device.id + '/settings'">do nastaveni -></nuxt-link> -->
      </div>
  </div>
</template>

<script>
import DeviceDetails from "~/components/devices/detail";

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: DeviceDetails,
  created() {},
  computed: {
    device() {
      let id = this.$route.params.id;
      
      return this.$store.getters.device(parseInt(id)); // { name: 'light'};
    }
  }
};
</script>

<style>
</style>
