<template>
    <div class="Grid">
        <div v-for="(i,index) in flatMatrix" :key="index"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            matrix: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 2, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0]
            ]
        }
    },
    computed: {
        flatMatrix() {
            return this.matrix.flat(1)
        }
    },
    methods: {
        findingNeighbors(myArray, i, j) {
            const rowLimit = myArray.length - 1
            const columnLimit = myArray[0].length - 1

            for (
                let x = Math.max(0, i - 1);
                x <= Math.min(i + 1, rowLimit);
                x++
            ) {
                for (
                    let y = Math.max(0, j - 1);
                    y <= Math.min(j + 1, columnLimit);
                    y++
                ) {
                    if (x !== i || y !== j) {
                        console.log(myArray[x][y])
                    }
                }
            }
        }
    }
}
</script>

<style lang="stylus">
.Grid
    width 100%
    height 100%
    display flex
    flex-flow row wrap

    div
        width 33.333%
        height 33.333%

        &:nth-child(1)
            background orange

        &:nth-child(2)
            background red

        &:nth-child(3)
            background blue

        &:nth-child(4)
            background green

        &:nth-child(5)
            background orange

        &:nth-child(6)
            background red

        &:nth-child(7)
            background blue

        &:nth-child(8)
            background green

        &:nth-child(9)
            background orange
</style>