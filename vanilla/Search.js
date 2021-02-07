import Component from '../core/Component'
import { EVENTS } from '../core/Events'
import EventBus from '../core/EventBus'

const STATES  = {
    OPEN: 'is-open'
}

export default class Search extends Component {
    constructor(element, options = {}) {
        super(element, options)

        this.ref = {
            input: null
        }
    }

    prepare() {
        EventBus.on(EVENTS.SEARCH_TOGGLE, this.handleSearchToggle)
    }

    destroy() {
        EventBus.off(EVENTS.SEARCH_TOGGLE, this.handleSearchToggle)
    }

    handleSearchToggle = () => {
        this.toggle()
    }

    toggle() {
        if (this.is(STATES.OPEN)) {
            this.close()
        } else {
            this.open()
        }
    }

    open() {
        this.element.classList.add(STATES.OPEN)
        this.ref.input.focus()
        EventBus.emit(EVENTS.SEARCH_OPENED)
    }

    close() {
        this.element.classList.remove(STATES.OPEN)
        EventBus.emit(EVENTS.SEARCH_CLOSED)
    }
}