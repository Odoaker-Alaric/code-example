<template>
    <div class="Setup">
        <Uploader class="Setup-uploader" />

        <button class="Setup-demo" @click="handleDemoClick">demo</button>
    </div>
</template>

<script>
import Uploader from "@/components/Uploader"
import {pictureStore} from "@/store"

export default {
    name: "Setup",
    components: {
        Uploader
    },
    methods: {
        handleDemoClick() {
            pictureStore.removePictureAll()
            pictureStore.removeCutAll()

            pictureStore.addPicture({
                id: "image1",
                filename: "wide",
                src: "https://i.picsum.photos/id/684/2000/1000.jpg?hmac=N0klPq5IL-bxjSXSHZ3SpT1kvTg_WN2d9o5STNGSA_c",
                width: 2000,
                height: 1000,
            })
            pictureStore.addPicture({
                id: "image2",
                filename: "square",
                src: "https://i.picsum.photos/id/4/1000/1000.jpg?hmac=DGVvA9jPeuWdXZKTOzR51XMVLcCOripgqOTvt-IgzlI",
                width: 1000,
                height: 1000,
            })
            pictureStore.addPicture({
                id: "image3",
                filename: "tall",
                src: "https://i.picsum.photos/id/678/1000/2000.jpg?hmac=RknyKpgz2WyuuzhlKEoQTO-nxdySSFnA5TzUSrjty1A",
                width: 1000,
                height: 2000,
            })

            pictureStore.addCut({
                id: "desktop",
                width: 300,
                height: 1000,
            })
            pictureStore.addCut({
                id: "tablet",
                width: 768,
                height: 500,
            })
            pictureStore.addCut({
                id: "thumb",
                width: 50,
                height: 50,
            })

            pictureStore.addExportConf({
                id: "desktop1x",
                cutId: "desktop",
                width: 300,
                height: 1000,
                filename: "",
            })
            pictureStore.addExportConf({
                id: "desktop2x",
                cutId: "desktop",
                width: 600,
                height: 2000,
                filename: "@2x",
            })
            pictureStore.addExportConf({
                id: "tablet1x",
                cutId: "tablet",
                width: 768,
                height: 500,
                filename: "-tablet",
            })
            pictureStore.addExportConf({
                id: "tablet2x",
                cutId: "tablet",
                width: 1536,
                height: 1000,
                filename: "-tablet@2x",
            })
            pictureStore.addExportConf({
                id: "thumb1x",
                cutId: "thumb",
                width: 50,
                height: 50,
                filename: "-thumb",
            })
            pictureStore.addExportConf({
                id: "thumb2x",
                cutId: "thumb",
                width: 100,
                height: 100,
                filename: "-thumb@2x",
            })
        },
    },
}
</script>

<style lang="stylus">
.Setup
    height 100%
    display flex

    //cross-component .Uploader
    &-uploader
        height 100%
        width 80%
        max-height 300px
        max-width 600px
        margin auto
        font-size 3rem

    &-demo
        position fixed
        bottom 50px
        right 50px
        color #fff
        text-decoration underline
</style>
