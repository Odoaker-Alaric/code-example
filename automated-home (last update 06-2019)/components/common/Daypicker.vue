<template>
<div class="daypicker">
    <div class="daypicker__block">
        <button @click.prevent="selectPreviousDay" tabindex="-1">▼</button>
        <select type="text" v-model="selectedDay">
            <option v-for="day in days" :key="day">{{ day }}</option>
            </select>
        <button @click.prevent="selectNextDay" tabindex="-1">▲</button>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      days: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ],
      selectedDay: "monday"
    };
  },
  mounted() {
    this.$emit('changed', this.selectedDay);
  },
  watch: {
    selectedDay(newVal) {
      this.$emit("changed", newVal);
    }
  },
  methods: {
    selectNextDay() {
      let index = this.days.indexOf(this.selectedDay);
      if (index === this.days.length - 1) {
        this.selectedDay = this.days[0];
      } else {
        this.selectedDay = this.days[index + 1];
      }
    },
    selectPreviousDay() {
      let index = this.days.indexOf(this.selectedDay);
      if (index === 0) {
        this.selectedDay = this.days[this.days.length - 1];
      } else {
        this.selectedDay = this.days[index - 1];
      }
    }
  }
};
</script>

<style lang="scss">
.daypicker {
  &__block {
    display: inline-flex;
    flex-flow: column-reverse;
  }

  select {
    text-align: center;
  }

  button {
    font-weight: bolder;
    font-size: 15px;
    border: 0;
    background: 0;
  }
}

//states
.daypicker {
  button:hover {
    cursor: pointer;
  }
}
</style>
