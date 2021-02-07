<template>
    <div class="Main">
        <div class="Main-statusBar">
            <GlobalStatus />
            <UserSetting />
        </div>
        <div class="Main-group">
            <div class="Main-column Main-column--first">
                <div class="Main-cell Main-cell--group">
                    <CellGroup />
                </div>
                <div class="Main-cell Main-cell--cut" v-for="cut in pictureStore.getters.cuts" :key="cut.id">
                    <CellCut :cut-id="cut.id" />
                </div>
                <div class="Main-cell">
                    <CellCutAdd />
                </div>
            </div>

            <div class="Main-scrollable">
                <div class="Main-column" v-for="picture in pictureStore.getters.pictures" :key="picture.id">
                    <div class="Main-cell Main-cell--picture">
                        <CellPicture :picture-id="picture.id" />
                    </div>
                    <div class="Main-cell Main-cell--pictureCut" v-for="pictureCut in picture.pictureCuts" :key="pictureCut.id" @click="openEditor(picture.id, pictureCut.cut.id)">
                        <CellPictureCut :picture-id="picture.id" :cut-id="pictureCut.cut.id" />
                    </div>
                </div>
            </div>

            <div class="Main-column Main-column--last">
                <div class="Main-cell Main-cell--uploader">
                    <Uploader />
                </div>
            </div>
        </div>

        <Editor class="Main-editor" v-if="isEditorActive" :cut-id="currentCutId" :picture-id="currentPictureId" @close="handleEditorClose" />
        <Helper v-if="userSettingStore.getters.userSetting.helper.isVisible"/>
    </div>
</template>

<script>
import Editor from "@/components/Editor"
import CellCut from "@/components/CellCut"
import CellCutAdd from "@/components/CellCutAdd"
import CellGroup from "@/components/CellGroup"
import CellPicture from "@/components/CellPicture"
import CellPictureCut from "@/components/CellPictureCut"
import GlobalStatus from "@/components/GlobalStatus"
import Helper from "@/components/Helper"
import Uploader from "@/components/Uploader"
import UserSetting from "@/components/UserSetting"
import {pictureStore, userSettingStore} from "@/store"
import EventBus, {EVENTS} from '@/plugins/EventBus'

export default {
    name: "Main",
    components: {
        Editor,
        CellCut,
        CellCutAdd,
        CellGroup,
        CellPicture,
        CellPictureCut,
        GlobalStatus,
        Helper,
        Uploader,
        UserSetting
    },
    data() {
        return {
            isEditorActive: false,
            currentPictureId: null,
            currentCutId: null,
        }
    },
    computed: {
        pictureStore() {
            return pictureStore
        },
        userSettingStore() {
            return userSettingStore
        }
    },
    methods: {
        handleEditorClose() {
            this.isEditorActive = false
            EventBus.emit(EVENTS.EDITOR_CLOSED)
        },
        openEditor(pictureId, cutId) {
            this.currentPictureId = pictureId
            this.currentCutId = cutId
            this.isEditorActive = true
            EventBus.emit(EVENTS.EDITOR_OPENED)
        },
    },
}
</script>

<style lang="stylus">
.Main
    height 100%
    padding 20px 20px 50px 20px
    overflow-x hidden
    overflow-y auto

    &-statusBar
        margin-bottom 15px
        display flex
        justify-content space-between

    &-scrollable
        display flex
        overflow auto

    &-group
        display flex

    &-column
        & + &
            margin-left -1px

        &--last
            flex 1 0 auto

    &-cell
        width 200px
        height 200px
        margin-bottom 20px

        > *
            margin -1px

        &--cut, &--pictureCut
            height 150px

        &--group, &--cut
            width 250px

        &--pictureCut
            border 1px solid $color2
            cursor pointer
            position relative

            &:hover
                border-color $color3
                z-index 1

        &--uploader
            display flex
            align-items center
            width auto
            padding 30px

            .Uploader-inner
                opacity .2

                &:hover
                    opacity 1

        &--picture, &--group, &--uploader
            margin-bottom 40px
            position relative

            &:before, &:after
                content ''
                position absolute
                display block
                height 1px
                width 100%
                left 0
                background $color2

            &:before
                top 0

            &:after
                bottom 0

        &--group, &--uploader
            &:before, &:after
                width 200%
                left -50%

    //cross-component .Editor
    &-editor
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 2
</style>
