<template>
  <div class="inbox">
    <h2 class="inbox__title">Inbox</h2>
    <div class="inbox__box">
      <div class="inbox__message" v-for="message in messages" :key="message.date">
        <span class="inbox__date">25/08/12 15:30</span>
        <span class="inbox__text">Pračka doprala</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          date: "25/08/12 15:29",
          message: "Pračka doprala"
        },
        {
          date: "25/08/12 15:30",
          message: "Pračka doprala"
        },
        {
          date: "25/08/12 15:32",
          message: "Pračka doprala"
        },
        {
          date: "25/08/12 15:33",
          message: "Pračka doprala"
        },
        {
          date: "25/08/12 15:34",
          message: "Pračka doprala"
        },
        {
          date: "25/08/12 15:35",
          message: "Pračka doprala"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";

.inbox {
  font-weight: 600;
  font-size: 1.4rem;

  &__title {
    color: white;
    font-size: 1.6rem;
    margin: 0;
    background-color: $color;
    padding: 5px;
  }

  &__date {
    margin-right: 20px;
  }

  &__box {
    overflow-y: auto;
    padding: 0 10px 5px 5px;
    margin-top: 5px;
  }
}

@media (max-width: 767px) {
  .inbox {
    font-size: 11px;

    &__box {
      height: 70px;
    }
  }
}
</style>
