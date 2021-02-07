export function getEventMousePos(event, axis) {
    return axis === 'y' ?
        Math.floor((event.clientY ?? event.pageY ?? event.originalEvent.touches[0].clientY) + document.body.scrollTop) :
        Math.floor((event.clientX ?? event.pageX ?? event.originalEvent.touches[0].clientX) + document.body.scrollLeft)
}