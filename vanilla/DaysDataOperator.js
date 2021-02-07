import { toDateString, toTimeString, toDateTimeString } from "../utils/Date"

export const MONTHS = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec']
export const DAYS = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle']
export const DAYS_SHORT = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
export const DAYS_NORMALIZED = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']
export const DAYS_SHORT_NORMALIZED = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']

export class DaysDataOperator {

    // EXAMPLE
    // daysData = {
    //     "metadata":
    //     {
    //         "from": "<timestamp>",
    //         "to": "<timestamp>"
    //     },
    //     "holidays": {
    //          "2020-06-01": "Novy rok"
    //     },
    //     "rawData": [
    //          {"bookItemKey": "f5.506", "id": "1", "from": 123456789, "to": 123456789, "title": "bleh"},
    //          {"bookItemKey": "f5.506", "id": "1", "from": 123456789, "to": 123456789, "title": "bleh"}
    //      ],
    //     "data": {
    //         "2020-06-01": {
    //             "events": [{"time": "13:00", "title": "bleh", "description": "bleh", isUserSigned?: true|false}]
    //         }
    //      }
    // }
    //
    //
    // rawData jsou u bookingu, aby to neparsovalo BE
    // data jsou u kalendare, parsuje to na dny BE

    constructor(options = { daysData: {}, url: '' }) {
        this.url = options.url
        this.daysData = options.daysData
        this.fromDate = new Date(parseInt(this.daysData.metadata.from))
        this.toDate = new Date(parseInt(this.daysData.metadata.to))

        if (this.daysData.rawData) {
            this.daysData.data = {}
            this.parseRawDataToData(this.daysData.rawData, this.daysData.data)
        }

        this.cache = {}
        Day.holidays = this.daysData.holidays || {}
    }

    //checke jestli neni potreba fetchnou novy data a pripadne je fetchne
    checkAndPrefetch(date) {
        const crosslineDate = new Date

        //do budoucnosti, 1 mesic offset
        crosslineDate.setTime(this.toDate.getTime())
        crosslineDate.setMonth(this.toDate.getMonth() - 1)
        if (date.getTime() > crosslineDate.getTime()) {
            crosslineDate.setTime(this.toDate.getTime())
            crosslineDate.setFullYear(this.toDate.getFullYear() + 1)
            this.fetchDaysData(this.toDate, crosslineDate)
        }

        //do minulosti, 1 mesic offset
        crosslineDate.setTime(this.fromDate.getTime())
        crosslineDate.setMonth(this.fromDate.getMonth() + 1)
        if (date.getTime() < crosslineDate.getTime()) {
            crosslineDate.setTime(this.fromDate.getTime())
            crosslineDate.setFullYear(this.fromDate.getFullYear() - 1)
            this.fetchDaysData(crosslineDate, this.fromDate)
        }
    }

    fetchDaysData(fromDate = new Date, toDate = new Date) {
        let url = this.url
        url = url.replace(`__FROM__`, fromDate.getTime()).replace(`__TO__`, toDate.getTime())

        $.ajax(url, {
            success: data => {
                const fromDate = new Date(parseInt(data.daysData.metadata.from))
                const toDate = new Date(parseInt(data.daysData.metadata.to))

                if (fromDate.getTime() < this.fromDate.getTime()) {
                    this.fromDate = fromDate
                }

                if (toDate.getTime() > this.toDate.getTime()) {
                    this.toDate = toDate
                }

                this.daysData.holidays = {
                    ...this.daysData.holidays,
                    ...data.daysData.holidays
                }
                this.daysData.data = {
                    ...this.daysData.data,
                    ...data.daysData.data
                }
                if (data.daysData.rawData) {
                    this.parseRawDataToData(data.daysData.rawData, this.daysData.data)
                }
            }
        })
    }

    //druha moznost, jak ziskavat data... BE posle jen jednotlivy rezervace v 'rawData' a tu se rozparsujou na dny
    parseRawDataToData(rawData, data) {
        const current = new Date()
        const from = new Date()
        const to = new Date()

        rawData.forEach(record => {
            current.setTime(record.from)
            from.setTime(record.from)
            to.setTime(record.to)

            const isSingleDay = toDateString(from) === toDateString(to)
            let hasNextDay = toDateString(current) === toDateString(to) || current.getTime() < to.getTime()
            let index = 0

            while (hasNextDay) {
                const hasPreviousDay = index > 0
                const tempDate = toDateString(current)
                current.setDate(current.getDate() + 1)
                hasNextDay = toDateString(current) === toDateString(to) || current.getTime() < to.getTime()

                const time = isSingleDay ? `${toTimeString(from)}-${toTimeString(to)}` : (hasPreviousDay && hasNextDay) ? `Celý den` : hasNextDay ? `od ${toTimeString(from)}` : `do ${toTimeString(to)}`

                const item = {
                    description: record.description,
                    id: record.id,
                    time,
                }

                if (!data[tempDate]) {
                    data[tempDate] = {}
                }
                if (!data[tempDate][record.bookItemKey]) {
                    data[tempDate][record.bookItemKey] = []
                }

                data[tempDate][record.bookItemKey].push(item)
                index += 1
            }
        })


    }






    //utils metody
    getFirstDateOfWeek(date) {
        const weekday = date.getDay()
        const diff = (1 - weekday) > 0 ? weekday - 6 : 1 - weekday
        const firstDate = (new Date(date.getTime()))
        firstDate.setDate(date.getDate() + diff)
        return firstDate
    }

    getWeekByDate(date) {
        const firstWeekDate = this.getFirstDateOfWeek(date)

        const firstWeekDateISO = firstWeekDate.toISOString().split('T')[0]

        if (this.cache[firstWeekDateISO]) {
            return {
                key: firstWeekDateISO,
                days: this.cache[firstWeekDateISO]
            }
        }

        const days = []
        for (let i = 0; i < 7; i++) {
            const day = new Day(firstWeekDate)
            day.setData(this.daysData.data[day.toISO()])
            days[i] = day
            firstWeekDate.setDate(firstWeekDate.getDate() + 1)
        }

        this.cache[firstWeekDateISO] = days

        return {
            key: firstWeekDateISO,
            days
        }
    }

    getMonthWeeksByDate(date) {
        const firstDayOfMonth = new Date(date.getTime())
        firstDayOfMonth.setDate('1')

        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        lastDayOfMonth.setHours(lastDayOfMonth.getHours() - lastDayOfMonth.getTimezoneOffset() / 60)

        const weeks = {}

        while (firstDayOfMonth < lastDayOfMonth) {
            const week = this.getWeekByDate(firstDayOfMonth)
            weeks[week.key] = week.days
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 7)
        }

        const week = this.getWeekByDate(lastDayOfMonth)
        weeks[week.key] = week.days

        return Object.values(weeks)
    }
}


export class Day {
    static currentMonth = new Date().getMonth()
    static dateToday = new Date
    static holidays = {
        // "2020-01-01": "Novy rok"
    }

    constructor(timeValue) {
        this.date = new Date(timeValue)

        if ((new Date()).toISOString().split('T')[0] === this.date.toISOString().split('T')[0]) {
            this.isToday = true
        }
    }

    get isWeekend() {
        const weekday = this.date.getDay()
        return weekday === 0 || weekday === 6
    }

    get isCurrentMonth() {
        return this.currentMonth === null ? true : this.date.getMonth() == Day.currentMonth
    }

    get isPast() {
        return this.date.getTime() < Day.dateToday.getTime() && this.date.toISOString().split('T')[0] !== Day.dateToday.toISOString().split('T')[0]
    }

    get isHoliday() {
        return !!Day.holidays[this.toISO()]
    }

    getData() {
        return this.data
    }

    setData(data) {
        this.data = data
    }

    toISO() {
        return this.date.toISOString().split('T')[0]
    }
}
