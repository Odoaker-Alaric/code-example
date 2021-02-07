export function getDefaultCrop({pictureWidth, pictureHeight, cutWidth, cutHeight}) {
    const widthRatio = cutWidth / pictureWidth
    const heightRatio = cutHeight / pictureHeight
    const scale = 1 / Math.max(widthRatio, heightRatio)

    const cropWidth = scale * cutWidth
    const cropHeight = scale * cutHeight
    return {
        x: Math.round((pictureWidth - cropWidth) / 2),
        y: Math.round((pictureHeight - cropHeight) / 2),
        width: Math.round(cropWidth),
        height: Math.round(cropHeight)
    }
}