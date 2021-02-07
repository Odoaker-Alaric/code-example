<template>
<div v-if="device">
    <component  :is="device.name + '-settings'"></component>
    <nuxt-link :to="'/devices/' + device.id">
        zpet na detail
    </nuxt-link>
</div>
</template>

<script>
import FanSettings from '~/components/devices/settings/FanSettings';
import LightSettings from '~/components/devices/settings/LightSettings';

export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  components: { FanSettings, LightSettings },
  created() {
  },
  computed: {
    device() {
      let id = this.$route.params.id;      
      return this.$store.getters.devices.find(x => x.id === parseInt(id)); // { name: 'light'};
    }
  }
};
</script>

<style>
</style>
