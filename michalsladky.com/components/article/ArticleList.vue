<template>
    <div class="ArticleList">
        <ArticleCard v-for="(article, index) in articles" :key="index" :article="article"></ArticleCard>
    </div>
</template>

<script>
import ArticleCard from './ArticleCard'

export default {
    components: { ArticleCard },
    props: {
        articles: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="stylus">
.ArticleList
    .ArticleCard
        margin-bottom 35px
</style>