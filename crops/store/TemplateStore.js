import { computed, reactive, readonly, toRef, toRefs } from "vue"
import { Store } from "./Store"

class TemplateStore extends Store {
    setup() {
        this.state = reactive({
            templates: [],
        })

        this.getters = reactive({
            templates: computed(() => this.state.templates),
        })

        this.load()
    }

    addTemplate(data) {
        this.state.templates.push(data)

        this.save()
    }

    findTemplateById(templateId) {
        return this.state.templates.find(template => template.id === templateId)
    }

    removeTemplate(templateId) {
        const index = this.state.templates.findIndex(template => template.id === templateId)
        this.state.templates.splice(index, 1)

        this.save()
    }

    load() {
        this.state.templates = JSON.parse(localStorage.getItem('templates') || '[]')
    }

    save() {
        localStorage.setItem('templates', JSON.stringify(this.state.templates))

    }
}

export default new TemplateStore