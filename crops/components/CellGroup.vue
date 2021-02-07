<template>
    <div class="CellGroup">
        <button name="cellgroup-removeall" class="CellGroup-button Button Button--red Button--invert Button--hasIcon">
            <IconTrash />
            Remove all
        </button>
        <button class="CellGroup-button CellGroup-button--download Button Button--hasIcon" @click="handleDownloadAllClick" :disabled="!hasPictureStoreAnyExportConf">
            <IconDownload />
            Download all cuts
        </button>
        <span class="Info ml-10" v-tippy="{ignoreAttributes: true, content: 'Add at least 1 \'export size\' to download', placement: 'right'}" v-if="!hasPictureStoreAnyExportConf"></span>
        <button name="cellgroup-templates" class="CellGroup-button Button Button--grey">Templates</button>

        <Tippy to="cellgroup-templates" trigger="click" placement="right">
            <TemplatePicker />
        </Tippy>
        <Tippy to="cellgroup-removeall" trigger="click" placement="right">
            <button class="Button Button--grey Button--invert" data-close>No</button>
            <button class="Button Button--red" @click="handleRemoveAllClick">Yes - delete all</button>
        </Tippy>
    </div>
</template>

<script>
import {pictureStore} from "@/store"
import IconDownload from "@/components/icons/IconDownload"
import TemplatePicker from "@/components/TemplatePicker"
import IconTrash from "@/components/icons/IconTrash"
import tippy from "tippy.js"

export default {
    components: {
        IconDownload,
        IconTrash,
        TemplatePicker,
    },
    computed: {
        pictureStore: () => pictureStore,
        hasPictureStoreAnyExportConf: () => pictureStore.getters.exportConfs.length > 0,
    },
    methods: {
        handleRemoveAllClick(e) {
            pictureStore.removeCropAll()
            pictureStore.removePictureAll()
            pictureStore.removeCutAll()
        },
        handleDownloadAllClick() {
            pictureStore.downloadPictureAll()
        },
    },
}
</script>

<style lang="stylus" scoped>
.CellGroup
    padding-top 5px
    height 100%

    &:hover, &:focus-within
        &>*
            opacity 1 !important

    &>*:not(.CellGroup-button--download)
        opacity .2

    //cross-component
    &-button
        margin-bottom 5px
</style>