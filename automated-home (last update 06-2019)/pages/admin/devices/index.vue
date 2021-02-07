<template>
    <div class="a-devices">
        <form class="text-center" @submit.prevent="newDevice">
          ID: <input type="text" v-model="form.id">
          name: <input type="text" v-model="form.name">
          room: <input type="text" v-model="form.room">
          <input class="button" type="submit" value="ADD device">
        </form>
        <div class="table">
          <div class="thead">
            <div class="tr">
              <div class="th"></div>
              <div class="th">ID</div>
              <div class="th">name</div>
              <div class="th">room</div>
              <div class="th"></div>
            </div>
          </div>

          <nuxt-link class="tr" v-for="device in devices" :key="device.id" :to="'/admin/devices/' + device.id">
            <div class="td"><component :is="'icon-' + device.name" :active="true"></component></div>
            <div class="td">{{ device.id }}</div>
            <div class="td">{{ device.name }}</div>
            <div class="td">{{ device.room }}</div>
            <div class="td pointer" @click.prevent="remove(device)">X</div>
          </nuxt-link>
        </div>
    </div>
</template>

<script>
import deviceIcons from "~/components/icons/devices";
require('~/plugins/daytime')

export default {
  layout: "admin",
  components: deviceIcons,
  data() {
    return {
      form: {
        id: null,
        name: null,
        room: null
      }
    }
  },
  mounted() {},
  computed: {
    devices() {
      return this.$store.getters.devices;
    }
  },
  methods: {
    remove(device) {
      let result = confirm("Opravdu smazat zarizeni s ID " + device.id + "?")
      if (result) {
        device.remove()
      }
    },
    newDevice() {
      this.$store.dispatch('newDevice', { id: this.form.id, name: this.form.name, room: this.form.room})
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  text-align: center;
}

.icon {
  width: 20px;
}
</style>