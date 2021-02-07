import EditorNode, { EMITS as EDITORNODE_EMITS } from "../editor/EditorNode"
import { getDefaultCrop } from "../helpers/getDefaultCrop"

export default class PictureInEditor {
    constructor(editor, picture, cut, crop = null) {
        this.editor = editor
        this.picture = picture
        this.cut = cut
        this.crop = crop

        this.nodes = this.createNodes()

        this.state = {
            scale: 1
        }

        this.setup()
    }

    createNodes() {
        const pictureEl = document.createElement('img')
        pictureEl.src = this.picture.src
        const pictureNode = new EditorNode(pictureEl, {
            isARLocked: true
        })

        const cropEl = document.createElement('div')
        cropEl.className = 'Crop'
        const cropNode = new EditorNode(cropEl, {
            isMovable: false,
            isResizable: false
        })

        pictureNode.on(EDITORNODE_EMITS.STATE_CHANGE, this.onNodeMessage)
        pictureNode.on(EDITORNODE_EMITS.RESIZE_END, this.onNodeMessage)
        pictureNode.on(EDITORNODE_EMITS.MOVE_END, this.onNodeMessage)

        return {
            picture: pictureNode,
            crop: cropNode
        }
    }

    onNodeMessage = () => {
        const cropNodeState = this.nodes.crop.getState().state
        const pictureNodeState = this.nodes.picture.getState().state
        const pictureRatio = (this.picture.width / pictureNodeState.width)

        this.crop.width = Math.floor((cropNodeState.width / pictureNodeState.width) * this.picture.width)
        this.crop.height = Math.floor((cropNodeState.height / pictureNodeState.height) * this.picture.height)
        this.crop.x = Math.floor((cropNodeState.x - pictureNodeState.x) * pictureRatio)
        this.crop.y = Math.floor((cropNodeState.y - pictureNodeState.y) * pictureRatio)
    }

    setup() {
        //try to fit the crop inside editor without scaling, otherwise shrink crop(and picture) to fit
        const editorState = this.editor.state
        const widthRatio = this.cut.width / editorState.width
        const heightRatio = this.cut.height / editorState.height
        let scale = 1

        if (widthRatio > .8 || heightRatio > .8) {
            scale = .8 / Math.max(widthRatio, heightRatio)
        }

        //position crop in the middle
        this.nodes.crop.setState({
            width: scale * this.cut.width,
            height: scale * this.cut.height,
            y: (editorState.height - scale * this.cut.height) / 2,
            x: (editorState.width - scale * this.cut.width) / 2,
        })

        //fit-to-center
        if (!this.crop) {
            this.crop = getDefaultCrop({
                pictureWidth: this.picture.width,
                pictureHeight: this.picture.height,
                cutWidth: this.cut.width,
                cutHeight: this.cut.height
            })
        }

        //position picture accordingly
        const cropState = this.nodes.crop.state
        const cutCropRatio = this.cut.width / this.crop.width
        const pictureWidth = scale * cutCropRatio * this.picture.width
        const pictureHeight = scale * cutCropRatio * this.picture.height
        this.nodes.picture.setState({
            width: pictureWidth,
            height: pictureHeight,
            y: cropState.y - this.crop.y * (pictureWidth / this.picture.width),
            x: cropState.x - this.crop.x  * (pictureWidth / this.picture.width)
        })

        this.setState({
            scale: scale
        })
    }

    setState(state) {
        for (let prop in state) {
            this.state[prop] = state[prop]
        }
    }
}