import Component from '../core/Component'
import CalendarTable from './CalendarTable'
import { DaysDataOperator, MONTHS, Day } from './DaysDataOperator'
import { EMITS as SELECT_EMITS } from './Select'

export default class Calendar extends Component {
    constructor(element, options = {}) {
        super(element, options = {
            date: new Date(), //nebo timestamp z sablony
            ...options
        })

        this.ref = {
            today: null,
            prev: null,
            next: null,
            title: null,
            viewSelect: null,

            table: null
        }

        this.table = null

        this.view = this.options.view
        this.date = typeof this.options.date.getMonth === 'function' ? this.options.date : new Date(this.options.date)
        this.daysDataOperator = new DaysDataOperator({
            daysData: this.options.daysData || {},
            url: this.options.url
        })
    }

    prepare() {
        this.ref.prev.addEventListener('click', this.handlePrevClick)
        this.ref.next.addEventListener('click', this.handleNextClick)
        this.ref.today.addEventListener('click', this.handleTodayClick)

        this.viewSelect = Component.getFromElement(this.ref.viewSelect)
        this.viewSelect.on(SELECT_EMITS.CHANGE, this.handleViewSelectChange)
        this.view = this.viewSelect.getChoice().value

        this.table = new CalendarTable(this.ref.table)
        this.table.prepare()

        this.renderTable()
    }

    destroy() {
        this.table.destroy()
    }

    handleNextClick = event => {
        if (this.view === 'week') {
            this.date.setDate(this.date.getDate() + 7)
        } else {
            this.date.setMonth(this.date.getMonth() + 1)
        }

        this.daysDataOperator.checkAndPrefetch(this.date)

        this.renderTable()
    }

    handlePrevClick = event => {
        if (this.view === 'week') {
            this.date.setDate(this.date.getDate() - 7)
        } else {
            this.date.setMonth(this.date.getMonth() - 1)
        }

        this.daysDataOperator.checkAndPrefetch(this.date)

        this.renderTable()
    }

    handleViewSelectChange = selectEvent => {
        this.view = selectEvent.currentChoice.value
        this.renderTable()
    }

    handleTodayClick = () => {
        this.date = new Date
        this.renderTable()
    }












    updateTitle(date) {
        this.ref.title.innerText = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
    }

    renderTable(options = {}) {
        options = {
            view: this.view,
            date: this.date,
            ...options
        }

        if (this.view === 'week') {
            Day.currentMonth = null //fujky
        } else {
            Day.currentMonth = options.date.getMonth() //fujky
        }

        let weeks = []
        if (options.view === 'week') {
            const week = this.daysDataOperator.getWeekByDate(options.date)
            weeks = [week.days]
        } else {
            weeks = this.daysDataOperator.getMonthWeeksByDate(options.date)
        }

        this.updateTitle(options.date)
        this.table.setView(options.view)
        this.table.render(weeks)
    }

}