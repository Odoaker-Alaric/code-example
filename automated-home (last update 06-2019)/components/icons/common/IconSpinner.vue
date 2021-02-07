<template>
    <div class="icon icon-spinner"></div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";

.icon-spinner {
  display: inline-block;
  width: 32px;
  height: 32px;
  font-size: 50%;
  border-radius: 50%;
  border: 0.5em solid $color;
  border-color: $color transparent $color transparent;
  animation: spinning 2s linear infinite;
}

@keyframes spinning {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
