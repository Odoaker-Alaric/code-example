<template>
  <div class="homepage">
    <div class="homepage__map">
      <Map></Map>
    </div>
  </div>
</template>

<script>
import Map from "~/components/Map";

export default {
  components: { Map },
  // data() {},
  // computed: {},
  // mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

.homepage {
  display: flex;
  justify-content: center;
  padding: 20px;
  
  &__map {
    width: 500px;
 }
}
</style>