<template>
    <div class="CellCut">
        <div class="CellCut-row CellCut-row--cut">
            <InputText class="CellCut-input" :modelValue="cut.width" @update:modelValue="(value) => updateCutProp('width', value)" />
            &nbsp;&nbsp;x&nbsp;&nbsp;
            <InputText class="CellCut-input" :modelValue="cut.height" @update:modelValue="(value) => updateCutProp('height', value)"  />
            <button :name="`cellcut-remove-${cut.id}`" class="CellCut-removeCutButton Button Button--transparent Button--icon">
                <IconTrash />
            </button>
        </div>
        <div class="CellCut-row" v-for="exportConf in cut.exportConfs" :key="exportConf.scale">
            <select class="Select" @change="(event) => handleExportConfSelectChange(event, exportConf)">
                <option v-for="option in exportConfOptions" :key="option.value" :value="option.value">{{ option.value }}</option>
            </select>
            <InputText class="CellCut-input" :modelValue="exportConf.width" @update:modelValue="(value) => updateExportConfProp(exportConf.id, 'width', value)"/>
            &nbsp;x&nbsp;
            <InputText class="CellCut-input" :modelValue="exportConf.height" @update:modelValue="(value) => updateExportConfProp(exportConf.id, 'height', value)"/>
            <InputText class="CellCut-input CellCut-input--filename" :modelValue="exportConf.filename" @update:modelValue="(value) => updateExportConfProp(exportConf.id, 'filename', value)"/>
            <button class="CellCut-removeExportConfButton Button Button--red Button--icon Button--transparent Button--circle Button--grey" @click="handleExportConfRemoveClick(exportConf.id)">
                <IconMinus />
            </button>
        </div>
        <button class="CellCut-addExportConfButton Button Button--green Button--hasIcon Button--transparent" @click="handleExportConfAddClick"><IconPlus /> Export size</button>

        <Tippy :to="`cellcut-remove-${cut.id}`" trigger="click" placement="right">
            <button class="Button Button--grey Button--invert" data-close>No</button>
            <button class="Button Button--red" @click="handleRemoveClick">Yes - remove cut</button>
        </Tippy>
    </div>
</template>

<script>
import {pictureStore} from "@/store"
import InputText from "@/components/form/InputText"
// import IconCross from "@/components/icons/IconCross"
import IconMinus from "@/components/icons/IconMinus"
import IconPlus from "@/components/icons/IconPlus"
import IconTrash from "@/components/icons/IconTrash"

export default {
    components: {
        InputText,
        // IconCross,
        IconMinus,
        IconPlus,
        IconTrash,
    },
    props: {
        cutId: {
            type: String,
            required: true,
        },
    },
    created() {
        this.exportConfOptions = [
            {
                value: "-",
                scale: 0,
                filename: "",
            },
            {
                value: ".5",
                scale: 0.5,
                filename: "@0_5x",
            },
            {
                value: "1",
                scale: 1,
                filename: "",
            },
            {
                value: "2",
                scale: 2,
                filename: "@2x",
            },
        ]
    },
    computed: {
        pictureStore: () => pictureStore,
        cut() {
            return pictureStore.findCutById(this.cutId)
        },
    },
    methods: {
        handleRemoveClick() {
            pictureStore.removeCut(this.cutId)
        },
        handleExportConfAddClick() {
            const isFirstExportConf = this.cut.exportConfs.length === 0

            pictureStore.addExportConf({
                id: "_" + Math.random().toString(36).substr(2, 9),
                cutId: this.cut.id,
                width: isFirstExportConf ? this.cut.width : null,
                height: isFirstExportConf ? this.cut.height : null,
                filename: "",
            })
        },
        handleExportConfRemoveClick(exportConfId) {
            pictureStore.removeExportConf(exportConfId)
        },
        handleExportConfSelectChange(event, exportConf) {
            const value = event.target.options[event.target.options.selectedIndex].value
            const exportConfOption = this.exportConfOptions.find((option) => option.value === value)

            pictureStore.updateExportConfProp(exportConf.id, 'width', Math.round(this.cut.width * exportConfOption.scale))
            pictureStore.updateExportConfProp(exportConf.id, 'height', Math.round(this.cut.height * exportConfOption.scale))
            pictureStore.updateExportConfProp(exportConf.id, 'filename', exportConfOption.filename)
        },
        updateCutProp(prop, value) {
            pictureStore.updateCutProp(this.cutId, prop, value)
        },
        updateExportConfProp(exportConfId, prop, value) {
            pictureStore.updateExportConfProp(exportConfId, prop, value)
        },
    },
}
</script>

<style lang="stylus" scoped>
.CellCut
    position relative
    padding-top 30px

    &-row
        display flex
        align-items center

        &--cut
            background $color2

            .CellCut-input
                font-size 1em

    //cross-component .InputText
    &-input
        width 40px
        text-align center
        border 0
        font-size 11px

        &:not(:hover):not(:focus)
            background none
            color #fff

        &--filename
            width 80px
            padding-left 10px
            text-align left

    &-removeCutButton
        margin-left auto
        margin-right 5px
        width 20px
        height 20px
        padding 3px
        position absolute
        top 5px
        right 5px

    &-addExportConfButton
        padding-left 0
        font-size 11px

        &:not(:hover)
            color #fff

    &-removeExportConfButton
        margin-left auto
        margin-right 5px

        &:not(:hover)
            color #fff
</style>