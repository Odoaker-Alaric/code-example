import Component from '../core/Component'
import { EVENTS } from '../core/Events'
import EventBus from '../core/EventBus'

const STATES  = {
    ACTIVE: 'is-active'
}

export default class SearchOpener extends Component {
    constructor(element, options = {}) {
        super(element, options)
    }

    prepare() {
        this.element.addEventListener('click', this.handleClick)
        EventBus.on(EVENTS.SEARCH_OPENED, this.handleSearchOpened)
        EventBus.on(EVENTS.SEARCH_CLOSED, this.handleSearchClosed)
    }

    destroy() {
        EventBus.off(EVENTS.SEARCH_OPENED, this.handleSearchOpened)
    }

    handleSearchOpened = () => {
        this.element.classList.add(STATES.ACTIVE)
    }

    handleSearchClosed = () => {
        this.element.classList.remove(STATES.ACTIVE)
    }

    handleClick = event => {
        event.preventDefault()
        EventBus.emit(EVENTS.SEARCH_TOGGLE)
    }
}