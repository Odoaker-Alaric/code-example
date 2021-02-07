import { computed, reactive, readonly, toRef, toRefs } from "vue"
import { Store } from "./Store"

class UserSettingStore extends Store {
    setup() {
        this.state = reactive({
            userSetting: {
                helper: {
                    isVisible: true
                }
            },
        })

        this.getters = reactive({
            userSetting: computed(() => this.state.userSetting),
        })

        this.load()
    }


    setHelperVisibility(isVisible) {
        this.state.userSetting.helper.isVisible = isVisible
        this.save()
    }


    load() {
        this.state.userSetting = {
            ...this.state.userSetting,
            ...JSON.parse(localStorage.getItem('userSetting') || '{}')
        }
    }

    save() {
        localStorage.setItem('userSetting', JSON.stringify(this.state.userSetting))

    }
}

export default new UserSettingStore