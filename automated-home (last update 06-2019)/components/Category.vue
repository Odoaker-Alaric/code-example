<template>
  <div class="category">
    <nuxt-link
      class="category__item"
      :to="category.nuxtLink"
      v-for="category in categories"
      :key="category.name"
    >
      <div
        class="category__body"
        @mouseover="category.animate = true"
        @mouseleave="category.animate = false"
      >
        <div class="category__icon">
          <component :is="'icon-' + category.icon" :active="true" :animate="category.animate"></component>
        </div>
        <div class="category__name">{{ category.name }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import IconLight from "~/components/icons/devices/IconLight";
import IconHeating from "~/components/icons/common/IconHeating";
import IconFan from "~/components/icons/devices/IconFan";
import IconTap from "~/components/icons/common/IconTap";
import IconGraph from "~/components/icons/common/IconGraph";
import Map from "~/components/Map";

export default {
  name: "Category",
  components: { IconLight, IconHeating, IconFan, IconTap, IconGraph, Map },
  data() {
    return {
      categories: [
        {
          name: "Osvětlení",
          nuxtLink: "/lights",
          icon: "light",
          animate: false
        },
        {
          name: "Vytápění",
          nuxtLink: "/heating",
          icon: "heating",
          animate: false
        },
        {
          name: "Větráky",
          nuxtLink: "/fans",
          icon: "fan",
          animate: false
        },
        {
          name: "Voda",
          nuxtLink: "/water",
          icon: "tap",
          animate: false
        },
        {
          name: "Ostatní zařízení",
          nuxtLink: "/other",
          icon: "heating",
          animate: false
        },
        {
          name: "Energie",
          nuxtLink: "/energies",
          icon: "graph"
        }
      ]
    };
  },
  computed: {
    activeLights() {
      return this.$store.getters.devices.filter(
        x => x.name === "light" && x.isActive === true
      );
    },
    activeFans() {
      return this.$store.getters.devices.filter(
        x => x.name === "fan" && x.isActive === true
      );
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";

$c: ".category";

.category {
  display: flex;
  flex-flow: row;
  justify-content: center;
  overflow: auto;

  &__item {
    max-width: 180px;

    flex: 0 0 180px;
    margin: 10px 15px;
  }
  &__body {
    display: inline-flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 25px;
  }

  &__icon {
    display: inline-block;
    text-align: center;
    width: 50%;
    padding: 25px 0;
  }

  &__name {
    opacity: 0;
    transform: translateY(5px);
    transition: 0.3s transform, 0.3s opacity;
  }
}

.map {
  flex: 0 0 100%;
}

// states
.category__item {
  &:hover {
    background-color: #fafafa;

    #{$c}__name {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

@media (max-width: 767px) {
  .category {
    flex: 1 1 140px;
  }
}
</style>