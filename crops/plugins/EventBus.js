import mitt from 'mitt'

const EventBus =  mitt()
export default EventBus

export const EVENTS = {
    EDITOR_OPENED: 'editor:opened',
    EDITOR_CLOSED: 'editor:closed',
}