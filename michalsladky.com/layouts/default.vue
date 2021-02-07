<template>
    <div class="PageWrapper" @click="handleClick">
        <div class="PageWrapper-content">
            <Header></Header>
            <nuxt class="Page" />
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Footer from './components/Footer'
import Header from './components/Header'
import EventBus, { EVENTS } from '@/plugins/EventBus'

export default {
    components: {
        Header,
        Footer,
    },
    methods: {
        handleClick(event) {
            if (event.defaultPrevented) {
                return
            }

            const target = event.target.closest('a')
            if (!target) {
                return
            }

            if (document.location.href.split('#')[0] !== target.href.split('#')[0]) {
                return
            }

            const id = target.href.split('#')[1]
            if (!id) {
                return
            }

            const element = document.getElementById(id)
            if (!element) {
                return
            }

            event.preventDefault()
            element.scrollIntoView({
                behavior: 'smooth',
            })
        },
    },
}
</script>

<style lang="stylus">
.PageWrapper
    width 100%
    overflow hidden
    background lighten($brown, 94)

    &-content
        position relative

html.is-leaving
    .Footer
        transition .4s transform $easeOutExpo
        transform translateY(100%)

html.is-entering
    .Footer
        transition .4s transform $easeOut
        transform translateY(0)

.Page
    opacity 1

    &.page-enter-active, &.page-leave-active
        transition all .4s ease-out

    &.page-enter, &.page-leave-active
        opacity 0
        transform-origin 50% 50%
</style>

