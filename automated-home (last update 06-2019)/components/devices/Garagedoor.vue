<template>
    <div class="garage" @click="toggle">
        <icon-garagedoor :active="device.isActive" :animate="true"></icon-garagedoor>
        <div class="fan__description">
            {{ device.room }}
            <!-- <span class="countdown" v-if="this.active">aktivní</span>
            <span v-else>neaktivní</span> -->
        </div>
    </div>
</template>

<script>
import IconGaragedoor from "~/components/icons/devices/IconGaragedoor";

export default {
  name: "Garagedoor",
  components: { IconGaragedoor },
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
  mounted() {
    console.log(this.device);
    
  },
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
.garage {
  display: inline-block;
  text-align: center;
}

// states
.garage {
  &:hover {
    cursor: pointer;
  }
}
</style>