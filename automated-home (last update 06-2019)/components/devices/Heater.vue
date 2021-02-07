<template>
    <div class="heater" @click="toggle">
        <icon-heater :active="device.isActive" :animate="true"></icon-heater>
    </div>
</template>

<script>
import IconHeater from "~/components/icons/devices/IconHeater";

export default {
  name: "Heater",
  components: { IconHeater },
  props: {
    device: {
      type: Object,
      required: true
    },
    passive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toggle() {
      if (!this.passive) {
        this.device.toggle();
      }
    }
  }
};
</script>

<style lang="scss">
.heater {
  display: inline-block;
  text-align: center;
}

// states
.heater {
  &:hover {
    cursor: pointer;
  }
}
</style>