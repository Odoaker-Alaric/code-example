<template>
    <input class="Input" type="text" v-model="message" />
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
.Input
    border-bottom 1px solid #DDDEE7
    box-shadow none
    background-color white
    color $black
    padding 0
    border-radius 0
    width 100%
    margin 0
    height 30px
    line-height 1.2
    position relative

    @media $medium-up
        font-size 1.4rem
        height 30px

    &:focus
        border-color $black
        outline none

    &::placeholder
        opacity .5
        color $teal
        font-family inherit

        // @media $medium-up
            // font-size 2rem

    &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus
        //border 1px solid darken($color-darkBlue, 5)
        -webkit-text-fill-color $black
        -webkit-box-shadow 0 0 0px 1000px #fff inset
        transition background-color 5000s ease-in-out 0s

    &--textarea
        width 100%
        padding-top 20px
        padding-bottom 20px
        min-height 104px
        resize vertical
        display block
</style>