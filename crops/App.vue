<template>
    <Setup v-if="pictureStore.getters.pictures.length === 0"></Setup>
    <Main v-if="pictureStore.getters.pictures.length > 0"></Main>
</template>

<script>
import Setup from "@/pages/Setup"
import Main from "@/pages/Main"

import {pictureStore, templateStore} from "@/store"
import computed from "vue"

export default {
    name: "App",
    components: {
        Setup,
        Main,
    },
    computed: {
        pictureStore: () => pictureStore,
    },
    mounted() {
        window.pictureStore = pictureStore
        window.templateStore = templateStore
    }
}
</script>

<style lang="stylus">
#app
    width 100%
    height 100%
</style>
