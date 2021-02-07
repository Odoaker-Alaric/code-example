<template>
    <div class="Hero">
        <nav class="Hero-nav">
            <ul>
                <li>
                    <a href="#about">About me</a>
                </li>
                <li>
                    <a href="#portfolio"><strong>Portfolio</strong></a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
            </ul>
        </nav>
        <div class="Hero-content">
            <h1 class="Hero-title Alpha">Michal Sladký</h1>
            <span class="Hero-subtitle">frontend developer</span>
        </div>
        <div class="Hero-image">
            <img class="is-lazy" data-src="~/assets/img/pages/homepage/hero.jpg" :data-srcset="`${require('~/assets/img/pages/homepage/hero@2x.jpg')} 2x`" alt="Person" />
            <a href="#about" to="about" class="Button">
                <span class="Button-content">About me and my work</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
$width = 1660

.Hero
    padding-top 20px
    line-height 1.4

    @media $small-wide-up
        display flex
        align-items flex-start

    &-nav
        display none

        @media $large-up
            display block
            align-self flex-end
            width percentage((250 / $width))
            margin-bottom percentage((30 / (590 - 250)))
            font-size 2rem

        li
            margin-bottom 5px

        a
            text-decoration none

    &-content
        text-align center
        margin-bottom 30px

        @media $small-wide-up
            order 1
            position relative
            text-align left
            padding-top percentage((150 / $width))
            padding-left percentage((100 / $width))
            //width percentage((590 / $width))

        @media $large-up
            padding-top percentage((250 / $width))

    &-title
        font-family $font-worksans
        text-transform uppercase
        color $brown

        @media $small-wide-up
            position relative
            z-index 1
            margin-bottom 10px

    &-subtitle
        font-size 1.4rem

        @media $small-wide-up
            display block
            margin-left percentage((200 / $width))

        @media $medium-up
            font-size 1.8rem

    &-image
        position relative
        margin-right 50px
        width calc(100% - 45px)
        left -25px
        max-width 400px

        @media $small-wide-up
            width percentage((560 / $width))
            left auto
            margin-right 0
            max-width none

        &:before
            content ''
            padding-bottom percentage((740 / 590))
            display block

        img
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            box-shadow 10px 20px 30px 3px rgba(0, 0, 0, .2)

    .Button
        position absolute
        margin-bottom 15%
        bottom 0
        right -70px
        white-space nowrap

        @media $small-wide-up
            left calc(100% - 80px)
            margin-bottom -15px
            right auto

        @media $medium-up
            margin-bottom 26%

</style>