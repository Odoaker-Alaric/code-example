<template>
    <main>
        <section class="Section Section--appended SectionHomepageHero">
            <div class="Section-arrow Section-arrow--top"></div>
            <div class="Container Container--wide">
                <Hero></Hero>
            </div>
            <div class="Section-arrow Section-arrow--right Section-arrow--bottom"></div>
        </section>

        <section id="about" class="Section SectionHomepageAbout">
            <div class="Container Container--slim">
                <h2 class="Section-title Beta">Hello</h2>
                <p>and welcome to my site. I'm the one who makes your design and ideas come to life.</p>
                <p>Since 2018 I've entered the world of professional web developement as a frontend developer while exploring the design, backend and devops part as well. What I care of most, is the structure, consistency and simple and straightforward use of the final product. The same applies to the code I produce.</p>
                <div class="Section-footer">
                    <nuxt-link to="about" class="Button is-el">
                        <span class="Button-content">More about me</span>
                    </nuxt-link>
                </div>
            </div>
        </section>

        <section id="portfolio" class="Section SectionHomepageProjects">
            <div class="Section-arrow Section-arrow--top"></div>

            <!-- <h2 class="Section-title Beta">Projects</h2> -->
            <div class="Container Container--wide">
                <ProjectSlider :projects="projects"></ProjectSlider>
            </div>

            <div class="Section-arrow Section-arrow--right Section-arrow--bottom"></div>
        </section>

        <!-- <PathSliderHelper /> -->
    </main>
</template>

<script>
import { fetchItems } from '@/api'
import ProjectSlider from '@/components/project/ProjectSlider'
// import PathSliderHelper from '@/components/PathSliderHelper'
import Hero from '@/components/Hero'

export default {
    head() {
        return {
            title: 'Michal Sladký - frontend developer',
            titleTemplate: null,
        }
    },
    components: {
        // PathSliderHelper,
        ProjectSlider,
        Hero,
    },
    asyncData({ params, error }) {
        return fetchItems('projects', {
            params: {
                fields: 'id,title,slug,card_description,main_image.data.thumbnails',
            },
        })
            .then((res) => {
                return { projects: res.data.data }
            })
            .catch((e) => {
                // error({ statusCode: 404, message: "Projects not found" })
            })
    },
    data() {
        return {
            projects: [],
        }
    },
}
</script>

<style lang="stylus">
.SectionHomepageHero
    padding-bottom 40px

    .Section-arrow
        &--top
            transform scale(1.1)
            top auto
            bottom 300px
            left -500px

            @media $medium-max
                display none

            @media $xxlarge-up
                bottom 400px
                left -450px

        &--bottom
            bottom -60px
            transform scale(2)
            right -600px

            @media $xxlarge-up
                transform scale(3)
                right -500px

.SectionHomepageAbout
    @media $xlarge-up
        padding-top 130px

.SectionHomepageProjects
    .Container
        max-width 1700px

    .Section-arrow
        &--top
            left -300px

            @media $xlarge-up
                left -150px

        &--bottom
            border-width 250px 130vw 0 0
            right auto
            left -20vw
            bottom -2px
            filter none

    .Section-title
        text-align center
        opacity .25

        @media $xlarge-up
            margin-bottom 150px

    .project-Slider
        margin-right -40%

        @media $medium-up
            position relative
            z-index 1
            margin-right -15px
</style>
