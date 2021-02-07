<template>
  <div>
    <div class="header-wrapper">
      <Header></Header>
    </div>
    <main class="admin">
      <div class="admin__sidebar">
        <admin-menu class="text-center"></admin-menu>
        <Console class="b-box"></Console>
      </div>
      <div class="admin__content"></div>
      <div class="content">
        <nuxt v-if="!isLoading"/>
        <div v-else>Loading...</div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "~/components/Header";
import Console from "~/components/Console";
import AdminMenu from "~/components/AdminMenu";

export default {
  components: { Header, Console, AdminMenu },
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.admin {
  display: flex;

  &__content {
    padding: 5px;
  }

  &__sidebar {
    padding: 5px;
    max-width: 700px;
  }
}

.console {
  margin-top: 0;
}
.content {
  margin-top: 30px;
}
</style>
