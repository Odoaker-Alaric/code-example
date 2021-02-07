<template>
    <div class="PathSliderHelper">
        <div class="PathSliderHelper-inner">
            <div class="PathSliderHelper-header">
                progress:
                {{progress}},

                items in slider:
                <input type="text" v-model="itemsCount">
            </div>
            <div class="PathSliderHelper-main">
                <div class="PathSliderHelper-track" ref="track">
                    <div class="PathSliderHelper-dragger" :style="draggerStyle" @mousedown="handleDraggerMouseDown"></div>
                </div>
                <div class="PathSliderHelper-sliderTrack" v-if="itemsCount">
                    <div v-for="(item, index) in Array(parseInt(itemsCount) + 1).keys()" :key="index"></div>
                </div>
            </div>
        </div>
        <div class="PathSliderHelper-svg" :style="svgStyle">
            <div class="PathSliderHelper-indicator" :style="indicatorStyle"></div>
        </div>
    </div>
</template>

<script>
import { getPath, getPathProgress, progressHelper, normalize, getValueOfProgress } from '~/plugins/path-flickity'
import EventBus, { EVENTS } from '@/plugins/EventBus'

export default {
    name: 'PathSliderHelper',
    data() {
        return {
            initialMouseX: null,
            trackRect: null,
            isDragging: false,
            draggerStyle: {},
            progress: 0,
            indicatorStyle: {},
            svgStyle: {},
            itemsCount: 1
        }
    },
    mounted() {
        this.trackRect = this.$refs.track.getBoundingClientRect()
        const pathEl = document.querySelector('path')
        this.path = getPath(pathEl, 100)

        const svgEl = pathEl.closest('svg')
        const svgRect = svgEl.getBoundingClientRect()
        this.svgStyle = {
            position: 'fixed',
            zIndex: 9999,
            top: `${svgRect.top}px`,
            left: `${svgRect.left}px`,
            width: `${svgRect.width}px`,
            height: `${svgRect.height}px`,
        }
    },
    watch: {
        itemsCount(val) {
            const count =  parseInt(val) || 1
            EventBus.$emit('set-slider-items-count', count)
            return count
        }
    },
    methods: {
        handleDraggerMouseDown() {
            this.isDragging = true
            this.initialMouseX = this.getEventMousePos(event,'x')
            document.addEventListener('mousemove', this.handleDraggerMouseMove)
            document.addEventListener('mouseup', this.handleDraggerMouseUp)
        },
        handleDraggerMouseUp() {
            this.isDragging = false
            document.removeEventListener('mousemove', this.handleDraggerMouseMove)
            document.removeEventListener('mouseup', this.handleDraggerMouseUp)
        },
        handleDraggerMouseMove(event) {
            if (!this.isDragging) {
                return
            }

            const mouseX = this.getEventMousePos(event,'x')
            const diffMouseX = mouseX - this.initialMouseX

            this.progress = this.progress + (diffMouseX / this.trackRect.width)
            this.initialMouseX = mouseX

            if (this.progress < 0) {
                this.progress = 0
            } else if (this.progress > 1) {
                this.progress = 1
            }

            this.draggerStyle = {
                left: `${this.progress*100}%`
            }

            this.updatePathIndicator()
            EventBus.$emit('set-slider-progress', this.progress)
        },
        updatePathIndicator() {
            this.indicatorStyle = {
                transform: `
                    translateX(${getPathProgress(this.path('x'), this.path().totalLength*this.progress)}px)
                    translateY(${getPathProgress(this.path('y'), this.path().totalLength*this.progress)}px)
                    `,
            }

        },


        getEventMousePos(event, axis) {
            return axis === 'y' ?
            Math.floor((event.clientY ?? event.pageY ?? event.originalEvent.touches[0].clientY) + document.body.scrollTop) :
            Math.floor((event.clientX ?? event.pageX ?? event.originalEvent.touches[0].clientX) + document.body.scrollLeft)
        },







    }

}
</script>

<style lang="stylus">
.PathSliderHelper
    &-inner
        position fixed
        top 0
        left 0
        right 0
        padding 15px 50px
        background #fff
        user-select none

    &-main
        //align-items

    &-dragger
        width 16px
        height 16px
        border-radius 50%
        background #aaa
        position absolute
        top calc(50% - 8px)
        margin-left -8px

    &-track
        position relative
        width 100%
        height 4px
        background #ddd
        margin-bottom 10px

    &-indicator
        height 10px
        width 10px
        background red
        margin -5px 0 0 -5px

    &-sliderTrack
        width 100%
        height 4px
        background #ddd
        display flex
        justify-content space-between

        div
            width 2px
            margin -4px 0 0 -1px
            height 8px
            background #999

</style>