import Component from '../core/Component'
import { queryAll } from '../utils/dom'

const STATES = {
    READY: 'is-ready'
}

export const EMITS = {
    TAB_CHANGED: 'tab-changed'
}

export default class Tabs extends Component {
    constructor(element, options = {}) {
        super(element, options)

        this.ref = {
            menu: null,
            items: [],
            links: [],
            placeholder: null
        }

        this.initializedWithHash = false
        this.index = null
    }

    prepare() {
        this.ref.items.forEach(item => item.id = `tab-${item.id}`) //fake id aby neskakalo okno

        this.ref.menu.addEventListener('click', this.handleLinkClick)

        const index = this.getInitialIndex()

        setTimeout(() => {
            this.select(index)

            if (this.initializedWithHash) {
                // scrollToElement(this.element)
            }

            this.element.classList.add(STATES.READY)

            window.addEventListener('resize', this.handleResize)
        }, 50)
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        this.resize()
    }

    handleLinkClick = event => {
        event.preventDefault() //@TODO: doresit propisovani hashe a historii swupu
        const element = event.target
        const index = this.ref.links.indexOf(element)

        if (!~index) {
            return
        }

        this.select(index)
    }

    resize() {
        if (this.index === null) {
            return
        }

        this.ref.placeholder.style.height = `${this.ref.items[this.index].offsetHeight}px`
    }

    select(index) {
        if (this.index === index) {
            return
        }

        this.index = index
        this.ref.items.forEach(item => item.classList.remove('is-active'))
        this.ref.items[index].classList.add('is-active')
        this.ref.links.forEach(link => link.classList.remove('is-active'))
        this.ref.links[index].classList.add('is-active')

        this.resize()
        setTimeout(() => {
            queryAll('[data-component]', this.ref.items[index]).forEach(componentEl => {
                const component = Component.getFromElement(componentEl)
                !!component.resize && component.resize()
            })
        }, 0)
        this.emit(EMITS.TAB_CHANGED, {
            linkEl: this.ref.links[index],
            itemEl: this.ref.items[index]
        })
    }

    getInitialIndex() {
        const url = window.location.href
        const anchor = url.substring(url.indexOf("#"))
        const links = this.ref.links

        let index = links.findIndex(link => link.hash === anchor)

        if (!~index) {
            index = this.ref.links.findIndex(link => link.classList.contains('is-active'))
        } else {
            this.initializedWithHash = true
        }

        if (index < 0) {
            index = 0
        }

        return index
    }
}