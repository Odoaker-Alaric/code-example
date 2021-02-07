<template>
    <main>
        <div class="PageHeader PageHeader--appended">
            <h1 class="PageHeader-title Alpha">Blog</h1>
        </div>
        <section class="Section">
            <div class="Container">
                <ArticleList :articles="articles" v-if="articles"></ArticleList>
            </div>
        </section>
    </main>
</template>

<script>
import { fetchItems } from '@/api'
import ArticleList from '@/components/article/ArticleList'

export default {
    head() {
        return {
            title: 'Blog',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Articles about frontend web developement - javascript, vanillaJS, vueJS and general tips and tricks'
                }
            ]
        }
    },
    components: {
        ArticleList,
    },
    asyncData({ params, error }) {
        return fetchItems('articles', {
            params: {
                fields: 'id,title,slug,tags,publish_date,main_image.data.thumbnails',
            },
        })
            .then((res) => {
                return { articles: res.data.data }
            })
            .catch((e) => {
                // error({ statusCode: 404, message: "Articles not found" })
            })
    },
    data() {
        return {
            articles: [],
        }
    },
}
</script>

<style lang="stylus"></style>
