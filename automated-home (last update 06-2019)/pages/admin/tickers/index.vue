<template>
    <div class="a-tickers">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>room</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticker in tickers" :key="ticker.id">
              <td>{{ ticker.id }}</td>
              <td>{{ ticker.interval }}</td>
              <td>{{ ticker.last_run }}</td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {};
  },
  mounted() {},
  computed: {
    tickers() {
      return this.$store.getters.tickers;
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  text-align: center;
}
</style>