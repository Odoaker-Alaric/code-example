<template>
    <div class="GlobalStatus">
        <span class="GlobalStatus-item" v-if="hasDuplicateExportNames">Duplicate export names!</span>
        <span class="GlobalStatus-item" v-if="hasDuplicateFilenames">Duplicate filenames!</span>
    </div>
</template>

<script>
import {pictureStore} from "@/store"

export default {
    computed: {
        pictureStore() {
            return pictureStore
        },
        exportConfs() {
            const exportConfs = []
            for (const cut of pictureStore.getters.cuts) {
                for (const exportConf of cut.exportConfs) {
                    exportConfs.push(exportConf)
                }
            }
            return exportConfs
        },
        hasDuplicateExportNames() {
            const exportNames = this.exportConfs.map((exportConf) => exportConf.filename)
            return new Set(exportNames).size !== exportNames.length
        },
        hasDuplicateFilenames() {
            const filenames = pictureStore.getters.pictures.map(picture => picture.filename)
            return new Set(filenames).size !== filenames.length
        },
    },
}
</script>

<style lang="stylus">
.GlobalStatus
    font-size 1.2rem
    font-weight bold
    min-height 29px

    &-item
        background $red
        display inline-block
        padding 7px 12px
</style>