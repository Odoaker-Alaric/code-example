<template>
    <div class="CellPicture">
        <button :name="`cellpicture-remove-${picture.id}`" class="CellPicture-removeButton Button Button--icon Button--transparent">
            <IconTrash />
        </button>
        <InputText class="CellPicture-input" :modelValue="picture.filename" @update:modelValue="value => updatePictureProp('filename', value)" />
        <div class="CellPicture-image">
            <img :src="picture.src" />
            <div class="CellPicture-controls">
                <button class="CellPicture-downloadButton Button Button--green Button--icon" @click="handleDownloadClick">
                    <IconDownload />
                </button>
            </div>
        </div>

        <Tippy :to="`cellpicture-remove-${picture.id}`" trigger="click" placement="right">
            <button class="Button Button--grey Button--invert" data-close>No</button>
            <button class="Button Button--red" @click="handleRemoveClick">Yes - remove picture</button>
        </Tippy>
    </div>
</template>

<script>
import {pictureStore} from "@/store"
import IconDownload from "@/components/icons/IconDownload"
import IconTrash from "@/components/icons/IconTrash"
import InputText from "@/components/form/InputText"

export default {
    components: {
        IconDownload,
        IconTrash,
        InputText,
    },
    props: {
        pictureId: {
            type: String,
            required: true,
        },
    },
    computed: {
        pictureStore: () => pictureStore,
        picture() {
            return pictureStore.findPictureById(this.pictureId)
        },
    },
    methods: {
        handleInputFilenameChange(event) {
            this.picture.filename = event.target.value
        },
        handleRemoveClick() {
            pictureStore.removePicture(this.pictureId)
        },
        handleDownloadClick() {
            pictureStore.downloadPicture(this.pictureId)
        },
        updatePictureProp(prop, value) {
            pictureStore.updatePictureProp(this.pictureId, prop, value)
        }
    },
}
</script>

<style lang="stylus" scoped>
.CellPicture
    height 100%
    width 100%
    position relative
    padding 35px 1px 15px
    // opacity .2

    // &:hover, &:focus-within
    //     opacity 1

    //cross-component .InputText
    &-input
        text-align center
        border 0
        padding 0 15px

        &:not(:hover):not(:focus)
            background $color2
            color #fff

    &-image
        position relative
        display flex
        justify-content center
        align-items center
        height calc(100% - 30px)

        img
            flex 0 0 auto
            max-width 100%
            max-height 100%
            width auto
            height auto

    &-controls
        position absolute
        top 5px
        right 0
        bottom 10px
        display flex
        flex-flow column

    &-removeButton
        position absolute
        top 7px
        right 0
</style>