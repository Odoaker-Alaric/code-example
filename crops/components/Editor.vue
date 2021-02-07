<template>
    <div class="Editor">
        <div class="Editor-header">
            <button name="editor-back" class="Button Button--grey Button--invert mr-10">Back without saving</button>
            <button class="Button" @click="handleSaveClick">Save</button>
            <PictureStatus v-if="picture && cut && tempCrop" :picture="picture" :cut="cut" :crop="tempCrop" />
        </div>

        <div class="Editor-editor" ref="editor"></div>

        <Tippy to="editor-back" trigger="click" placement="bottom">
            <button class="Button Button--grey Button--invert" data-close>No</button>
            <button class="Button Button--green Button--invert" @click="handleBackClick">Yes - revert any changes</button>
        </Tippy>
    </div>
</template>

<script>
import {Editor, PictureInEditor} from "@/plugins/editor"
import {pictureStore} from "@/store"
import PictureStatus from "@/components/PictureStatus"
import {getEventMousePos} from '@/plugins/utils/Mouse'

export default {
    components: {
        PictureStatus,
    },
    emits: ["close"],
    props: {
        pictureId: {
            type: String,
            required: true,
        },
        cutId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            tempCrop: null,
        }
    },
    mounted() {
        this.clientX = 0
        this.clientY = 0
        this.editor = new Editor(this.$refs.editor)
        const picture = this.picture
        const cut = this.pictureCut.cut
        let crop = this.pictureCut.crop

        //prevent mutation for saving/revert purposes
        if (crop) {
            crop = {...crop}
        }

        this.tempCrop = crop
        this.pictureInEditor = new PictureInEditor(this.editor, picture, cut, crop)
        this.editor.addNode(Object.values(this.pictureInEditor.nodes))
        this.pictureInEditor.nodes.picture.on("_all", () => {
            this.tempCrop = {
                ...this.pictureInEditor.crop,
            }
        })

        window.addEventListener("keypress", this.handleKeyPress)
        window.addEventListener("keydown", this.handleKeyDown)
        window.addEventListener("mousemove", this.handleMouseMove)
    },
    unmounted() {
        window.removeEventListener("mousemove", this.handleMouseMove)
        window.removeEventListener("keypress", this.handleKeyPress)
        window.removeEventListener("keydown", this.handleKeyDown)
        this.editor.destroy()
    },
    methods: {
        handleKeyPress(event) {
            this.processKeyboardEvent(event)
        },
        handleKeyDown(event) {
            this.processKeyboardEvent(event)
        },
        handleMouseMove(event) {
            this.clientX = getEventMousePos(event, 'x')
            this.clientY = getEventMousePos(event, 'y')
        },
        processKeyboardEvent(event) {
            let modifier = 1
            if (event.ctrlKey) {
                modifier *= 10
            }

            switch (event.key) {
                case ' ':
                    this.pictureInEditor.nodes.picture.resizeEnd()
                    this.pictureInEditor.nodes.picture.moveEnd()
                    break
                case 'm':
                case 'M':
                    this.pictureInEditor.nodes.picture.resizeEnd()
                    this.pictureInEditor.nodes.picture.moveStart({
                        handle: 'SE',
                        mouse: {
                            x: this.clientX,
                            y: this.clientY
                        }
                    })
                    break
                case 'r':
                case 'R':
                    this.pictureInEditor.nodes.picture.moveEnd()
                    this.pictureInEditor.nodes.picture.resizeStart({
                        handle: 'SE',
                        mouse: {
                            x: this.clientX,
                            y: this.clientY
                        }
                    })
                    break
                case 'ArrowUp':
                    this.pictureInEditor.nodes.picture.setState({
                        y: `-=${1*modifier}`
                    })
                    break
                case 'ArrowDown':
                    this.pictureInEditor.nodes.picture.setState({
                        y: `+=${1*modifier}`
                    })
                    break
                case 'ArrowLeft':
                    this.pictureInEditor.nodes.picture.setState({
                        x: `-=${1*modifier}`
                    })
                    break
                case 'ArrowRight':
                    this.pictureInEditor.nodes.picture.setState({
                        x: `+=${1*modifier}`
                    })
                    break
                case '+':
                    this.pictureInEditor.nodes.picture.setState({
                        x: '-=5',
                        y: `-=${this.picture.height/this.picture.width*5}`,
                        width: '+=10',
                        height: `+=${this.picture.height/this.picture.width*10}`
                    })
                    break
                case '-':
                    this.pictureInEditor.nodes.picture.setState({
                        x: '+=5',
                        y: `+=${this.picture.height/this.picture.width*5}`,
                        width: '-=10',
                        height: `-=${this.picture.height/this.picture.width*10}`
                    })
                    break
            }
        },
        handleBackClick() {
            this.$emit("close")
        },
        handleSaveClick() {
            const index = pictureStore.getters.crops.findIndex((crop) => crop.pictureId === this.pictureId && crop.cutId === this.cutId)
            if (index !== -1) {
                pictureStore.getters.crops.splice(index, 1)
            }

            pictureStore.getters.crops.push({
                pictureId: this.pictureId,
                cutId: this.cutId,
                ...this.pictureInEditor.crop,
            })

            this.$emit("close")
        },
    },
    computed: {
        pictureStore: () => pictureStore,
        picture() {
            return pictureStore.findPictureById(this.pictureId)
        },
        pictureCut() {
            return this.picture.pictureCuts.find(pictureCut => pictureCut.cut.id === this.cutId)
        },
        cut() {
            return this.pictureCut.cut
        },
        crop() {
            return this.pictureCut.crop
        }
    },
}
</script>

<style lang="stylus">
.Editor
    background $color1

    &-header
        display flex
        align-items center
        position relative
        z-index 88888888
        padding 10px
        height 50px
        background $color2

    &-editor
        position relative
        width 100%
        height calc(100vh - 50px)
        background rgba(0, 0, 0, .3)
        overflow hidden
        border 1px solid black

        &:hover, &.is-node-resizing, &.is-node-moving
            overflow visible

            .Crop
                box-shadow none
                outline 1px solid red

    &-reachArea
        content ''
        position absolute
        padding 20px

.Crop
    box-shadow 0 0 0 5000px $color1

.EditorNode
    position absolute

    &-item, &-resizer, &-item > *
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        width 100%
        height 100%
        box-sizing content-box

    &-resizer
        margin -2px
        border 2px dashed red

    &-handle
        width 6px
        height 6px
        background red
        display block
        position absolute

        &--NW
            top -4px
            left -4px
            cursor nwse-resize

        &--NE
            top -4px
            right -4px
            cursor nesw-resize

        &--SW
            left -4px
            bottom -4px
            cursor nesw-resize

        &--SE
            bottom -4px
            right -4px
            cursor nwse-resize

    &:not(.is-resizable)
        .EditorNode-resizer
            display none

    &:not(.is-movable)
        pointer-events none
</style>