import { EMITS as EDITORNODE_EMITS } from './EditorNode'
import Emitter from './Emitter'

export const EMITS = {
    NODE_UPDATE: 'node:update',
}

export default class Editor extends Emitter {
    constructor(element) {
        super()
        this.element = element

        this.ref = {
            reachArea: createDOMElement(this.element, 'div', 'Editor-reachArea')
        }

        this.nodes = []
        this.state = {}

        this.resize()
    }

    destroy() {
        //
    }

    addNode(node) {
        const addNode = node => {
            this.nodes.push(node)
            node.on(EDITORNODE_EMITS.RESIZING, () => {
                this.updateReachableArea()
            })
            node.on(EDITORNODE_EMITS.MOVING, () => {
                this.updateReachableArea()
            })
            node.on(EDITORNODE_EMITS.RESIZE_START, () => {
                this.element.classList.add('is-node-resizing')
            })
            node.on(EDITORNODE_EMITS.RESIZE_END, () => {
                this.element.classList.remove('is-node-resizing')
                this.updateReachableArea()
            })
            node.on(EDITORNODE_EMITS.MOVE_START, () => {
                this.element.classList.add('is-node-moving')
            })
            node.on(EDITORNODE_EMITS.MOVE_END, () => {
                this.element.classList.remove('is-node-moving')
                this.updateReachableArea()
            })
            this.element.appendChild(node.element)
        }

        if (Array.isArray(node)) {
            node.forEach(node => addNode(node))
        } else {
            addNode(node)
        }
    }

    removeNode(node) {
        const index = this.nodes.indexOf(node)
        if (index > -1) {
            this.nodes.splice(index, 1)
        }
        this.element.removeChild(node)
    }

    resize() {
        const rect = this.element.getBoundingClientRect()
        this.state = {
            width: rect.width,
            height: rect.height,
        }
    }

    getState() {
        return this.state
    }


    updateReachableArea() {
        let minY = Number.MAX_VALUE
        let minX = Number.MAX_VALUE
        let maxY = Number.MIN_VALUE
        let maxX = Number.MIN_VALUE

        this.nodes.forEach(node => {
            const state = node.state

            if (state.y < minY) {
                minY = state.y
            }
            if (state.x < minX) {
                minX = state.x
            }
            if (state.y + state.height > maxY) {
                maxY = state.y + state.height
            }
            if (state.x + state.width > maxX) {
                maxX = state.x + state.width
            }
        })

        this.ref.reachArea.style.top = `${minY}px`
        this.ref.reachArea.style.left = `${minX}px`
        this.ref.reachArea.style.height = `${maxY - minY}px`
        this.ref.reachArea.style.width = `${maxX - minX}px`
    }
}

function createDOMElement(parentEl, tagName, className) {
    const el = document.createElement(tagName)
    el.className = className
    parentEl.appendChild(el)
    return el
}

