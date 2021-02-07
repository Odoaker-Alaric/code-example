<template>
    <div class="TemplatePicker">
        <form v-if="visibility.header" class="TemplatePicker-header" @submit="handleTemplateAddSubmit">
            <InputText v-model="newTemplateName" placeholder="<template-name>" />
            <button type="submit" class="Button">save as template</button>
        </form>
        <div v-if="templateStore.getters.templates.length" class="TemplatePicker-groups">
            <div class="TemplatePicker-group">
                <span class="color-color6">User defined:</span><br />

                <InputText class="TemplatePicker-search" v-model="search" placeholder="search" />
                <ul class="TemplatePicker-list" @mouseenter="handleListMouseEnter" @mouseleave="handleListMouseLeave">
                    <li class="TemplatePicker-item" v-for="fuzzyItem in fuzzyFilteredTemplates" :key="fuzzyItem.obj.id">
                        <IconEye @mouseenter="handleItemEyeMouseEnter(fuzzyItem.obj.id)" @mouseleave="handleItemEyeMouseLeave"/>
                        <button class="TemplatePicker-itemContent" @click="selectTemplate(fuzzyItem.obj.id)" v-html="fuzzyItem.isStatic ? fuzzyItem.obj.name : fuzzysort.highlight(fuzzyItem)"></button>
                        <button :name="`templatepicker-remove-${fuzzyItem.obj.id}`" class="TemplatePicker-removeTemplateButton Button Button--transparent Button--icon">x</button>
                    </li>
                </ul>
            </div>

            <div class="TemplatePicker-group">
                <span class="color-color6">Recent:</span><br />

                <ul class="TemplatePicker-list">
                    <li><button class="TemplatePicker-item">XXX</button></li>
                </ul>
            </div>
        </div>

        <div v-if="templateStore.getters.templates.length" class="mt-10">
            <span class="color-color6 mr-10">Preview:</span>{{currentViewTemplateName}}
        </div>

        <Tippy :to="`templatepicker-remove-${fuzzyItem.obj.id}`" trigger="click" placement="right" v-for="fuzzyItem in fuzzyFilteredTemplates" :key="fuzzyItem.obj.id">
            <button class="Button Button--grey Button--invert" data-close>No</button>
            <button class="Button Button--red" @click="handleTemplateRemoveClick(fuzzyItem.obj.id)">Yes - remove template</button>
        </Tippy>
    </div>
</template>

<script>
import InputText from "@/components/form/InputText"
import IconEye from "@/components/icons/IconEye"
import {templateStore, pictureStore} from "@/store"
const fuzzysort = require("fuzzysort")

export default {
    components: {
        InputText,
        IconEye,
    },
    props: {
        visibility: {
            type: Object,
            default: () => ({
                header: true,
            }),
        },
    },
    data() {
        return {
            newTemplateName: "",
            search: "",
            currentViewTemplateName: null,
            currentStoreState: null,
        }
    },
    mounted() {
        this.itemEyeTimer = null
    },
    computed: {
        templateStore() {
            return templateStore
        },
        fuzzysort() {
            return fuzzysort
        },
        fuzzyFilteredTemplates() {
            if (this.search) {
                const xx = fuzzysort.go(this.search, this.templateStore.getters.templates, {
                    key: "name",
                })
                return xx
            } else {
                return this.templateStore.getters.templates.map((template) => ({score: 0, obj: template, isStatic: true}))
            }
        },
    },
    methods: {
        handleItemEyeMouseEnter(templateId) {
            clearTimeout(this.restoreStoreStateTimer)
            this.saveCurrentStoreState()

            const template = templateStore.findTemplateById(templateId)
            pictureStore.state.cuts = [...template.cuts]
            pictureStore.state.exportConfs = [...template.exportConfs]

            this.currentViewTemplateName = template.name
        },
        handleItemEyeMouseLeave() {
            this.restoreStoreState()
            this.currentViewTemplateName = null
        },

        handleTemplateAddSubmit(event) {
            event.preventDefault()
            this.addTemplate()
        },

        handleTemplateRemoveClick(templateId) {
            templateStore.removeTemplate(templateId)
        },

        restoreStoreState() {
            this.restoreStoreStateTimer = setTimeout(() => {
                if (!this.currentStoreState) {
                    return
                }

                pictureStore.state.cuts = [...this.currentStoreState.cuts]
                pictureStore.state.crops = [...this.currentStoreState.crops]
                pictureStore.state.exportConfs = [...this.currentStoreState.exportConfs]
                this.currentStoreState = null
            }, 300)
        },

        saveCurrentStoreState() {
            if (this.currentStoreState) {
                return
            }

            this.currentStoreState = {
                cuts: [...pictureStore.state.cuts],
                crops: [...pictureStore.state.crops],
                exportConfs: [...pictureStore.state.exportConfs],
            }
            pictureStore.removeCropAll()
        },

        selectTemplate(templateId) {
            const template = templateStore.findTemplateById(templateId)
            pictureStore.state.cuts = [...template.cuts]
            pictureStore.state.exportConfs = [...template.exportConfs]
            pictureStore.removeCropAll()
            this.currentStoreState = null
        },

        addTemplate() {
            templateStore.addTemplate({
                id: "_" + Math.random().toString(36).substr(2, 9),
                isUserDefined: true,
                name: this.newTemplateName,
                cuts: [...pictureStore.state.cuts],
                exportConfs: [...pictureStore.state.exportConfs],
            })
        },
    },
}
</script>

<style lang="stylus" scoped>
.TemplatePicker
    padding 10px
    width 350px

    &-groups
        display flex

    &-group
        padding 0 15px
        width 50%

    &-list
        padding 10px 0
        max-height 100px
        overflow auto

    &-item
        color $color8
        padding 2px 0
        cursor pointer
        display flex
        align-items center
        justify-content space-between
        width 100%

        &:hover
            background $color2
            color #fff

        b
            color #fff

        .Icon--eye
            width 20px
            flex 0 0 auto
            height 10px
            opacity .5

            &:hover
                opacity 1
                color $green

    &-removeTemplateButton
        padding 0
        width 20px
        height 20px
        flex 0 0 auto

    &-itemContent
        color inherit
        cursor inherit
        overflow hidden
        text-overflow ellipsis
        text-align left
        flex 1 0 auto

    &-search
        &:not(:hover):not(:focus)
            color #fff
            background none
            border-color $color5

            &::placeholder
                color $color7

    &-header
        display flex
        align-items center
        justify-content space-between
        margin-bottom 20px
        padding 0 15px

        .Button
            flex 0 0 auto
            margin-left 10px
</style>