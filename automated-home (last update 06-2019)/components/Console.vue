<template>
    <div class="console">
        <input class="console__filter" v-model="showTopics">
        <div class="console__body">
            <div class="console__messager" v-for="(message,index) in messages" :key="index">
                <span class="console__date">{{ message.date }}</span>
                <span class="console__topic">{{ message.topic }}</span>
                <span class="console__data" v-if="showCompact">{{ message.data | truncate(100,'...')}}</span>
                <span class="console__data" v-else>{{ message.data }}</span>
            </div>
        </div>
        <input class="console__commandline" type="text">
    </div>
</template>

<script>
export default {
  name: "console",
  data() {
    return {
      showTopics: "",
      showCompact: true
    };
  },
  computed: {
    messages() {
      let st = this.showTopics.split(",");
      let messages = this.$store.getters.mqttMessages.filter(a =>
        st.some(b => a.topic.startsWith(b))
      );
      return messages.reverse();
    }
  },
  mounted() {
    let options = this.$store.getters.options;
    options.logAllMessages = true;
    this.$store.commit("saveOptions", options);
  },
  destroyed() {
    let options = this.$store.getters.options;
    options.logAllMessages = false;
    this.$store.commit("saveOptions", options);
  }
};
</script>

<style lang="scss">
.console {
  background-color: black;
  color: white;

  &__filter {
    margin: 15px;
  }
  &__body {
    // height: 200px;
    overflow-y: auto;
    padding: 0 15px;
  }
  &__commandline {
    width: calc(100% - 30px);
    margin: 15px 0 5px 15px;
  }

  &__topic {
    color: #f88;
  }
}
</style>
