<template>
    <div class="UserSetting">
        <button :name="`usersetting`" class="Button Button--grey">
            User Settings
        </button>

        <Tippy :to="`usersetting`" trigger="click" placement="bottom">
            <div class="UserSetting-row">
                <Checkbox :modelValue="userSettingStore.getters.userSetting.helper.isVisible" @update:modelValue="(value) => userSettingStore.setHelperVisibility(value)" />
                show tutorial helpers
            </div>
        </Tippy>
    </div>

</template>

<script>
import {userSettingStore} from '@/store'
import Checkbox from '@/components/form/Checkbox'

export default {
    components: {
        Checkbox
    },
    computed: {
        userSettingStore() {
            return userSettingStore
        },
    }
}
</script>

<style lang="stylus" scoped>
.UserSetting
    display flex

    &-row
        display flex
        align-items center

        .Checkbox
            margin-right 15px
</style>