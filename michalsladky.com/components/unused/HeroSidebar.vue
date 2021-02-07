<template></template>

<script>
export default {

    methods: {
        showNav() {
            const items = this.$refs.nav.querySelectorAll('li')
            this.$anime({
                targets: items,
                translateX: '0',
                easing: 'easeOutExpo',
                delay: this.$anime.stagger(50, { direction: 'reverse' }),
            })
        },
        hideNav() {
            const items = this.$refs.nav.querySelectorAll('li')

            const tl = this.$anime.timeline({
                duration: 300,
                easing: 'easeOutExpo',
            })

            tl.add({
                targets: items,
                translateX: '-150%',
                delay: this.$anime.stagger(50),
            }).add(
                {
                    duration: 0,
                    complete: () => {
                        this.isSidebarActive = true
                    },
                },
                '-=250'
            )
        },
        handleSidebarEnter(el) {
            const items = el.querySelectorAll('li')
            const background = el.querySelector('.Hero-sidebarBg')

            const tl = this.$anime.timeline({
                duration: 300,
                easing: 'easeOutExpo',
            })

            tl.add({
                targets: background,
                translateX: ['-150%', 0],
            }).add(
                {
                    targets: items,
                    translateX: ['-150%', 0],
                    delay: this.$anime.stagger(50),
                },
                '-=100'
            )
        },
        handleSidebarLeave(el, done) {
            const items = el.querySelectorAll('li')
            const background = el.querySelector('.Hero-sidebarBg')

            const tl = this.$anime.timeline({
                duration: 300,
                easing: 'easeOutExpo',
            })

            tl.add({
                targets: items,
                translateX: '-150%',
                delay: this.$anime.stagger(50, { direction: 'reverse' }),
            })
                .add(
                    {
                        targets: background,
                        translateX: '-150%',
                        complete: () => {
                            done()
                        },
                    },
                    '-=100'
                )
                .add(
                    {
                        duration: 0,
                        complete: () => {
                            this.showNav()
                        },
                    },
                    '-=300'
                )
        },
    },
}
</script>

<style>
</style>