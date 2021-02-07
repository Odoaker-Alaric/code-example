<template>
  <div class="quickbar">
    <div class="quickbar__item" v-for="device in activeDevices" :key="device.id">
      <component :is="device.name" :device="device"></component>
    </div>
  </div>
</template>

<script>
import devices from "~/components/devices";

export default {
  components: devices,
  computed: {
    activeDevices() {
      const ignoreDevices = ["thermostat", "heater", "servovalve"];
      return this.$store.getters.devices.filter(
        x => x.isActive === true && !ignoreDevices.includes(x.name)
      );
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";

.quickbar {
  display: flex;
  height: 100%;

  &__item {
    color: white;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 8px;
  }

  .icon {
    height: 70%;
  }
}
</style>
