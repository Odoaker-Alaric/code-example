<template>
    <div class="heating">
        <div class="mb-3" >
          <nuxt-link :to="'/'">Zpět na homepage</nuxt-link>
        </div>
        <div class="text-center">
          <heater v-for="heater in heaters" :key="heater.id" :device="heater"></heater>
        </div>
        <div class="heating__tempsensors">
          <temp-sensor v-for="tempsensor in tempsensors" :key="tempsensor.id" :device="tempsensor"></temp-sensor>
        </div>
        <div class="heating__thermostats">
          <thermostat v-for="thermostat in thermostats" :key="thermostat.id" :device="thermostat"></thermostat>
        </div>
    </div>
</template>

<script>
import Tempsensor from "~/components/devices/Tempsensor";
import Thermostat from "~/components/devices/Thermostat";
import Heater from "~/components/devices/Heater";

export default {
  components: { Tempsensor, Thermostat, Heater },
  data() {
    return {};
  },
  computed: {
    tempsensors() {
      return this.$store.getters.devices.filter(x => x.name === "tempsensor");
    },
    thermostats() {
      return this.$store.getters.devices.filter(x => x.name === "thermostat");
    },
    heaters() {
      return this.$store.getters.devices.filter(x => x.name === "heater");
    }
  }
};
</script>

<style lang="scss">
.heating {
  &__tempsensors {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  &__thermostats {
    display: flex;
    flex-flow: row wrap;
    padding: 10px 0;
    margin: -10px;
  }

  //overrides
  .thermostat {
    margin: 10px;
    flex: 1;
  }
  .icon-heater {
    width: 128px;
  }
}
</style>