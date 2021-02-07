<template>
    <div class="CellCutAdd">
        <button class="Button Button--icon Button--circle Button--grey Button--faded" @click="handleCutAddClick">
            <IconPlus />
        </button>
    </div>
</template>

<script>
import IconPlus from "@/components/icons/IconPlus"
import {pictureStore} from "@/store"

export default {
    components: {
        IconPlus
    },
    computed: {
        pictureStore: () => pictureStore,
    },
    methods: {
        handleCutAddClick() {
            this.addCut()
        },
        addCut() {
            pictureStore.addCut({
                id: "_" + Math.random().toString(36).substr(2, 9),
                width: null,
                height: null
            })
        },
    }
}
</script>

<style>
</style>