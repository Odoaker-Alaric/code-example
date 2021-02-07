<template>
    <ul class="PictureStatus">
        <li
            class="PictureStatus-item"
            :style="{
                opacity: isCropOutside ? 1 : 0
            }"
            :class="{
                'bg-red': isCropOutside,
            }"
        >
            <IconCropOutside />
        </li>
        <li
            class="PictureStatus-item"
            :class="{
                'color-green': normalizedModifier === NORMALIZED_MODIFIERS.X2,
                'bg-red': normalizedModifier === NORMALIZED_MODIFIERS.LESS_THAN_1,
            }"
        >
            {{ normalizedModifier }}
        </li>
    </ul>
</template>

<script>
import IconCropOutside from "@/components/icons/IconCropOutside"
import {pictureStore} from "@/store"
import {nextTick, toRef} from "vue"

export const NORMALIZED_MODIFIERS = {
    LESS_THAN_1: "<1x",
    X1: "x1",
    X2: "x2",
}

export default {
    components: {
        IconCropOutside,
    },
    props: {
        picture: {
            required: true,
        },
        cut: {
            required: true,
        },
        crop: {
            required: true,
        },
    },
    watch: {
        isCropOutside() {
            this.emitUpdate()
        },
        normalizedModifier() {
            this.emitUpdate()
        },
    },
    computed: {
        NORMALIZED_MODIFIERS: () => NORMALIZED_MODIFIERS,
        pictureStore: () => pictureStore,
        isCropOutside() {
            const contains = (a, b) => {
                return a.x1 <= b.x1 && a.y1 <= b.y1 && a.x2 >= b.x2 && a.y2 >= b.y2
            }

            const pictureCoords = {
                x1: 0,
                y1: 0,
                x2: this.picture.width,
                y2: this.picture.height,
            }

            const cropCoords = {
                x1: this.crop.x,
                y1: this.crop.y,
                x2: this.crop.x + this.crop.width,
                y2: this.crop.y + this.crop.height,
            }

            return !contains(pictureCoords, cropCoords)
        },
        normalizedModifier() {
            const getNormalizedModifier = (value, value2) => {
                const ratio = value2 / value
                if (ratio >= 2) return NORMALIZED_MODIFIERS.X2
                else if (ratio >= 1) return NORMALIZED_MODIFIERS.X1
                else return NORMALIZED_MODIFIERS.LESS_THAN_1
            }

            // const cut = this.picture.cuts.find((cut) => cut.kid === this.cutId)
            return getNormalizedModifier(this.cut.width, this.crop.width)
        },
    },
    mounted() {
        this.emitUpdate()
    },
    methods: {
        emitUpdate() {
            this.$emit("update", {
                isWarning: this.normalizedModifier === NORMALIZED_MODIFIERS.LESS_THAN_1 || this.isCropOutside,
            })
        },
    },
}
</script>

<style lang="stylus">
.PictureStatus
    display flex

    &-item
        width 20px
        height 20px
        display flex
        align-items center
        justify-content center
        margin-left 3px
        border-radius 50%
        font-size 10px
        line-height 2
        font-weight bold
        text-align center
        color #ddd
        padding 3px

        &.is-retina
            color $green

        &.is-upscale
            background $red

    .Icon
        width 100%
        height 100%
</style>