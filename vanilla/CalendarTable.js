import Component from '../core/Component'
import { EMITS as CELL_EMITS, STATES as CELL_STATES, createCalendarCell } from './Cell'
import { DAYS, DAYS_SHORT } from './DaysDataOperator'
import Scroll from '../services/Scroll'

export const STATES = {
    VIEW_WEEK: 'is-view-week',
    READY: 'is-ready'
}

export default class CalendarTable extends Component {
    constructor(element, options = {}) {
        super(element, options)

        this.ref = {
            detailContent: null
        }

        this.rect = null
        this.cells = []
        this.activeCell = null
    }

    prepare() {
        this.resize()
        Scroll.on('resize', this.handleResize)

        this.element.classList.add(STATES.READY)
    }

    destroy() {
        Scroll.off('resize', this.handleResize)
    }

    handleResize = () => {
        this.resize()
    }

    resize() {
        this.rect = this.element.getBoundingClientRect()

        this.cells.forEach(cell => {
            cell.setBoundaryRect(this.rect)
            cell.resize()
        })
    }

    setView(view) {
        if (view === 'week') {
            this.element.classList.add(STATES.VIEW_WEEK)
        } else {
            this.element.classList.remove(STATES.VIEW_WEEK)
        }
    }





    handleCellActivated = ({ component = null }) => {
        if (this.activeCell && this.activeCell !== component) {
            this.activeCell.deactivate()
        }

        this.activeCell = component

        if (this.activeCell) {
            this.ref.detailContent.innerHTML = this.activeCell.getContent() || '<span class="NoResult">Na tento den nemáte žádné události</span>'
        }
    }



    render(weeks) {
        const html = `
            <table class="calendar-Table-table">
                <thead class="calendar-Table-header">
                    <tr>
                        ${weeks[0].map((day, index) => `
                            <th class="calendar-Table-th"><span class="u-hideDesktop">${DAYS_SHORT[index]}</span><span class="u-hideMobile">${DAYS[index]}</span></th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody class="calendar-Table-body">

                    ${weeks.map(week => `
                        <tr class="calendar-Table-row">
                            ${week.map((day, index) => `
                                <td class="calendar-Table-cell">${this.is(STATES.VIEW_WEEK) ? `<span class="calendar-Table-weekday"><span class="u-hideDesktop">${DAYS_SHORT[index]}</span><span class="u-hideMobile">${DAYS[index]}</span></span>` : ``}</td>
                                `).join('')}
                        </tr>
                        `).join('')}
                </tbody>
            </table>

            <div class="calendar-Table-detail">
                <div class="calendar-Table-detailTitle">Detail: </div>
                <div class="calendar-Table-detailContent" data-ref="detailContent">

                </div>
            </div>
        `

        this.element.innerHTML = html

        this.cells = []
        const cellContainers = [...this.element.querySelectorAll('.calendar-Table-cell')]

        let cellIndex = 0
        weeks.forEach(week => {
            week.forEach(day => {
                const cell = createCalendarCell(day)
                cell.on(CELL_EMITS.ACTIVATED, this.handleCellActivated)
                cell.setBoundaryRect(this.rect)
                this.cells.push(cell)

                cellContainers[cellIndex].appendChild(cell.element)

                cellIndex = cellIndex + 1
            })
        })

        this.element.offsetWidth

        this.ref.detailContent = this.element.querySelector('[data-ref="detailContent"]')

        this.cells.forEach(cell => {
            if (cell.is(CELL_STATES.TODAY)) {
                cell.activate()
            }
            cell.resize()
        })
    }
}