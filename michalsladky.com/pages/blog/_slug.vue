<template>
    <div class="Container Container--slim">
        <article class="ArticleDetail" v-if="article">
            <header class="ArticleDetail-header">
                <div class="ArticleDetail-image">
                    <img class="is-lazy" :data-src="thumbnail.url" :data-srcset="thumbnailRetina.url + ' 2x'" alt />
                    <time class="ArticleDetail-time">
                        <span>{{ new Date(article.publish_date) | date }}</span>
                    </time>
                </div>
                <aside class="ArticleDetail-tags">
                    <span v-for="(tag, index) in tags" :key="index">#{{ tag }}</span>
                </aside>
            </header>
            <h1 class="ArticleDetail-title Beta">{{ article.title }}</h1>
            <div class="ArticleDetail-content Text" v-html="article.content"></div>
        </article>
    </div>
</template>


<script>
import axios from 'axios'
import { apiURL } from '@/project.config'

export default {
    head() {
        return {
            title: this.article.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.article.meta_description
                }
            ]
        }
    },
    // validate({ params }) {
    //     return /^\d+$/.test(params.slug)
    // },
    asyncData({ params, error }) {
        return axios
            .get(`${apiURL}/items/articles`, {
                params: {
                    single: 1,
                    'filter[slug][eq]': params.slug,
                    fields: 'id,title,content,meta_description,tags,publish_date,main_image.data.thumbnails',
                },
            })
            .then((res) => {
                return { article: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Article not found' })
            })
    },
    data() {
        return {
            article: null,
        }
    },
    computed: {
        tags() {
            return this.article.tags.filter((tag) => tag)
        },
        thumbnail() {
            const thumbnail = this.article.main_image.data.thumbnails.find((thumbnail) => thumbnail.dimension === '900x450')
            return thumbnail
        },
        thumbnailRetina() {
            const thumbnail = this.article.main_image.data.thumbnails.find((thumbnail) => thumbnail.dimension === '1170x585')
            return thumbnail
        },
    },
}
</script>

<style lang="stylus">
.ArticleDetail
    margin-bottom 120px

    @media $xxxlarge-up
        margin-top -60px

    &-image
        position relative

        &:before
            content ''
            display block
            padding-bottom percentage((450 / 900))

        img
            position absolute
            top 0
            left 0
            width 100%
            height 100%

    &-header
        position relative
        margin-bottom 30px
        filter drop-shadow(0 14px 15px rgba(0, 0, 0, .2))

        @media $medium-up
            margin-bottom 60px

    &-time
        position absolute
        padding-top 10px
        left -10px
        bottom 30px
        line-break 1.2
        color white
        background $brown
        padding 3px 10px 3px 20px
        font-size 1.4rem
        font-family $font-worksans

        @media $medium-up
            left -40px

        &:before
            content ''
            display block
            position absolute
            top 0
            right -15px
            width 50%
            height 100%
            background $brown
            transform skew(36deg)

        span
            position relative

    &-title
        font-family $font-worksans
        margin-bottom 30px

        @media $medium-up
            padding-left 25px

        @media $large-up
            padding-left 50px

    &-content
        max-width 800px

        @media $medium-up
            padding-left 25px

        @media $large-up
            padding-left 50px

    &-tags
        max-width 800px
        margin 15px 0
        line-height 1.4
        font-weight bold

        @media $medium-up
            text-align right
            padding 0 25px

        @media $xlarge-up
            text-align left
            margin 0
            position absolute
            bottom 30px
            left calc(100% + 30px)

        span
            display inline-block

            &:after
                content ' '
                width 10px
                display inline-block

            @media $xlarge-up
                display block

                &:after
                    content none
</style>