<template>
    <div class="a-sensors">
        <form class="text-center" @submit.prevent="newSensor">
          ID: <input type="text" v-model="form.id">
          name: <input type="text" v-model="form.name">
          station: <input type="text" v-model="form.station">
          pin: <input type="text" v-model="form.pin">
          <input class="button" type="submit" value="ADD sensor">
        </form> 
        <div class="table">
          <div class="thead">
            <div class="tr">
              <div class="th">ID</div>
              <div class="th">name</div>
              <div class="th">station</div>
              <div class="th">pin</div>
              <div class="th"></div>
            </div>
          </div>
          <nuxt-link :to="'/admin/sensors/' + sensor.id" class="tr" v-for="sensor in sensors" :key="sensor.id">
            <div class="td">{{ sensor.id }}</div>
            <div class="td">{{ sensor.name }}</div>
            <div class="td">{{ sensor.station }}</div>
            <div class="td">{{ sensor.pin }}</div>
            <div class="td pointer" @click.prevent="remove(sensor)">X</div>
          </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      form: {
        id: null,
        name: null,
        station: "ss",
        pin: null
      }
    }
  },
  mounted() {},
  computed: {
    sensors() {
      return this.$store.getters.sensors;
    }
  },
  methods: {
    remove(sensor) {
      var result = confirm("Do you really want to remove a sensor with ID: " + sensor.id)
      if (result) {
        sensor.remove()
      }
    },
    newSensor() {
      this.$store.dispatch('newSensor', {id: this.form.id, name: this.form.name, station: this.form.station, pin: this.form.pin})
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  text-align: center;
}

</style>