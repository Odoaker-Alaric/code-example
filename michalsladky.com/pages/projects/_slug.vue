<template>
    <div class="Container Container--slim">
        <article class="ProjectDetail" v-if="project">
            <h1 class="ProjectDetail-title Alpha">{{project.title}}</h1>
            <div class="ProjectDetail-image">
                <img class="is-lazy" :data-src="thumbnail.url" alt="Website preview" />
            </div>
            <a class="ProjectDetail-url" :href="project.url" target="_blank" rel="noopener noreferrer">{{project.url}}</a>
        </article>
    </div>
</template>


<script>
import axios from 'axios'
import { apiURL } from '@/project.config'

export default {
    head() {
        return {
            title: this.project.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Projekt'
                }
            ]
        }
    },
    // validate({ params }) {
    //     return /^\d+$/.test(params.slug)
    // },
    asyncData({ params, error }) {
        return axios
            .get(`${apiURL}/items/projects`, {
                params: {
                    single: 1,
                    'filter[slug][eq]': params.slug,
                    fields: 'id,title,url,slug,main_image.data.thumbnails',
                },
            })
            .then((res) => {
                return { project: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Project not found' })
            })
    },
    data() {
        return {
            project: null,
        }
    },
    computed: {
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
.ProjectDetail
    text-align center
    padding-bottom 100px

    &-title
        font-family $font-worksans
        margin-bottom 20px

    &-image
        position relative

        &:before
            content ''
            padding-bottom percentage(500/800)
            display block

        img
            position absolute
            top 0
            left 0
            width 100%

    &-url
        text-align center
        text-decoration underline
        margin-top 10px
        display inline-block



</style>