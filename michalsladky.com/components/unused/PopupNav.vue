<template>
    <transition name="trans" :duration="1000">
        <div class="PopupNav" v-if="isActive">
            <div class="PopupNav-background"></div>
            <div class="PopupNav-inner">
                <ul class="PopupNav-list">
                    <li>About me</li>
                    <li>Portfolio</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
import EventBus, { EVENTS } from '../plugins/EventBus'
export default {
    data() {
        return {
            isActive: false,
            isVisible: false,
        }
    },
    mounted() {
        EventBus.$on(EVENTS.POPUP_TOGGLE, this.toggle)
    },
    methods: {
        toggle(element) {
            this.isActive = !this.isActive
        },
    },
}
</script>

<style lang="stylus">
.PopupNav
    position fixed
    z-index 99
    top 0
    bottom 0
    left 0
    right 0
    color white
    font-family $font-worksans

    @media $medium-up
        font-size 2.4rem

    &:before
        content ''
        position absolute
        top 40px
        right -100vw
        width 250vw
        height 100%
        display block
        transform translate3d(0, 0, 0) skew(38deg)
        transition .5s transform $easeOutExpo
        background saturate(lighten($brown, 10), 10)

        @media $medium-up
            right -60vw
            width 80vw

    &:after
        content ''
        position absolute
        top 0
        right -100vw
        width 250vw
        height 100%
        display block
        transform translate3d(0, 0, 0) skew(38deg)
        background $brown

        @media $medium-up
            right -60vw
            width 80vw

    &-inner
        position absolute
        top 180px
        right 50px

    &-list
        position relative
        z-index 1

    &-background
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background rgba($brown, .15)
        opacity 1
        transition .3s opacity

    &.trans-enter
        &:before, &:after
            transform translate3d(100%, 0, 0) skew(38deg)

        .PopupNav-background
            opacity 0

    &.trans-enter-active, &.trans-leave-active
        &:before, &:after
            transition .5s transform $easeOutExpo

    &.trans-enter-active
        &:after
            transition-delay .1s

    &.trans-leave-active
        &:before, &:after
            transition .3s transform $easeInCirc

        &:before
            transition-delay .1s

    &.trans-enter-to
        &:before, &:after
            transform translate3d(0, 0, 0) skew(38deg)

        .PopupNav-background
            opacity 1

    &.trans-leave-to
        &:before, &:after
            transform translate3d(100%, 0, 0) skew(38deg)

        .PopupNav-background
            opacity 0
</style>