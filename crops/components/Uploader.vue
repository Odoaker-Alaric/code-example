<template>
    <label
        class="Uploader"
        :class="{
            'is-dragover': isDragOver,
        }"
    >
        <div class="Uploader-dropzone" @dragover="handleDragover" @dragleave="handleDragleave" @drop="handleDrop">
            Drop it!
        </div>
        <div class="Uploader-inner">
            <input type="file" @change="handleInputChange" multiple ref="input" />
            <span class="Uploader-label">
                Drop your images here!
                <small>*.jpg, *.png</small>
            </span>
            <svg viewBox="0 0 1920 1080" preserveAspectRatio="none">
                <rect
                    style="fill:none;stroke:#EFEBEB;stroke-width:4;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:11, 46.2009;stroke-dashoffset:0"
                    rx="20"
                    y="5.5"
                    x="5.5"
                    height="1060"
                    width="1900"
                />
            </svg>
        </div>
    </label>
</template>

<script>
import {pictureStore} from "@/store"

export default {
    data() {
        return {
            isDragOver: false,
        }
    },
    mounted() {
        window.addEventListener('dragover', this.handleWindowDragover)
    },
    unmounted() {
        window.removeEventListener('dragover', this.handleWindowDragover)
    },
    methods: {
        handleWindowDragover(event) {
            event.preventDefault()
            this.isDragOver = true
        },
        handleDragleave() {
            this.isDragOver = false
        },
        handleDrop(event) {
            event.preventDefault()
            this.isDragOver = false
            this.$refs.input.files = event.dataTransfer.files
            this.processInputFiles()
        },
        handleInputChange(event) {
            this.processInputFiles()
        },

        processInputFiles() {
            const files = [...this.$refs.input.files]

            if (files.length === 0) {
                return
            }

            files.forEach((file) => {
                let reader = new FileReader()
                const image = new Image()
                image.src = window.URL.createObjectURL(file)
                image.crossOrigin = "Anonymous"
                image.onload = () => {
                    pictureStore.addPicture({
                        id: "_" + Math.random().toString(36).substr(2, 9),
                        filename: file.name.split(".")[0].split("@")[0],
                        src: image.src,
                        width: image.width,
                        height: image.height,
                    })
                }
            })

            this.$refs.input.value = ""
        },
    },
    computed: {
        pictureStore: () => pictureStore,
    },
}
</script>

<style lang="stylus">
.Uploader
    display block
    color $color10
    cursor pointer
    position relative
    text-align center
    border-radius 5px

    &-inner
        display flex
        align-items center
        justify-content center
        width 100%
        height 100%
        padding 20px
        position relative


        svg
            width 100%
            height 100%
            position absolute

        rect
            transition .2s all ease-out

    &-dropzone
        visibility hidden
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        display flex
        align-items center
        justify-content center
        font-size 4rem
        z-index 99
        opacity 0
        color $color1
        background rgba($color5,.95)
        transition .2s opacity, 0s visibility .2s

    &-label
        small
            color $color7
            display block
            font-size .6em
            margin-top 10px

    input
        position absolute
        top 0
        left 0
        opacity 0

    &.is-dragover
        .Uploader-dropzone
            transition .2s opacity, .2s visibility
            visibility visible
            opacity 1


    &:hover
        background $color2

        rect
            stroke-dasharray 0 !important


</style>