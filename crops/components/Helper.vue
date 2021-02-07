<template>
    <div class="Helper">
        <div class="Helper-item" :class="['Helper-item--' + item.direction]" v-for="item in visibleItems" :key="item.id" :style="item.style">
            <div v-html="item.content"></div>

            <div class="Helper-footer" v-if="item.isConfirmation">
                <button class="Button Button--grey" @click="() => item.confirm()">Got it!</button>
            </div>
        </div>
    </div>
</template>

<script>
import {pictureStore} from "@/store"
import EventBus, {EVENTS} from '@/plugins/EventBus'

export default {
    data() {
        return {
            isReady: false,
            isEditorOpen: false,
            items: {
                'addCut': {
                    content: 'Create a cut!',
                    anchorSelector: '.CellCutAdd .Button',
                    canBeVisible(helper) {
                        return pictureStore.getters.cuts.length === 0
                    }
                },
                'setCutWidthAndHeight': {
                    dependentIds: ['addCut'],
                    content: 'Set width x height!',
                    anchorSelector: '.CellCut-input:nth-of-type(2)',
                    canBeVisible(helper) {
                        return pictureStore.getters.cuts.length === 1 && (!pictureStore.getters.cuts[0].width || !pictureStore.getters.cuts[0].height)
                    }
                },
                'editPicture': {
                    content: 'Edit the picture if necessary',
                    dependentIds: ['setCutWidthAndHeight'],
                    anchorSelector: '.CellPictureCut',
                    isConfirmation: true,
                },
                'addExportConf': {
                    content: 'Add at least 1 export size<br> <small>(typicaly the same as cut size - but you are free to specify .5x, 2x, 3x,... size of your cut)</small>',
                    dependentIds: ['editPicture'],
                    anchorSelector: '.CellCut-addExportConfButton',
                    canBeVisible(helper) {
                        return pictureStore.getters.exportConfs.length === 0
                    }
                },
                'downloadPictures': {
                    content: 'Download all pictures',
                    dependentIds: ['addExportConf'],
                    anchorSelector: '.CellGroup-button--download',
                    isConfirmation: true,
                },
                'editorShortcuts': {
                    content: `
                        <div style="line-height: 1.2; font-size: 1.6rem">
                            <strong>Moving:</strong><br>
                            <small>
                                opt1. (drag the picture)<br>
                                opt2. press 'M' -> (move picture) -> press 'spacebar' or click<br>
                                opt3. use &#x2B06;&#x2B07; &#x2B05;&#x27A1; (+ ctrl)
                            </small>
                            <br><br>
                            <strong>Resizing:</strong><br>
                            <small>
                                opt1: (drag handles)<br>
                                opt2. press 'R' -> (resize picture) -> press 'spacebar' or click<br>
                                opt3. use <strong>+</strong> and <strong>-</strong>
                            </small>
                        </div>
                    `,
                    dependentIds: [],
                    zIndex: 99,
                    anchorSelector: '.Editor-header .Button',
                    isConfirmation: true,
                    canBeVisible(helper) {
                        return helper.isEditorOpen
                    },
                }
            },
        }
    },
    mounted() {
        for (let key in this.items) {
            const item = this.items[key]
            item.style = {}

            if (item.isConfirmation) {
                item._isConfimed = false
                item.confirm = function() {
                    this._isConfimed = true
                }
                item._canBeVisible = item.canBeVisible !== undefined ? item.canBeVisible : () => true
                item.canBeVisible = function(helper) {
                    return !this._isConfimed && this._canBeVisible(helper)
                }
            }

            if (!item.direction) {
                item.direction = 'bottomRight'
            }
        }

        this.attachWatchers()
        this.$nextTick(this.positionHelpers)
        this.isReady = true
    },
    computed: {
        pictureStore() {
            return pictureStore
        },
        visibleItems() {
            if (!this.isReady)  {
                return []
            }

            return Object.values(this.items).filter(this.isItemVisible)
        }
    },
    watch: {
        visibleItems(newItems, changingItems) {
            newItems.forEach(newItem => {
                if (newItem.isConfirmation) {
                    newItem.onVisibleStart && newItem.onVisibleStart()
                }
            })

            changingItems.forEach(changingItem => {
                if (changingItem.isConfirmation) {
                    changingItem.onVisibleEnd && changingItem.onVisibleEnd()
                }
            })
            this.$nextTick(this.positionHelpers)
        }
    },
    methods: {
        isItemDepenciesConfirmed(item) {
            if (item.dependentIds) {
                return !item.dependentIds.map(dependentId => this.items[dependentId]).some(_item => !(this.isItemConfirmed(_item) && this.isItemDepenciesConfirmed(_item)))
            } else {
                return true
            }
        },
        isItemConfirmed(item) {
            if (item._isConfimed !== undefined) {
                return item._isConfimed
            } else {
                return !item.canBeVisible(this)
            }
        },
        isItemVisible(item) {
            if (item.canBeVisible(this) && !this.isItemConfirmed(item) && this.isItemDepenciesConfirmed(item)) {
                return true
            }

            return false
        },
        positionHelpers() {
            this.visibleItems.forEach(item => {
                if (!item.anchorSelector) {
                    item.style.display = `none`
                    return
                }

                const anchorEl = document.querySelector(item.anchorSelector)
                if (!anchorEl) {
                    return
                }

                const anchorRect = anchorEl.getBoundingClientRect()
                const offsetY = item.offsetY ?? 20
                const offsetX = item.offsetX ?? 20
                const zIndex = item.zIndex ?? 1

                switch(item.direction) {
                    // case 'topLeft':
                    //     item.style.top = `${rect.top - 20}px`
                    //     item.style.left = `${rect.left - 20}px`
                    //     break;
                    // case 'topRight':
                    //     item.style.top = `${rect.top + 20}px`
                    //     item.style.right = `${rect.left + rect.width + 20}px`
                    //     break;
                    // case 'bottomLeft':
                    //     item.style.top = `${rect.top + rect.height + 20}px`
                    //     item.style.left = `${rect.left + rect.width + 20}px`
                    //     break;
                    case 'bottomRight':
                    default:
                        item.style.top = `${anchorRect.top + anchorRect.height + offsetY}px`
                        item.style.left = `${anchorRect.left + anchorRect.width + offsetX}px`
                        item.style.zIndex = `${zIndex}`
                }
            })
        },

        handleEditorOpened() {
            this.isEditorOpen = true
        },
        handleEditorClosed() {
            this.isEditorOpen = false
            this.items['editPicture'].confirm()
        },
        attachWatchers() {
            EventBus.on(EVENTS.EDITOR_OPENED, this.handleEditorOpened)
            EventBus.on(EVENTS.EDITOR_CLOSED, this.handleEditorClosed)
        },
        detachWatchers() {
            EventBus.off(EVENTS.EDITOR_OPENED, this.handleEditorOpened)
            EventBus.off(EVENTS.EDITOR_CLOSED, this.handleEditorClosed)
        }
    }
}
</script>

<style lang="stylus">
.Helper
    &-item
        position fixed
        font-size 2rem
        background $green
        padding 15px 20px
        z-index 99

        &:before
            content ''
            display block
            background $green
            width 3px
            height 30px
            position absolute
            margin -2px -3px

        &--bottomRight
            &:before
                bottom 100%
                right 100%
                transform-origin 100% 100%
                transform rotate(-45deg)

        &--bottomLeft
            &:before
                bottom 100%
                left 100%
                transform-origin 0 100%
                transform rotate(45deg)

        &--topLeft
            &:before
                top 100%
                left 100%
                transform-origin 100% 0
                transform rotate(-45deg)

        &--topRIght
            &:before
                top 100%
                right 100%
                transform-origin 100% 0
                transform rotate(45deg)

    &-footer
        padding-top 20px
        display flex
        justify-content flex-end
</style>