import Component from '../core/Component'
import {substitute} from '../utils/String'

const STATES = {
    MOBILEDROPDOWN_OPEN: 'is-mobiledropdown-open'
}

export default class Webcams extends Component {
    constructor(element, options = {}) {
        super(element, options)

        this.ref = {
            mobilePlaceholder: null,
            mobileSelectWrap: null,
            links: [],
            items: []
        }

        this.mobilePlaceholderTemplate = this.ref.mobilePlaceholder.innerHTML
    }

    prepare() {
        this.ref.links.forEach(link => link.addEventListener('click', this.handleLinkClick))
        this.ref.mobilePlaceholder.addEventListener('click', this.handleMobilePlaceholderClick)
        this.updatePlaceholder()
    }

    destroy() {
        document.removeEventListener('click', this.handleOuterClick)
    }

    handleLinkClick = event => {
        event.preventDefault()
        const link = event.currentTarget

        const id = link.href.split('#')[1]
        const item = this.ref.items.find(item => item.id === id)
        if (!item) {
            return
        }

        this.ref.items.forEach(item => item.classList.remove('is-active'))
        this.ref.links.forEach(item => item.classList.remove('is-active'))
        item.classList.add('is-active')
        link.classList.add('is-active')

        this.updatePlaceholder()
        this.closeMobileDropdown()
    }

    handleMobilePlaceholderClick = event => {
        event.preventDefault()
        this.toggleMobileDropdown()
    }

    handleOuterClick = event => {
        const element = event.target
        if (!this.ref.mobileSelectWrap.contains(element)) {
            this.closeMobileDropdown()
        }
    }

    updatePlaceholder() {
        const link = this.ref.links.find(link => link.classList.contains('is-active'))
        if (!link) {
            return
        }
        this.ref.mobilePlaceholder.innerHTML = substitute(this.mobilePlaceholderTemplate, {
            name: link.innerText
        })
    }

    toggleMobileDropdown() {
        if (this.is(STATES.MOBILEDROPDOWN_OPEN)) {
            this.closeMobileDropdown()
        } else {
            this.openMobileDropdown()
        }
    }

    openMobileDropdown() {
        this.element.classList.add(STATES.MOBILEDROPDOWN_OPEN)
        setTimeout(() => {
            document.addEventListener('click', this.handleOuterClick)
        }, 0)
    }

    closeMobileDropdown() {
        this.element.classList.remove(STATES.MOBILEDROPDOWN_OPEN)
        document.removeEventListener('click', this.handleOuterClick)
    }


}