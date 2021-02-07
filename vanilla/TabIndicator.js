import Component from '../core/Component'
import {EMITS as TABS_EMITS} from './Tabs'
import Scroll from '../services/Scroll'
import debounce from 'lodash/debounce'

export default class TabIndicator extends Component {
    constructor(element, options = {}) {
        super(element, options)

        this.ref = {
            arrow: null
        }

        this.lastActiveLinkEl = null
        this.translateX = 0

        this.handleDebouncedResize = debounce(this.handleResize, 200)
    }

    prepare() {
        const tabsEl = this.element.closest('[data-component="Tabs"')
        if (!tabsEl) {
            return
        }

        const tabsComponent = Component.getFromElement(tabsEl)
        if (!tabsComponent) {
            return
        }

        Scroll.on('resize', this.handleDebouncedResize)
        tabsComponent.on(TABS_EMITS.TAB_CHANGED, this.handleTabChange)
    }

    destroy() {
        Scroll.off('resize', this.handleDebouncedResize)
        tabsComponent.off(TABS_EMITS.TAB_CHANGED, this.handleTabChange)
    }

    handleResize = () => {
        this.updateArrow()
    }

    handleTabChange = tabsEvent => {
        this.lastActiveLinkEl = tabsEvent.linkEl
        this.updateArrow()
    }

    updateArrow() {
        const linkRect = this.lastActiveLinkEl.getBoundingClientRect()
        const arrowRect = this.ref.arrow.getBoundingClientRect()

        const diff = (linkRect.left + linkRect.width / 2) - (arrowRect.left + arrowRect.width / 2)
        this.translateX += diff
        this.ref.arrow.style.transform = `translateX(${this.translateX}px)`
    }
}