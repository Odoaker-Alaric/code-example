<template>
    <div class="Container Container--wide">
        <header class="Header">
            <nuxt-link to="/" class="Header-logo">
                <img src="~/assets/img/logo.svg" alt="Logo" />
            </nuxt-link>
            <nuxt-link to="/blog" class="Button">
                <span class="Button-content">Blog</span>
            </nuxt-link>
        </header>
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
.Header
    display flex
    justify-content space-between
    align-items center
    padding 40px 0

    @media $xlarge-up
        padding 65px 0

    &-logo
        display block
        width 50px

        @media $medium-up
            width 70px

        @media $xlarge-up
            width 110px
</style>