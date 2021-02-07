export default class Emitter {
    constructor() {
        this._callbacks = {}
    }

    on(events, callback) {
        if (typeof events === 'string') {
            events = {
                [events]: callback
            }
        }

        Object.keys(events)
            .forEach(key => {
                if (!(key in this._callbacks)) {
                    this._callbacks[key] = []
                }

                if (!this._callbacks[key].includes(events[key])) {
                    this._callbacks[key].push(events[key])
                }
            })
    }

    off(events, callback) {
        if (typeof events === 'string') {
            events = {
                [events]: callback
            }
        }

        Object.keys(events)
            .filter(key => key in this._callbacks)
            .forEach(key => {
                const index = this._callbacks[key].indexOf(events[key])

                if (index > -1) {
                    this._callbacks[key].splice(index, 1)
                }
            })
    }

    emit(eventName, params) {
        if (eventName in this._callbacks) {
            this._callbacks[eventName].forEach(callback => callback(params))
        }

        if (this._callbacks['_all']) {
            this._callbacks['_all'].forEach(callback => callback(eventName, params))
        }
    }
}