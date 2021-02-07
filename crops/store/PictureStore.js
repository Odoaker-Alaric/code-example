import { computed, reactive, readonly, toRef, toRefs } from "vue"
import { Store } from "./Store"
import { getDefaultCrop } from "@/plugins/editor"
import Pica from 'pica'
import JSZip from 'jszip'

class PictureStore extends Store {
    setup() {
        this.state = reactive({
            cuts: [],
            rawPictures: [],
            crops: [],
            exportConfs: []
        })

        this.getters = reactive({
            pictures: computed(() => this.state.rawPictures.map(rawPicture => ({
                ...rawPicture,
                pictureCuts: this.getters.cuts.map(cut => ({
                    cut,
                    crop: this.getPictureCutCrop(rawPicture.id, cut.id),
                    exportConfs: this.state.exportConfs.filter(exportConf => exportConf.cutId === cut.id)
                }))
            }))),
            cuts: computed(() => this.state.cuts.map(cut => ({
                ...cut,
                exportConfs: this.state.exportConfs.filter(exportConf => exportConf.cutId === cut.id)
            }))),
            crops: computed(() => this.state.crops),
            exportConfs: computed(() => this.state.exportConfs),

        })
    }

    //GETTERS/QUERIES
    findPictureById(pictureId) {
        return this.getters.pictures.find(picture => picture.id === pictureId)
    }
    findCutById(cutId) {
        return this.getters.cuts.find(cut => cut.id === cutId)
    }
    findCropByPictureAndCutId(pictureId, cutId) {
        return this.getters.crops.find(crop => crop.pictureId === pictureId && crop.cutId === cutId)
    }


    //MUTATIONS
    addPicture(data) {
        this.state.rawPictures.push(data)
    }
    updatePictureProp(pictureId, prop, value) {
        const rawPicture = this.state.rawPictures.find(rawPicture => rawPicture.id === pictureId)
        if (!rawPicture) {
            return
        }
        rawPicture[prop] = value
    }
    removePicture(pictureId) {
        const index = this.state.rawPictures.findIndex(rawPicture => rawPicture.id === pictureId)
        this.state.rawPictures.splice(index, 1)

        //find crops to remove
        const cropIndexes = []
        for (let index = 0; index < this.state.crops.length; index++) {
            const crop = this.state.crops[index]
            if (crop.pictureId === pictureId) {
                cropIndexes.push(index)
            }
        }

        //splice from back to prevent shift
        for (var i = cropIndexes.length - 1; i >= 0; i--)
            this.state.crops.splice(cropIndexes[i], 1)
    }
    removePictureAll() {
        this.state.rawPictures.splice(0)
    }

    addCut(data) {
        this.state.cuts.push(data)
    }
    updateCutProp(cutId, prop, value) {
        const cut = this.state.cuts.find(cut => cut.id === cutId)
        if (!cut) {
            return
        }
        switch (prop) {
            case 'width':
            case 'height':
                value = parseInt(value)
        }
        cut[prop] = value
    }
    removeCut(cutId) {
        const index = this.state.cuts.findIndex(cut => cut.id === cutId)

        //find exportConfs to remove
        const exportConfIndexes = []
        for (let index = 0; index < this.state.exportConfs.length; index++) {
            const exportConf = this.state.exportConfs[index]
            if (exportConf.cutId === cutId) {
                exportConfIndexes.push(index)
            }
        }

        //splice from back to prevent shift
        for (var i = exportConfIndexes.length - 1; i >= 0; i--)
            this.state.exportConfs.splice(exportConfIndexes[i], 1)

        this.state.cuts.splice(index, 1)
    }
    removeCutAll() {
        this.removeExportConfAll()
        this.state.cuts.splice(0)
    }

    removeCropAll() {
        this.state.crops.splice(0)
    }

    addExportConf(data) {
        this.state.exportConfs.push(data)
    }
    updateExportConfProp(exportConfId, prop, value) {
        const exportConf = this.state.exportConfs.find(exportConf => exportConf.id === exportConfId)
        if (!exportConf) {
            return
        }
        switch (prop) {
            case 'width':
            case 'height':
                value = parseInt(value)
        }
        exportConf[prop] = value
    }
    removeExportConf(exportConfId) {
        const index = this.state.exportConfs.findIndex(exportConf => exportConf.id === exportConfId)
        this.state.exportConfs.splice(index, 1)
    }
    removeExportConfAll() {
        this.state.exportConfs.splice(0)
    }




    //HELPER/ACTIONS
    getPictureCutCrop(pictureId, cutId) {
        let rawPicture = this.state.rawPictures.find(rawPicture => rawPicture.id == pictureId)
        let cut = this.findCutById(cutId)
        let crop = this.state.crops.find(crop => crop.pictureId === pictureId && crop.cutId === cutId)

        //fit-to-center
        if (!crop) {
            crop = getDefaultCrop({
                pictureWidth: rawPicture.width,
                pictureHeight: rawPicture.height,
                cutWidth: cut.width,
                cutHeight: cut.height,
            })
        }

        return crop
    }





    //ACTIONS
    downloadPictureAll() {
        this._download(this.getters.pictures)
    }

    downloadPicture(pictureId) {
        const picture = this.findPictureById(pictureId)
        this._download([picture])
    }

    async _download(pictures) {
        const zip = new JSZip()

        await Promise.all(pictures.map(async picture => {
            const images = await this._getResizedImages(picture)
            images.forEach(image => {
                zip.file(`${picture.filename}${image.exportConf.filename}.jpg`, image.blob)
            })
        }))

        zip.generateAsync({ type: "blob" }, metadata => {
            /*      var msg = "progression : " + metadata.percent.toFixed(2) + " %"
                    if (metadata.currentFile) {
                        msg += ", current file = " + metadata.currentFile
                    }
                    showMessage(msg)
                    updatePercent(metadata.percent | 0) */
        })
            .then(blob => {

                // see FileSaver.js
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `images`
                link.click()
            })
    }

    async _getResizedImages(picture, exportConfId) {
        const srcImage = new Image
        srcImage.src = picture.src
        srcImage.crossOrigin = "Anonymous"

        const getResizedImageBlob = (srcCanvas, { width, height }) => {
            return new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height

                const pica = new Pica
                pica.resize(srcCanvas, canvas)
                    .then(result => pica.toBlob(result, 'image/jpeg', 1))
                    .then(blob => {
                        resolve(blob)
                    })
            })
        }

        const blobs = await new Promise((resolve, reject) => {
            srcImage.onload = () => {
                const promises = []
                const blobs = []

                picture.pictureCuts.forEach(pictureCut => {
                    const cut = pictureCut.cut
                    const crop = pictureCut.crop

                    if (cut.exportConfs.length === 0) {
                        return
                    }

                    const srcCanvas = document.createElement('canvas')
                    const srcCtx = srcCanvas.getContext('2d')
                    srcCtx.clearRect(0, 0, srcCanvas.width, srcCanvas.height)
                    srcCanvas.width = crop.width
                    srcCanvas.height = crop.height
                    srcCtx.drawImage(srcImage,
                        crop.x, crop.y,
                        crop.width, crop.height,
                        0, 0,
                        crop.width, crop.height,
                    )

                    cut.exportConfs.forEach(exportConf => {
                        promises.push(getResizedImageBlob(srcCanvas, exportConf).then(
                            blob => {
                                blobs.push({
                                    blob,
                                    cut,
                                    exportConf
                                })
                            }
                        ))
                    })
                })

                Promise.all(promises).then(() => {
                    resolve(blobs)
                })
            }
        })

        return blobs
    }

}

export default new PictureStore