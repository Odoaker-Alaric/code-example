import PictureInEditor from '../classes/PictureInEditor'
import Editor from '../editor/Editor'

export default class App {
    constructor() {
        const editorEl = document.getElementById('editor')
        this.editor = new Editor(editorEl)
        this.editor.prepare()

        this.cutSelectEl = document.getElementById('cut-select')

        this.pictureInEditor = null
    }

    run() {
        this.pictureInEditor = new PictureInEditor(this.editor)
        const nodes = this.pictureInEditor.nodes
        this.editor.addNode(nodes.picture)
        this.editor.addNode(nodes.crop)

        this.pictureInEditor.selectCut('default')


        this.pictureInEditor.picture.cuts.forEach(cut => {
            const option = document.createElement('option')
            option.value = cut.id
            option.innerHTML = cut.id
            this.cutSelectEl.appendChild(option)
        })

        this.cutSelectEl.addEventListener('change', event => {
            const el = event.target
            this.pictureInEditor.selectCut(el.options[el.selectedIndex].value)
        })
    }
}
