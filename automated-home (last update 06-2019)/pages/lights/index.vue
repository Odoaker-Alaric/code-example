<template>
    <div class="lights">
        <div class="mb-3">
            <nuxt-link :to="'/'">Zpět na homepage</nuxt-link>
        </div>
        <div class="b-listing">
            <light v-for="light in lights" :key="light.id" :device="light"></light>
        </div>
    </div>
</template>

<script>
    import Light from "~/components/devices/Light"

    export default {
        components: { Light },
        data() {
            return {

            }
        },
        computed: {
            lights() {
                return this.$store.getters.devices.filter(x => x.name === "light");
            }
        }
    }
</script>

<style lang="scss">
    .light {
        margin: 0 5px 15px 5px;
    }

    .lights .icon {
        width: 96px;
    }

    @media (max-width: 767px) {
        .lights .icon {
            width: 48px;
        }
    }
</style>