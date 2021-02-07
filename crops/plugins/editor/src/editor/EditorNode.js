import Emitter from './Emitter'

export const ACTIONS = {
    NONE: 'none',
    RESIZING: 'resizing',
    MOVING: 'moving'
}

const STATES = {
    RESIZABLE: 'is-resizable',
    MOVABLE: 'is-movable'
}

export const EMITS = {
    RESIZE_START: 'resize-start',
    RESIZING: 'resizing',
    RESIZE_END: 'resize-end',
    MOVE_START: 'move-start',
    MOVING: 'moving',
    MOVE_END: 'move-end',
    STATE_CHANGE: 'state-change'
}

export default class EditorNode extends Emitter {
    constructor(originalElement, options = {}) {
        super()
        this.state = {} //current state and sizes of item
        this.stateBefore = {} //temporary state on resize/move event
        this.stateAfter = {} //temporary state on resize/move event

        this.originalElement = originalElement
        this.element = createTemplateEl()
        this.ref = {
            item: this.element.querySelector('[data-ref="item"]'),
            resizer: this.element.querySelector('[data-ref="resizer"')
        }
        this.ref.item.appendChild(this.originalElement)

        this.setState({
            width: options.width || 100,
            height: options.height || 100,
            y: options.y || 100,
            x: options.x || 100,
            isResizable: options.isResizable ?? true,
            isMovable: options.isMovable ?? true,
            isARLocked: options.isARLocked ?? false //lock aspect ratio while resizing
        })

        this.attachTriggeringListeners()
    }

    handleMouseDown = event => {
        if (event.target.dataset.handle !== undefined) {
            if (!this.state.isResizable) return
            event.preventDefault()
            event.stopPropagation()
            this.resizeStart(getClientInfoFromEvent(event))
        } else {
            if (!this.state.isMovable) return
            event.preventDefault()
            event.stopPropagation()
            this.moveStart(getClientInfoFromEvent(event))
        }
    }

    attachTriggeringListeners() {
        this.element.addEventListener('mousedown', this.handleMouseDown)
    }

    detachTriggeringListeners() {
        this.element.removeEventListener('mousedown', this.handleMouseDown)
    }




    resizeStart(clientInfo) {
        this.detachTriggeringListeners()
        this.saveStateBefore(clientInfo)
        document.addEventListener('mousemove', this.handleResizing)
        document.addEventListener('mouseup', this.handleResizeEnd)
        this.emit(EMITS.RESIZE_START, this.getState())
    }

    handleResizing = event => {
        if (this.state.currentAction !== ACTIONS.RESIZING) {
            this.setState({
                currentAction: ACTIONS.RESIZING
            })
        }

        let distanceX = null
        let distanceY = null
        let scaleX = null
        let scaleY = null
        let transformOrigin = null

        const mouse = {
            x: getEventMousePos(event,'x'),
            y: getEventMousePos(event,'y')
        }

        const mouseDiff = {
            x: mouse.x - this.stateBefore.mouse.x,
            y: mouse.y - this.stateBefore.mouse.y
        }

        if (this.stateBefore.handle === 'NW') {
            transformOrigin = '100% 100%'
            scaleX = 1 - mouseDiff.x / this.stateBefore.width
            scaleY = 1 - mouseDiff.y / this.stateBefore.height
        } else if (this.stateBefore.handle === 'NE') {
            transformOrigin = '0% 100%'
            scaleX = 1 + mouseDiff.x / this.stateBefore.width
            scaleY = 1 - mouseDiff.y / this.stateBefore.height
            distanceX = 0
        } else if (this.stateBefore.handle === 'SW') {
            transformOrigin = '100% 0%'
            scaleX = 1 - mouseDiff.x / this.stateBefore.width
            scaleY = 1 + mouseDiff.y / this.stateBefore.height
            distanceY = 0
        } else if (this.stateBefore.handle === 'SE') {
            transformOrigin = '0% 0%'
            scaleX = 1 + mouseDiff.x / this.stateBefore.width
            scaleY = 1 + mouseDiff.y / this.stateBefore.height
            distanceX = 0
            distanceY = 0
        }

        //1px step only
        scaleX = Math.round(Math.max(this.stateBefore.width * scaleX, 10)) / this.stateBefore.width
        scaleY = Math.round(Math.max(this.stateBefore.height * scaleY, 10)) / this.stateBefore.height

        this.ref.item.style.transformOrigin = transformOrigin

        if (this.state.isARLocked || event.shiftKey) {
            scaleX = scaleY
        }
        this.ref.item.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`
        const width = Math.floor(this.stateBefore.width * scaleX)
        const height = Math.floor(this.stateBefore.height * scaleY)

        this.stateAfter = {
            width,
            height,
            distanceX: distanceX ?? this.stateBefore.width - width,
            distanceY: distanceY ?? this.stateBefore.height - height
        }

        this.updateResizer()
        this.emit(EMITS.RESIZING, this.getState())
    }

    handleResizeEnd = event => {
        event.preventDefault()
        this.resizeEnd()
    }

    resizeEnd() {
        if (this.state.currentAction === ACTIONS.RESIZING) {
            this.setState({
                currentAction: ACTIONS.NONE,
                width: this.stateAfter.width,
                height: this.stateAfter.height,
                y: (this.stateAfter.distanceY < 0 ? '-=' : '+=') + Math.abs(this.stateAfter.distanceY),
                x: (this.stateAfter.distanceX < 0 ? '-=' : '+=') + Math.abs(this.stateAfter.distanceX)
            })

            this.updateResizer()
        }

        document.removeEventListener('mousemove', this.handleResizing)
        document.removeEventListener('mouseup', this.handleResizeEnd)
        this.attachTriggeringListeners()
        this.emit(EMITS.RESIZE_END, this.getState())
    }




    moveStart(clientInfo) {
        this.detachTriggeringListeners()
        this.saveStateBefore(clientInfo)
        document.addEventListener('mousemove', this.handleMoving)
        document.addEventListener('mouseup', this.handleMoveEnd)
        this.emit(EMITS.MOVE_START, this.getState())
    }

    handleMoving = event => {
        if (this.state.currentAction !== ACTIONS.MOVING) {
            this.setState({
                currentAction: ACTIONS.MOVING
            })
        }

        const mouse = {
            x: getEventMousePos(event,'x'),
            y: getEventMousePos(event,'y')
        }

        const mouseDiff = {
            x: mouse.x - this.stateBefore.mouse.x,
            y: mouse.y - this.stateBefore.mouse.y
        }

        this.ref.item.style.transform = `translateX(${mouseDiff.x}px) translateY(${mouseDiff.y}px)`

        this.stateAfter = {
            distanceX: mouseDiff.x,
            distanceY: mouseDiff.y
        }

        this.updateResizer()
        this.emit(EMITS.MOVING, this.getState())
    }

    handleMoveEnd = event => {
        if (this.state.currentAction === ACTIONS.MOVING) {
            event.preventDefault()
        }
        this.moveEnd()
    }

    moveEnd() {
        if (this.state.currentAction === ACTIONS.MOVING) {
            this.setState({
                currentAction: ACTIONS.NONE,
                y: (this.stateAfter.distanceY < 0 ? '-=' : '+=') + Math.abs(this.stateAfter.distanceY),
                x: (this.stateAfter.distanceX < 0 ? '-=' : '+=') + Math.abs(this.stateAfter.distanceX)
            })

            this.updateResizer()
        }

        document.removeEventListener('mousemove', this.handleMoving)
        document.removeEventListener('mouseup', this.handleMoveEnd)
        this.attachTriggeringListeners()
        this.emit(EMITS.MOVE_END, this.getState())
    }

    updateResizer() {
        if (this.state.currentAction === ACTIONS.NONE) {
            this.ref.resizer.style.width = ''
            this.ref.resizer.style.height = ''
            this.ref.resizer.style.top = ''
            this.ref.resizer.style.left = ''
        } else {
            this.ref.resizer.style.width = `${this.stateAfter.width || this.state.width}px`
            this.ref.resizer.style.height = `${this.stateAfter.height  || this.state.height}px`
            this.ref.resizer.style.top = `${this.stateAfter.distanceY}px`
            this.ref.resizer.style.left = `${this.stateAfter.distanceX}px`
        }
    }

    setState(state) {
        //pass number for absolute update
        //pass string with prepended += or -= for relative update (i.e. '+=5')
        const updateDOMProp = (prop, val) => {
            if (typeof prop === 'string' && val[1] === '=') {
                const operation = {
                    '+': (x,y) => x + y,
                    '-': (x,y) => x - y
                }
                const [operator, value] = val.split('=')
                this.state[prop] = operation[operator](this.state[prop], parseInt(value))
            } else {
                this.state[prop] = val
            }
            const renames = {
                width: 'width',
                height: 'height',
                x: 'left',
                y: 'top'
            }

            this.element.style[renames[prop]] = `${this.state[prop]}px`
        }


        for (let prop in state) {
            if (['width', 'height', 'x', 'y'].includes(prop)) {
                updateDOMProp(prop, state[prop])
            } else {
                this.state[prop] = state[prop]
            }

            if (['isResizable'].includes(prop)) {
                if (state[prop]) {
                    this.element.classList.add(STATES.RESIZABLE)
                } else {
                    this.element.classList.remove(STATES.RESIZABLE)
                }
            }

            if (['isMovable'].includes(prop)) {
                if (state[prop]) {
                    this.element.classList.add(STATES.MOVABLE)
                } else {
                    this.element.classList.remove(STATES.MOVABLE)
                }
            }
        }


        this.ref.item.style.transformOrigin = ''
        this.ref.item.style.transform = ''
        this.emit(EMITS.STATE_CHANGE, this.getState())
    }

    getState() {
        return {
            state: this.state,
            stateAfter: this.stateAfter,
            stateBefore: this.stateBefore
        }
    }

    saveStateBefore(clientInfo = {handle: null, clientX: null, clientY: null}) {
        this.stateBefore = {
            width: this.state.width,
            height: this.state.height,
            y: this.state.y,
            x: this.state.x,
            ...clientInfo
        }

        this.stateAfter = {}
    }
}

function createTemplateEl() {
    const node = document.createElement('div')
    node.className = 'EditorNode'
    node.innerHTML = `
        <div class="EditorNode-item" data-ref="item"></div>
        <div class="EditorNode-resizer" data-ref="resizer">
            <span class="EditorNode-handle EditorNode-handle--NW" data-handle="NW"></span>
            <span class="EditorNode-handle EditorNode-handle--NE" data-handle="NE"></span>
            <span class="EditorNode-handle EditorNode-handle--SW" data-handle="SW"></span>
            <span class="EditorNode-handle EditorNode-handle--SE" data-handle="SE"></span>
        </div>
    `

    return node
}

function getEventMousePos(event, axis) {
    return axis === 'y' ?
        Math.floor((event.clientY ?? event.pageY ?? event.originalEvent.touches[0].clientY) + document.body.scrollTop) :
        Math.floor((event.clientX ?? event.pageX ?? event.originalEvent.touches[0].clientX) + document.body.scrollLeft)
}

function getClientInfoFromEvent(event) {
    return {
        handle: event.target.dataset.handle,
        mouse: {
            x: getEventMousePos(event,'x'),
            y: getEventMousePos(event,'y')
        }
    }
}