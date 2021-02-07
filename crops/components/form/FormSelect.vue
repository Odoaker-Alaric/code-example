<template>
    <div class="FormSelect">
        <select name="">
            <option></option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="stylus">
.FormSelect
    //
</style>