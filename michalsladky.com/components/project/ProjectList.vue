<template>
    <div class="project-List">
        <ProjectSliderCard v-for="(project, index) in projects" :key="index" :project="project" />
    </div>
</template>

<script>
import ProjectSliderCard from './ProjectSliderCard'

export default {
    components: { ProjectSliderCard },
    props: {
        projects: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="stylus">
.project-List
    display flex
    flex-flow row wrap

    .project-SliderCard
        margin 15px
        position relative
        width calc(50% - 30px)
</style>