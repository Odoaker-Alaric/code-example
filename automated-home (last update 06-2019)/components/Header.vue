<template>
  <header class="header">
    <div></div>
    <nuxt-link class="header__link" to="/">
      <logo></logo>
    </nuxt-link>
    <div>
      <nuxt-link :to="'/admin/devices'">Admin sekce</nuxt-link>
      <button class="button button--attention" @click="save">save</button>
    </div>
  </header>
</template>

<script>
import Logo from "~/components/logo";

export default {
  components: { Logo },
  methods: {
    save() {
      this.$store.dispatch("save");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";

.header {
  //   max-width: 1000px;
  position: relative;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  // position: fixed;
  // top: 0;
  width: 100%;

  color: $color-text;
  background-color: $color;

  &__link {
    height: 100%;
  }
}

// override components
.logo {
  height: 100%;
}
</style>
