<template>
    <div class="project-Slider">
        <div class="project-Slider-slider" ref="slider">
            <div class="project-Slider-sliderItem" v-for="(item, index) in items" :key="index"></div>
        </div>
        <button class="project-Slider-buttonSwipe" @click="handleButtonSwipeClick">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.735 40.436">
                <g>
                    <path d="M126.567 67.656c-8.78 6.726-20.431 10.688-32.598 12.236a92.694 92.694 0 01-6.463.578c.1-2.255.205-4.51.315-6.764a81.367 81.367 0 01-6.488 4.983 69.869 69.869 0 01-4.252 2.735c-.395.233-.795.462-1.205.683-.106.058-.215.114-.326.17a2.444 2.444 0 01-.087.04c-.06.071-.122-.111-.166-.602.03.521.08.785.127.763l.067.051.25.187c.315.237.631.47.946.699a79.267 79.267 0 003.611 2.46 94.246 94.246 0 009.742 5.478 155.612 155.612 0 01-2.045-6.628c2-.114 3.988-.29 5.962-.526 13.005-1.535 25.6-5.819 35.286-13.221a164.764 164.764 0 01-2.676-3.322z" fill="#1a0c02" transform="translate(-75.297 -67.656)"/>
                </g>
            </svg>
        </button>
        <article class="project-Slider-item" :class="{ 'is-selected': currentIndex === index }" v-for="(item, index) in items" :key="index" :style="item.style">
            <ProjectSliderCard :project="item.data" :style="item.cardStyle"></ProjectSliderCard>
        </article>
        <div class="project-Slider-svg" ref="svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 500">
                <path d="M402.681 250.143c-52.834-43.512-71.286-119.701 216.4-115.726 190.974 2.639 376.215 51.15 439.716 70.03 78.022 23.199 139.746 45.696 139.746 75.137 0 57.474-139.658 85.294-256.183 85.286-212.033-.013-456.916-46.568-539.679-114.727z" fill="none" stroke="#000" stroke-width="1.009" />
            </svg>
        </div>

    </div>
</template>

<script>
import ProjectSliderCard from '@/components/project/ProjectSliderCard'
import { getPath, getPathProgress, progressHelper, normalize, getValueOfProgress } from '~/plugins/path-flickity'
import EventBus, { EVENTS } from '@/plugins/EventBus'

export default {
    name: 'ProjectSlider',
    components: {
        ProjectSliderCard,
    },
    props: {
        projects: {
            required: true,
        },
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
            activeProject: null,
            currentIndex: 0,
            items: []
        }
    },
    mounted() {
        this.projects.forEach(project =>
            this.items.push({
                data: project,
                style: {},
                cardStyle: {}
            })
        )

        this.path = getPath(this.$refs.svg.querySelector('path'), 100)

        this.$nextTick(() => {
            this.flickity = new this.$flickity(this.$refs.slider, {
                prevNextButtons: false,
                wrapAround: true,
                selectedAttraction: 0.015,
                friction: 0.3,
            })
            this.flickity.on('scroll', (progress) => this.handleFlickityProgress(progress))
            this.flickity.on('select', (index) => (this.currentIndex = index))

        })

        this.render(0)


        //DEBUGGING
        EventBus.$on('set-slider-progress', progress => {
            this.render(progress)
        })
        EventBus.$on('set-slider-items-count', count => {
            this.items = []
            for (let index = 0, projectIndex = 0; index < count; index++) {
                let project = this.projects[projectIndex]
                if (!project) {
                    projectIndex = 0
                }
                project = this.projects[projectIndex]

                this.items.push({
                    data: project,
                    style: {},
                    cardStyle: {}
                })

                projectIndex += 1
            }
        })
        //DEBUGGING-END
    },
    methods: {
        handleButtonSwipeClick(event) {
            event.preventDefault()

            this.flickity.next()
        },

        handleFlickityProgress(progress) {
            progress = ((progress * (this.flickity.cells.length - 1)) / this.flickity.cells.length + 1) % 1
            this.render(progress)
        },

        render(progress) {
            const length = this.path().totalLength

            // sliderProgress != pathProgress... EXAMPLE:
            // -
            // slider progress:         |*-------*-------*-------*-------*-------*|
            // visual progress on path: |*---------------*--*---*----*-----------*|
            const progressShiftValues = normalize([
                [0, 0],

                // [0.1, 0.30],
                [0.2, 0.35],
                [0.4, 0.4],
                [0.5, 0.42],
                [0.7, 0.46],
                [0.85, 0.54],
                // [0.9, 0.8],

                [1, 1],
            ])


            const scaleValues = normalize([
                [0, 1],

                [0.2, 0.32],
                [0.45, 0.42],
                [0.55, 0.65],

                [1, 1],
            ])

            //shiftedProgress .20 - .55, generate every .1% progress higher zIndex
            const zIndexSteps = []
            for (let index = 0; index < 37; index++) {
                zIndexSteps.push([.2+.01*index, index+1])
            }
            const zIndexValues = normalize([
                [0, 38],

                ...zIndexSteps,

                [1, 38],
            ])


            // progressHelper(`FULL:${(progress * 100).toFixed(2)}%`, "FULL")

            this.items.forEach((item, index) => {
                const offset = index * 1/this.items.length
                const normalizedProgress = (offset + progress + 1) % 1
                const shiftedProgress = getValueOfProgress(normalizedProgress, progressShiftValues)

                const pathProgress = shiftedProgress * length
                const scale = getValueOfProgress(shiftedProgress, scaleValues)
                const zIndex = Math.floor(getValueOfProgress(shiftedProgress, zIndexValues))

                item.style = {
                    zIndex,
                    transform: `
                        translateX(${getPathProgress(this.path('x'), pathProgress)}px)
                        translateY(${getPathProgress(this.path('y'), pathProgress)}px)
                        `,
                }

                item.cardStyle = {
                    transform: `translate(-50%,-50%) scale(${scale})`,
                }
            })
        },
    },
}
</script>

<style lang="stylus">
.project-Slider
    position relative
    max-width 1440px
    margin 0 auto

    &:before
        content ''
        display block
        padding-bottom percentage((500 / 1440))

    &-item
        width percentage((800 / 1440))
        position absolute
        top 0
        left 0
        will-change transform
        cursor pointer

    &-svg
        svg
            position absolute
            top 0
            left 0
            width 100%
            opacity 0

    &-slider
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background red
        display flex
        opacity 0
        z-index 99

        @media $medium-up
            z-index 37


        &.flickity-enabled
            display block

        &:hover + .project-Slider-buttonSwipe
            opacity 1



    &-sliderItem
        flex 0 0 100%
        width 100%
        height 100%
        opacity .1
        background blue

        &:nth-child(odd)
            background red

        .flickity-slider
            transform none !important

    &-buttonSwipe
        position absolute
        z-index 37
        top 100%
        background none
        margin-top -2%
        right 0
        margin-right 0%
        padding 50px 0 0 50px
        width 300px
        opacity 0
        filter drop-shadow(2px 2px 10px #fff)
        transition .3s opacity, .3s transform
        transform-origin 100% 0
        display none
        outline none
        cursor pointer

        @media $medium-up
            display block

        &:hover
            opacity 1
            transform translate(5px, -10px) scale(1.06)

</style>