import Component from '../core/Component'

export const STATES = {
    OVERFLOW_Y: 'is-overflow-y',
    OPEN: 'is-open',
    ACTIVE: 'is-active',
    HAS_CONTENT: 'has-content',
TODAY: 'is-today',
    FADED: 'is-faded',
    PAST: 'is-past',
    HOLIDAY: 'is-holiday',
    WEEKEND: 'is-weekend',
}

export const EMITS = {
    ACTIVATED: 'activated',
    ADD_CLICKED: 'add:clicked',
    ITEM_CLICKED: 'item:clicked'
}

//bunka v rezervacich a v kalendari
export default class Cell extends Component {
    constructor(element, options = {}) {
        super(element, options = {
            day: null,
            bookItemKey: null,
            ...options
        })

        this.ref = {
            content: null
        }

        this.boundaryRect = null//document.body.getBoundingClientRect() //rect ohranicujiciho elementu, pres kterej nema content pretect
        this.rect = null
        this.isAttached = false
        this.isActive = false
        this.isToday = false
        this.day = this.options.day
        this.bookItemKey = this.options.bookItemKey
    }

    prepare() {
        // this.resize()
        this.element.addEventListener('click', this.handleClick)
    }

    attachHover() {
        this.element.addEventListener('mouseenter', this.handleMouseEnter)
        this.element.addEventListener('mouseleave', this.handleMouseLeave)
        this.isAttached = true
    }

    detachHover() {
        this.element.removeEventListener('mouseenter', this.handleMouseEnter)
        this.element.removeEventListener('mouseleave', this.handleMouseLeave)
        this.isAttached = false
    }

    handleMouseEnter = () => {
        this.open()
    }

    handleMouseLeave = () => {
        this.close()
    }

    handleClick = () => {
        this.activate()
    }

    resize() {
        if (!this.ref.content) {
            return
        }
        this.rect = this.ref.content.getBoundingClientRect()
        this.checkOverflow()
    }

    setBoundaryRect(boundaryRect) {
        this.boundaryRect = boundaryRect
    }

    getContent() {
        return this.ref.content ? this.ref.content.innerHTML : this.element.querySelector('.Cell-inner').innerHTML
    }

    checkOverflow() {
        const isOverflowX = this.ref.content.scrollWidth > this.ref.content.offsetWidth + 1
        const isOverflowY = this.ref.content.scrollHeight > this.ref.content.offsetHeight + 5

        if ((isOverflowX || isOverflowY)) {

            if (!this.isAttached) {
                this.attachHover()
            }

        } else if (this.isAttached) {
            this.detachHover()
        }

        if (isOverflowY) {
            this.element.classList.add(STATES.OVERFLOW_Y)
        }
    }





    open() {
        if (this.boundaryRect == null) {
            //prvne je potreba nastavit boundary element rect, treba document.body nebo tabulku
            return
        }

        let contentWidth = this.ref.content.scrollWidth * 1.4 // 1.2 je odhadem zvetseni kvuli vetsimu font-size
        if (this.boundaryRect.width < contentWidth) {
            contentWidth = this.boundaryRect.width
        }

        const diff = (this.boundaryRect.left + this.boundaryRect.width) - (this.rect.left + contentWidth)
        if (diff < 0) {
            this.ref.content.style.transform = `translateX(${diff}px)`
        }

        this.element.classList.add(STATES.OPEN)
        this.ref.content.style.width = `${contentWidth}px`
    }

    close() {
        this.element.classList.remove(STATES.OPEN)
        this.ref.content.style.width = ``
        this.ref.content.style.transform = ``
    }




    activate() {
        if (this.isActive) {
            return
        }

        this.element.classList.add(STATES.ACTIVE)
        this.isActive = true
        this.emit(EMITS.ACTIVATED, {
            component: this,
            day: this.day,
            bookItemKey: this.bookItemKey
        })
    }

    deactivate() {
        this.element.classList.remove(STATES.ACTIVE)
        this.isActive = false
    }
}






export const createCalendarCell = day => {
    const rootElement = document.createElement('div')
    rootElement.classList.add('Cell')

    const html = `
        <div class="Cell-inner">
            <span class="Cell-title">${day.date.getDate()}</span>

            ${day.data?.events ?
            `<div class="Cell-content" data-ref="content">
                    <ul class="CellList">

            ${day.data.events.map(event => {
                if (event.type === 'event') {
                    return `
                            <li class="CellList-blockItem">
                                <a href="${event.url}">
                                    ${event.isUserSigned ? `<div class="CellList-icons"><span class="VisualIcon VisualIcon--greenCheck" title="Jste přihlášen/a na tuto akci."></span></div>` : ``}
                                    <span><span class="CellList-time">${event.time}</span></span>
                                    <span class="CellList-yellowText">${event.title}</span>
                                </a>
                            </li>`
                } else if (event.type === 'announcement') {
                    return `
                            <li class="CellList-blockItem CellList-blockItem--blue">
                                <a href="${event.url}">
                                    <span><span class="CellList-time">${event.time}</span></span>
                                    <span class="CellList-yellowText">${event.title}</span>
                                </a>
                            </li>`
                } else {
                    return `<li class="CellList-item"><span class="CellList-time">${event.time}</span><br> <a href="${event.url}">${event.title}</a></li>`
                }
            }).join('')}

                    </ul>
                </div>`
            :
            ``
        }
        </div>
    `

    if (day.isWeekend) {
        rootElement.classList.add(STATES.WEEKEND)
    }
    if (day.isToday) {
        rootElement.classList.add(STATES.TODAY)
    }
    if (day.isPast) {
        rootElement.classList.add(STATES.PAST)
    }
    if (day.isHoliday) {
        rootElement.classList.add(STATES.HOLIDAY)
    }
    if (!day.isCurrentMonth) {
        rootElement.classList.add(STATES.FADED)
    }
    if (day.data?.events) {
        rootElement.classList.add(STATES.HAS_CONTENT)
    }

    rootElement.innerHTML = html

    const cell = new Cell(rootElement)
    cell.prepare()

    return cell
}




export const createBookingCell = (day, bookItemKey) => {
    const rootElement = document.createElement('div')
    rootElement.classList.add('Cell')

    const html = `
        <div class="Cell-inner">

            ${(day.data && day.data[bookItemKey]) ? `
                <div class="Cell-content" data-ref="content">
                    <ul class="CellList">

                        ${day.data[bookItemKey].map(event => `
                                <li class="CellList-item">
                                    <button data-item-id="${event.id}">
                                        <span class="CellList-time">${event.time}</span><br>${event.description}
                                    </button>
                                </li>
                        `).join('')}\

                    </ul>
                    ${!(day.isPast || day.isHoliday) ? '<button class="CellAdd" data-ref="addButton"></button>' : ''}
                </div>`
            :
            `${!(day.isPast || day.isHoliday) ? '<button class="CellAdd" data-ref="addButton"></button>' : ''}`
        }
        </div>
    `

    if (day.data && day.data[bookItemKey]) {
        rootElement.classList.add(STATES.HAS_CONTENT)
    }

    rootElement.innerHTML = html

    const cell = new Cell(rootElement, { day, bookItemKey })
    cell.prepare()

    rootElement.addEventListener('click', event => {
        let element = event.target.hasAttribute('[data-item-id]') ? event.target : event.target.closest('[data-item-id]')
        if (element) {
            cell.emit(EMITS.ITEM_CLICKED, {
                component: cell,
                day,
                bookItemKey,
                itemId: element.dataset.itemId
            })
            return
        }

        element = event.target.hasAttribute('[data-ref="addButton"]') ? event.target : event.target.closest('[data-ref="addButton"]')
        if (element) {
            cell.emit(EMITS.ADD_CLICKED, {
                component: cell,
                day,
                bookItemKey
            })
            return
        }
    })

    return cell
}