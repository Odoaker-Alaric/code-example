<template>
    <nuxt-link :to="link" class="project-SliderCard">
        <picture>
            <img class="is-lazy" :data-src="thumbnail.url" alt="Website preview" />
        </picture>
        <main class="project-SliderCard-content">
            <div class="project-SliderCard-contentInner">
                <h3>{{ project.title }}</h3>
                <span>{{ project.card_description }}</span>
            </div>
        </main>
    </nuxt-link>
</template>

<script>
export default {
    name: 'ProjectSliderCard',
    props: {
        project: {
            required: true,
        },
    },
    computed: {
        link() {
            return `/projects/${this.project.slug}`
        },
        thumbnail() {
            return this.project.main_image.data.thumbnails.find((thumbnail) => thumbnail.dimension === '800x500')
        },
        thumbnailRetina() {
            return this.project.main_image.data.thumbnails.find((thumbnail) => thumbnail.dimension === '1600x1000')
        },
    },
}
</script>

<style lang="stylus">
.project-SliderCard
    position absolute
    background white
    width 100%

    &:before
        content ''
        display block
        padding-bottom percentage((500 / 800))

    &:hover
        .project-SliderCard-contentInner
            transform none

            & > *
                opacity 1
                transform none

        img
            opacity .3

    img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        transition .3s transform, .4s opacity
        transform-origin top center
        box-shadow 0 0 20px 0 rgba(0, 0, 0, .2)

    &-content
        overflow hidden
        position absolute
        z-index 1
        margin-bottom -11%
        bottom 0
        right -1px
        text-align right
        color white
        padding-bottom 50px

    &-contentInner
        position relative
        transition .5s transform $easeOut
        transform translate(110%, -50%)
        padding 50px

        &:after
            content ''
            z-index -1
            position absolute
            width 100%
            height 120%
            top -10%
            left 0
            background $brown
            transform skewY(-6deg)
            border-bottom 1px solid rgba(#fff,.5)

        & > *
            opacity 0
            transform translateX(10px)
            transition .5s transform .1s, .7s opacity
</style>