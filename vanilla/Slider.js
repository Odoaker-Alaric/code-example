import Component from '../core/Component'
import Flickity from 'flickity'
import debounce from 'lodash/debounce'

const STATES = {
    FLICKITY_ACTIVE: 'is-flickity-active',
    IS_PREV_VISIBLE: 'is-prev-visible',
    IS_NEXT_VISIBLE: 'is-next-visible'
}

const EMITS = {
    SELECTED: 'selected'
}

export default class Slider extends Component {
    constructor(element, options = {}) {
        super(element, options)

        this.ref = {
            slider: null,
            fcktySlider: null, //slouzi jen k vypoctu, kdyz je flickity aktivovany, nepouzivat v html
            prevs: [],
            nexts: [],
            // items: []
        }

        this.index = null
        this.flickity = null

        this.debounce = debounce(this.handleResize,200)
    }

    prepare() {
        this.check()

        window.addEventListener('resize', this.debounce)
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        this.check()
    }

    handleFlickitySelect = index => {
        this.index = index
        this.emit(EMITS.SELECTED, {index})
        this.checkPrevNext()
    }

    check() {
        const element = this.flickity ? this.ref.fcktySlider : this.ref.slider

        if (element.scrollWidth > element.offsetWidth) {
            this.createFlickity()
        } else {
            this.destroyFlickity()
        }
    }

    createFlickity() {
        if (this.flickity) {
            return
        }

        this.flickity = new Flickity(this.ref.slider, {
            prevNextButtons: false,
            pageDots: false,
            groupCells: '100%',
            contain: true,
            ...this.options
        })

        this.flickity.on('select', this.handleFlickitySelect)

        this.ref.prevs.forEach(prev => prev.addEventListener('click', this.handlePrevClick))
        this.ref.nexts.forEach(prev => prev.addEventListener('click', this.handleNextClick))

        this.ref.fcktySlider = this.ref.slider.querySelector('.flickity-slider')

        this.select(0)

        this.element.classList.add(STATES.FLICKITY_ACTIVE)
    }

    destroyFlickity() {
        if (!this.flickity) {
            return
        }

        this.flickity.destroy()
        this.flickity = null
        this.ref.prevs.forEach(prev => prev.removeEventListener('click', this.handlePrevClick))
        this.ref.nexts.forEach(prev => prev.removeEventListener('click', this.handleNextClick))
        this.element.classList.remove(STATES.FLICKITY_ACTIVE)
    }

    handlePrevClick = () => {
        this.selectPrev()
    }

    handleNextClick = () => {
        this.selectNext()
    }

    resize() {
        this.flickity.destroy()
    }

    select(index) {
        if (this.index === index) {
            return
        }

        this.index = index
        this.flickity.select(index)
    }

    selectPrev() {
        this.flickity.previous()
    }

    selectNext() {
        this.flickity.next()
    }

    checkPrevNext() {
        const count = this.flickity.slides.length

        if (this.index === count - 1) {
            this.element.classList.remove(STATES.IS_NEXT_VISIBLE)
        } else {
            this.element.classList.add(STATES.IS_NEXT_VISIBLE)
        }

        if (this.index === 0) {
            this.element.classList.remove(STATES.IS_PREV_VISIBLE)
        } else {
            this.element.classList.add(STATES.IS_PREV_VISIBLE)
        }
    }
}