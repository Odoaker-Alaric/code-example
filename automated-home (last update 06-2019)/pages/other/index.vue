<template>
    <div>
        <div class="mb-3">
          <nuxt-link :to="'/'">Zpět na homepage</nuxt-link>
        </div>
        <garage-door v-for="garageDoor in garageDoors" :key="garageDoor.id" :device="garageDoor"></garage-door>
    </div>
</template>

<script>
import GarageDoor from "~/components/devices/Garagedoor";

export default {
  components: { GarageDoor },
  data() {
    return {};
  },
  computed: {
    garageDoors() {
      return this.$store.getters.devices.filter(x => x.name === "garagedoor");
    }
  }
};
</script>

<style>
</style>