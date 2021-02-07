import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/import.styl'
import Tippy from '@/plugins/tippy/components/Tippy'
import tippy from 'tippy.js'
import tippyPlugin from '@/plugins/tippy'

function hideTippy() {
    this.hide()
}

tippy.setDefaultProps({
    interactive: true,
    boundary: "window",
    onShow(instance) {
        const closeButton = instance.popper.querySelector('[data-close]')

        if (closeButton) {
            closeButton.addEventListener('click', hideTippy.bind(instance))
        }
    },
    onHide(instance) {
        const closeButton = instance.popper.querySelector('[data-close]')
        if (closeButton) {
            closeButton.removeEventListener('click', hideTippy.bind(instance))
        }
    },
})

const app = createApp(App)
app.component('Tippy', Tippy)
app.use(tippyPlugin)
app.mount('#app')


