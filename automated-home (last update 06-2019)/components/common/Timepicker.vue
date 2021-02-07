<template>
    <div class="timepicker">
        <div class="timepicker__block" >
            <button @click.prevent="addHours(-1)" tabindex="-1">-</button>
            <input type="text" v-model="hours" @keyup.up="addHours(1)" @keyup.down="addHours(-1)" @focus="$event.target.select()">
            <button @click.prevent="addHours(1)" tabindex="-1">+</button>
        </div>
        <div class="timepicker__block">
            <button @click.prevent="addMinutes(-1)" tabindex="-1">-</button>
            <input type="text" v-model="minutes" @keyup.up="addMinutes(1)" @keyup.down="addMinutes(-1)" @focus="$event.target.select()">
            <button @click.prevent="addMinutes(1)" tabindex="-1">+</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      hours: "00",
      minutes: "00"
    };
  },
  mounted() {
    this.$emit("changed", this.compoundTime);
  },
  watch: {
    hours(newVal, oldVal) {
      newVal = parseInt(newVal);
      if (newVal < 0) {
        this.hours = "24";
      } else if (newVal > 24) {
        this.hours = "00";
      }
      this.$emit("changed", this.compoundTime);
    },
    minutes(newVal, oldVal) {
      newVal = parseInt(newVal);
      if (newVal < 0) {
        this.minutes = "59";
        this.addHours(-1);
      } else if (this.minutes > 59) {
        this.minutes = "00";
        this.addHours(1);
      }
      this.$emit("changed", this.compoundTime);
    }
  },
  computed: {
    compoundTime() {
      return this.hours + ":" + this.minutes;
    }
  },
  methods: {
    formatWithLeadingZero(number) {
      const numberInString = number.toString();

      if (numberInString.length === 1) {
        return "0" + numberInString;
      } else {
        return numberInString;
      }
    },
    addHours(number) {
      let hours = parseInt(this.hours);
      hours = hours + number;
      this.hours = this.formatWithLeadingZero(hours);
    },
    addMinutes(number) {
      let minutes = parseInt(this.minutes);
      minutes = minutes + number;
      this.minutes = this.formatWithLeadingZero(minutes);
    }
  }
};
</script>

<style lang="scss">
.timepicker {
  &__block {
    display: inline-flex;
    flex-flow: column-reverse;
    width: 100px;
  }

  input {
    text-align: center;
  }

  button {
    font-weight: bolder;
    font-size: 15px;
    border: 0;
    background: 0;
    user-select: none;
  }
}

//states
.timepicker {
  button:hover {
    cursor: pointer;
  }
}
</style>
