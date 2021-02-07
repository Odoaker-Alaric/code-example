<template>
    <div class="timeline">
        <div class="timeline__partititon" v-for="(part, index) in schedules" :key="index" :style=" { width: (part.partition * 100) + '%' }">
            {{ part.desiredTemperature }}
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      schedules: []
    };
  },
  props: {
    parts: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    Date.prototype.addHours = function(h) {
      this.setTime(this.getTime() + h * 60 * 60 * 1000);
      return this;
    };

    let schedules = [
      {
        time: "07:30:00",
        weekday: "monday",
        duration: null,
        desiredTemperature: 17
      },
      {
        time: "10:30:00",
        weekday: "monday",
        duration: null,
        desiredTemperature: 18
      },
      {
        time: "16:30:00",
        weekday: "monday",
        duration: null,
        desiredTemperature: 19
      },
      {
        time: "20:16:00",
        weekday: "monday",
        duration: null,
        desiredTemperature: 22
      },
      {
        time: "22:00:00",
        weekday: "monday",
        duration: null,
        desiredTemperature: 17
      }
    ];

    let startOfDay = "00:00:00";
    let endOfDay = "24:00:00";
    let secondsInDay = 60 * 60 * 24;

    schedules.unshift({
      time: startOfDay
    });

    schedules.push({
      time: endOfDay
    });

    for (let i = 0; i < schedules.length; i++) {
      const element = schedules[i];
      const nextElement = schedules[i + 1];
      if (nextElement) {
        let start = new Date("01/01/2000 " + element.time).getTime();
        let end = new Date("01/01/2000 " + nextElement.time).getTime();

        element.duration = (end - start) / 1000;
        element.partition = element.duration / secondsInDay;
      }
    }
    this.schedules = schedules;
    console.log(schedules);
    
  }
};
</script>

<style lang="scss">
.timeline {
  display: flex;
  width: 100%;
  height: 100px;

  &__partititon {
    height: 100%;
    background-color: blue;
    color: white;
  }

  &__partititon:nth-child(odd) {
    background-color: red;
  }
}
</style>
