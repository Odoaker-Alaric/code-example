<template>
    <div
        class="CellPictureCut"
        :class="{
            'is-warning': isPictureStatusWarning,
        }"
    >
        <div class="CellPictureCut-imageWrap">
            <div
                class="CellPictureCut-image"
                :style="{
                    width: `${cut.height / cut.width > 2 / 3 ? ((cut.width * 3) / 2) * (cut.height / cut.width) : cut.width}px`,
                    maxWidth: `${cut.height / cut.width > 2 / 3 ? (cut.width / cut.height / 3) * 2 * 100 : '100'}%`,
                }"
            >
                <div
                    :style="{
                        paddingBottom: `${(cut.height / cut.width) * 100}%`,
                    }"
                ></div>
                <img
                    :src="picture.src"
                    style="position: absolute; max-width: none"
                    :style="{
                        width: `${(picture.width / crop.width) * 100}%`,
                        top: `${(-crop.y / crop.height) * 100}%`,
                        left: `${(-crop.x / crop.width) * 100}%`,
                    }"
                />
            </div>
        </div>

        <PictureStatus v-if="picture" class="CellPictureCut-pictureStatus" :picture="picture" :cut="cut" :crop="crop" @update="handlePictureStatusUpdate" />
    </div>
</template>

<script>
import PictureStatus, {NORMALIZED_MODIFIERS} from "@/components/PictureStatus"
import {pictureStore} from "@/store"

export default {
    components: {
        PictureStatus,
    },
    props: {
        pictureId: {
            required: true,
        },
        cutId: {
            required: true,
        },
    },
    data() {
        return {
            isPictureStatusWarning: false
        }
    },
    computed: {
        NORMALIZED_MODIFIERS: () => NORMALIZED_MODIFIERS,
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
    methods: {
        handlePictureStatusUpdate(data) {
            this.isPictureStatusWarning = data.isWarning
        }
    }
}
</script>

<style lang="stylus" scoped>
.CellPictureCut
    display flex
    align-items center
    justify-content center
    height calc(100% + 2px)
    padding 20px 20px 5px
    position relative

    &-imageWrap
        display flex
        align-items center
        justify-content center
        max-width 100%
        max-height 100%
        flex 0 0 auto
        height auto
        width auto

    &-image
        position relative
        overflow hidden

        img
            position absolute

    &-pictureStatus
        position absolute
        top 5px
        right 5px

    &.is-warning
        border 1px solid $red
</style>