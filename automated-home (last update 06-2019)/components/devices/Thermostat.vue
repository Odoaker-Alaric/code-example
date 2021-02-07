<template>  
    <div class="thermostat b-box">
        <div class="thermostat__header">
            <nuxt-link class="thermostat__calendar" :to="'/devices/' + device.id">
                <icon-calendar></icon-calendar>
            </nuxt-link>
            <div class="thermostat__name">{{ device.room }}</div>
            <nuxt-link class="thermostat__settings" :to="'/devices/' + device.id + '/settings'">
                <icon-settings></icon-settings>
            </nuxt-link>
        </div>
        <div class="thermostat__body">
            <div class="thermostat__status" >
              <icon-spinner v-if="device.isActive"></icon-spinner>
              <icon-ok v-else></icon-ok>
              <div @click="changeMode">manual: {{ device.isManuallyControlled }}</div>
            </div>
            <div class="thermostat__controlling">
                <div class="thermostat__temperature">{{ device.lastCheckedTemperature }}°C</div>
                <div class="thermostat__form">
                    <!-- <Numberpicker @changed="x => setDesiredTemperature(x)"></Numberpicker> -->
                    <span @click="setDesiredTemperature(parseFloat(device.desiredTemperature) - 0.5)">-</span>
                    <span>
                        {{ device.desiredTemperature }}
                    </span>
                    <span @click="setDesiredTemperature(parseFloat(device.desiredTemperature) + 0.5)">+</span>
                </div>
            </div>

        </div>
        <div class="thermostat__footer">
          
        </div>
    </div>
</template>

<script>
import IconCalendar from "~/components/icons/common/IconCalendar";
import IconSettings from "~/components/icons/common/IconSettings";
import IconSpinner from "~/components/icons/common/IconSpinner";
import IconOk from "~/components/icons/common/IconOk";
import Numberpicker from "~/components/common/Numberpicker";

export default {
  name: "Thermostat",
  components: { IconCalendar, IconSettings, IconSpinner, IconOk, Numberpicker },
  props: {
    device: {
      type: Object,
      required: true
    }
  },
  methods: {
    setDesiredTemperature(value) {
      this.device.setDesiredTemperature(value);
    },
    changeMode() {
      if (this.device.isManuallyControlled) {
        this.device.setMode("auto");
      } else {
        this.device.setMode("manual");
      }
    }
  },
  mounted() {
    console.log(this.device);
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";

.thermostat {
  text-align: center;

  &__header {
    padding: 15px 25px;
    display: flex;
  }

  &__body {
    display: flex;
    align-items: center;
    padding: 15px 25px;
  }

  &__calendar,
  &__name,
  &__settings,
  &__status,
  &__temperature,
  &__form {
    flex: 1;
  }

  &__controlling {
    flex: 2;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
  }

  &__form {
    white-space: nowrap;
    font-size: 25px;
    font-weight: 500;
    color: red;
  }

  &__temperature {
    font-size: 40px;
    font-weight: 800;
  }

  &__settings {
    text-align: right;
  }

  &__calendar {
    text-align: left;
  }

  &__status {
    text-align: left;
  }

  //overrides
  .icon-calendar,
  .icon-settings {
    width: 32px;
  }
  .icon-spinner {
  }
  .numberpicker__block {
    flex-flow: row;
  }
}

//states
.thermostat {
}
</style>
