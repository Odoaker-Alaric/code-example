<template>  
    <div class="thermostat-detail">
      <h1 class="thermostat-detail__header text-center">Termostat pro {{ device.room }}</h1>
      <div style="display: flex;">
        <div class="thermostat-detail__timetable-weekdays">
              <div>&nbsp;</div>
            <div class="thermostat-detail__timetable-weekday" v-for="(schedules,weekday,index) in schedulesGroupedByDay" :key="'weekday' + index">
              {{ weekday }}
            </div>
        </div>
        <div class="thermostat-detail__timetable">
          <div class="thermostat-detail__timetable-header">
            <div style="width: 8.3333%"></div>
            <div style="width: 8.3333%">2:00</div>
            <div style="width: 8.3333%">4:00</div>
            <div style="width: 8.3333%">6:00</div>
            <div style="width: 8.3333%">8:00</div>
            <div style="width: 8.3333%">10:00</div>
            <div style="width: 8.3333%">12:00</div>
            <div style="width: 8.3333%">14:00</div>
            <div style="width: 8.3333%">16:00</div>
            <div style="width: 8.3333%">18:00</div>
            <div style="width: 8.3333%">20:00</div>
            <div style="width: 8.3333%">22:00</div>
          </div>
          <div v-for="(schedules,weekday,index) in schedulesGroupedByDay" :key="'x' + index">
            <div class="thermostat-detail__timeline">
              <div class="thermostat-detail__timeline-partition pointer" v-for="schedule in schedules" :key="'x' + schedule.id" :style="{width: schedule.partition * 100 + '%'}" :class="{'active': schedule.originalSchedule ? schedule.originalSchedule === activeSchedule : false || schedule === activeSchedule}" @click="toggleSchedule(schedule)">
                  {{ schedule.message | desiredTemperature }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <form class="thermostat-detail__form-new" v-if="true" @submit.prevent="device.addSchedule(form.selectedWeekday,form.time,form.desiredTemperature)">
        <Daypicker @changed="day => form.selectedWeekday = day"></Daypicker>
        <Timepicker @changed="time => form.time = time"></Timepicker>
        <Numberpicker @changed="number => form.desiredTemperature = number"></Numberpicker>
        <input type="submit" value="add schedule" class="button button--attention">
      </form>
      <div v-for="(schedules,weekday,index) in schedulesGroupedByDay" :key="index" v-if="activeSchedule ? activeSchedule.weekday === weekday:false">
        <div class="thermostat-detail__timetable-schedules" >
        <h1>{{ weekday }}</h1>

          <div class="thermostat-detail__timetable-schedule pointer text-center" v-for="schedule in schedules" :key="'x' + schedule.id" v-if="!schedule.originalSchedule" :class="{'active': schedule === activeSchedule}" @click="toggleSchedule(schedule)">
              <div>{{ schedule.time }}</div> <div>{{ schedule.message | desiredTemperature}}</div><div><button class="button" @click.prevent="device.removeSchedule(schedule)">smazat</button></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
require("~/functions/arrays");

import Timeline from "~/components/devices/common/Timeline";
import Schedule from "~/prototypes/Schedule";
import Timepicker from "~/components/common/Timepicker";
import Daypicker from "~/components/common/Daypicker";
import Numberpicker from "~/components/common/Numberpicker";

export default {
  name: "Thermostat",
  components: { Timeline, Timepicker, Daypicker, Numberpicker },
  props: {
    device: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeSchedule: null,
      weekdays: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ],
      form: {
        time: null,
        selectedWeekday: null,
        desiredTemperature: null
      }
    };
  },
  computed: {
    schedulesGroupedByDay() {
      let weekdays = this.weekdays;

      let groupedSchedules = this.device.scheduleObjects.groupBy("weekday");

      //add missing days
      for (let weekday of weekdays) {
        if (!groupedSchedules[weekday]) {
          groupedSchedules[weekday] = [];
        }
      }

      //sort times of every day
      for (let weekday in groupedSchedules) {
        groupedSchedules[weekday] = groupedSchedules[weekday].sort((a, b) => {
          if (
            parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0]) ===
            0
          ) {
            return (
              parseInt(a.time.split(":")[1]) - parseInt(b.time.split(":")[1])
            );
          } else {
            return (
              parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0])
            );
          }
        });
      }

      function findPreviousWeekday(weekday) {
        const previousWeekday = null;
        const weekdayIndex = weekdays.indexOf(weekday);
        if (weekdayIndex > 0) {
          return weekdays[weekdayIndex - 1];
        } else {
          return weekdays[weekdays.length - 1];
        }
      }

      function findPreviousSchedule(weekday, currentSchedule) {
        if (typeof currentSchedule !== "undefined") {
          const index = groupedSchedules[weekday].indexOf(
            x => x === currentSchedule
          );
          if (index > 0) {
            return groupedSchedules[weekday][index - 1];
          } else {
            return findPreviousSchedule(findPreviousWeekday(weekday));
          }
        }

        if (groupedSchedules[weekday].length) {
          let lastSchedule =
            groupedSchedules[weekday][groupedSchedules[weekday].length - 1];
          if (lastSchedule.originalSchedule) {
            return lastSchedule.originalSchedule;
          } else {
            return lastSchedule;
          }
        } else {
          return findPreviousSchedule(findPreviousWeekday(weekday));
        }
      }

      //append partial schedule - first time of the day, referencing to last known schedule

      for (let weekday in groupedSchedules) {
        let partialSchedule = {};
        partialSchedule.time = "00:00:00";
        partialSchedule.id = "partial" + weekday;
        groupedSchedules[weekday].unshift(partialSchedule);
        partialSchedule.originalSchedule = findPreviousSchedule(
          weekday,
          partialSchedule
        );
      }

      //sort days (key values) in groupedSchedules - monday=>sunday
      groupedSchedules = Object.keys(groupedSchedules)
        .sort((a, b) => {
          return weekdays.indexOf(a) - weekdays.indexOf(b);
        })
        .reduce((r, key) => ((r[key] = groupedSchedules[key]), r), {});

      //calculate day partition
      let secondsInDay = 60 * 60 * 24;

      for (let weekday in groupedSchedules) {
        for (let i = 0; i < groupedSchedules[weekday].length; i++) {
          const element = groupedSchedules[weekday][i];
          const nextElement = groupedSchedules[weekday][i + 1];

          const start = null,
            end = null;

          if (nextElement) {
            start = new Date("01/01/2000 " + element.time).getTime();
            end = new Date("01/01/2000 " + nextElement.time).getTime();
          } else {
            start = new Date("01/01/2000 " + element.time).getTime();
            end = new Date("01/01/2000 24:00:00").getTime();
          }
          element.duration = (end - start) / 1000;
          element.partition = element.duration / secondsInDay;
        }
      }

      return groupedSchedules;
    }
  },
  methods: {
    setDesiredTemperature(value) {
      this.device.setDesiredTemperature(value);
    },
    toggleSchedule(schedule) {
      if (!(schedule instanceof Schedule)) {
        schedule = schedule.originalSchedule;
      }
      if (this.activeSchedule === schedule) {
        this.activeSchedule = null;
      } else {
        this.activeSchedule = schedule;
      }
    }
  },
  filters: {
    desiredTemperature: function(value) {
      if (!value) return "";
      var regex = /[+-]?\d+(\.\d+)?/g;
      value = value.match(regex) + "°C";
      return value;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/_common.scss";
@import "~/assets/scss/variables.scss";

.thermostat-detail {
  &__timetable {
    @include box;
    
    width: 100%;
    overflow: auto;
  }
  &__timetable-header,
  &__timeline {
    width: 100%;
    min-width: 800px;
  }

  &__timetable-header {
    font-weight: bold;
    color: red;
    background-color: $color;
    display: flex;
  }

  &__timetable-header > div {
    border-left: 1px solid $color;
    &:first-child() {
      border-left: 0;
    }
  }

  &__timetable-weekdays {
    width: 100px;
  }

  &__timeline,
  &__timetable-weekday {
    height: 30px;
  }

  &__timeline {
    display: flex;
  }

  &__timeline-partition {
    display: flex;
    align-items: center;
    height: 100%;
    border: 1px solid $color;
    overflow: hidden;
    font-size: 11px;
  }
  &__timetable-schedule {
    display: inline-block;
    border-right: 1px solid $color;
    padding: 5px 10px; 

    &:last-of-type {
      border-right: 0;
    }
  }

  &__timetable-schedules {
    margin-bottom: 50px;
  }

  &__timetable-weekday {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    width: 100px;
  }

  &__form-new {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    & > * {
      margin:  0 10px;
    }
  }
}

//states
.thermostat-detail {
  &__timeline-partition.active {
    background-color: lighten($color, 50%);
  }
  &__timetable-schedule.active {
    background-color: lighten($color, 50%);
  }
}
</style>
