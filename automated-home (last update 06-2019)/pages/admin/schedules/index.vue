<template>
    <div class="a-schedules">
        <div class="table">
          <div class="thead">
            <div class="tr">
              <div class="th">ID</div>
              <div class="th">interval</div>
              <div class="th">last run</div>
            </div>
          </div>
          <div class="tr" v-for="schedule in schedules" :key="schedule.id">
            <div class="td">{{ schedule.id }}</div>
            <div class="td">{{ schedule.interval }}</div>
            <div class="td">{{ schedule.last_run }}</div>
          </div>
        </div>
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
    schedules() {
      console.log(this.$store.getters.schedules);
      
      return this.$store.getters.schedules;
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