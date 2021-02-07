<template>
    <div>
        <div class="mb-3" >
            <nuxt-link :to="'/'">Zpět na homepage</nuxt-link>
        </div>
        <fan v-for="fan in fans" :key="fan.id" :device="fan"></fan>
    </div>
</template>

<script>
    import Fan from "~/components/devices/Fan"

    export default {
        components: { Fan },
        data() {
            return {

            }
        },
        computed: {
            fans() {
                return this.$store.getters.devices.filter(x => x.name === "fan");
            }
        }
    }
</script>

<style>
    .fan {
        margin: 0 5px 15px 5px;
    }
</style>