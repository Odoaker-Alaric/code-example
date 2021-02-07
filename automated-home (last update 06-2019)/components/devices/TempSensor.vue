<template>
    <div class="tempsensor" @click="device.toggle()">
        <icon-temp-sensor></icon-temp-sensor>
        <div class="light__description">{{ device.room }}<br>
        {{ device.temperature }}
        </div>
    </div>
</template>

<script>
// import '@/utils/countdown.js';
import IconTempsensor from '~/components/icons/devices/IconTempsensor'

export default {
  name: "Tempsensor",
  components: { IconTempsensor },
  props: {
    'device': {
      type: Object,
      required: true
    }
  },
  methods: {},
  mounted() {}
};
</script>


<style lang="scss">

.tempsensor {
  display: inline-block;
  text-align: center;
}
</style>