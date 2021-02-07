<template>
    <input class="Checkbox" type="checkbox" v-model="message" />
</template>

<script>
import {computed} from "vue"
export default {
    props: {
        modelValue: null,
    },
    emits: ["update:modelValue"],
    setup(props, {emit}) {
        const message = computed({
            get: () => props.modelValue,
            set: (value) => {
                emit("update:modelValue", value)
            },
        })

        return {
            message,
        }
    },
}
</script>

<style lang="stylus">
.Checkbox
    &:focus
        border-color $black
        outline none
</style>