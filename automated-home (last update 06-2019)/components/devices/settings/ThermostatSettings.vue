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
            <div class="thermostat__status">{{ device.isActive }}</div>
            <div class="thermostat__controlling">
                <div class="thermostat__temperature">{{ device.lastCheckedTemperature }}°C</div>
                <div class="thermostat__form">
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

export default {
  name: "Thermostat",
  components: { IconCalendar, IconSettings },
  props: {
    device: {
      type: Object,
      required: true
    }
  },
  methods: {
    setDesiredTemperature(value) {
      this.device.setDesiredTemperature(value);
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
}

//states
.thermostat {
}
</style>
