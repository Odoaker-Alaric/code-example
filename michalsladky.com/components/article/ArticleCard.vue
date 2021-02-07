<template>
    <article class="ArticleCard">
        <nuxt-link :to="link" class="ArticleCard-card">
            <div class="ArticleCard-image Image">
                <img class="is-lazy" :data-src="thumbnailRetina.url" :data-srcset="thumbnailRetina.url + ' 1.4x'" alt />
            </div>
            <div class="ArticleCard-content">
                <time class="ArticleCard-time">{{ article.publish_date | date }}</time>
                <h2 class="ArticleCard-title">{{ article.title }}</h2>
                <aside class="ArticleCard-tags">
                    <span v-for="(tag, index) in articleTags" :key="index">#{{ tag }}</span>
                </aside>
            </div>
        </nuxt-link>
    </article>
</template>

<script>
export default {
    props: {
        article: null,
    },
    computed: {
        link() {
            return `/blog/${this.article.slug}`
        },
        articleTags() {
            return this.article.tags.filter((tag) => tag)
        },
        thumbnail() {
            return this.article.main_image.data.thumbnails.find((thumbnail) => thumbnail.dimension === '350x210')
        },
        thumbnailRetina() {
            return this.article.main_image.data.thumbnails.find((thumbnail) => thumbnail.dimension === '490x294')
        },
    },
}
</script>
<style lang="stylus">
.ArticleCard
    &-card
        line-height 1.4
        position relative
        font-family $font-worksans
        display flex
        flex-flow row wrap
        text-decoration none

        &:before
            content ''
            background white
            position absolute
            top 0
            right 0
            left 0
            bottom 0
            transition .3s box-shadow, .15s transform ease-out

    &-content
        position relative
        display flex
        flex-flow column
        padding 15px 15px 20px
        flex 1 0 auto

        @media $medium-up
            transition .3s box-shadow
            box-shadow 10px 5px 20px 0 rgba($black, .06)
            padding 35px


    &-title
        width 100%
        margin-bottom 10px

    &-time
        width 100%
        font-size 1.2rem
        margin-bottom 5px

        @media $medium-up
            font-size 1.4rem
            margin-bottom 10px

    &-tags
        font-size 1.2rem
        margin-top auto

        @media $medium-up
            font-size inherit
            font-weight 600

        span
            &:after
                content ' '

    //cross-component .Image
    &-image
        max-width 100%
        flex 1 0 350px
        overflow hidden

        @media $small-wide-up
            max-width 200px

        @media $medium-up
            max-width 350px

        &:before
            padding-bottom percentage((210 / 350))

    &:hover
        .ArticleCard-card
            &:before
                box-shadow 0px 4px 20px 0 rgba($black, .12)
                transform scaleY(.96)

        .ArticleCard-content
            box-shadow none
</style>
