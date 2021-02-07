<template>
    <div class="fan" @click="toggle">
        <icon-fan :active="device.isActive" :animate="true"></icon-fan>
        <div class="fan__description">
            {{ device.room }}
            <!-- <span class="countdown" v-if="this.active">aktivní</span>
            <span v-else>neaktivní</span> -->
        </div>
    </div>
</template>

<script>
import IconFan from "~/components/icons/devices/IconFan";

export default {
  name: "Fan",
  components: { IconFan },
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
.fan {
  display: inline-block;
  text-align: center;
}

// states
.fan {
  &:hover {
    cursor: pointer;
  }
}

//animations
@keyframes rotate-center {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>