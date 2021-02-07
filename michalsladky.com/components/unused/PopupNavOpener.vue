<template>
    <div class="PopupNavOpener" @click="handleClick">menu</div>
</template>

<script>
import EventBus, { EVENTS } from '../plugins/EventBus'

export default {
    mounted() {},
    methods: {
        handleClick() {
            EventBus.$emit(EVENTS.POPUP_TOGGLE)
            EventBus.$on(EVENTS.POPUP_OPENED, this.toggle)
        },
    },
}
</script>

<style lang="stylus">
.PopupNavOpener
    position fixed
    z-index 100
    top 40px
    right 25px
    width 45px
    height 45px
    background #4d2102
    color white

    @media $medium-up
        display none
</style>