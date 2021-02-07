<template>
    <main>
        <div class="PageHeader">
            <h1 class="PageHeader-title Alpha">About me</h1>
        </div>
        <div class="Section--shadow">
            <section class="Section">
                <div class="Container Container--slim">
                    <p>My name is Michal Sladký and I am a professional frontend developer, born and currently living in the Czech republic. In general I like to solve problems and create stuff, that's why I decided to become a software developer.</p>
                </div>
                <div class="Section-arrow Section-arrow--right Section-arrow--bottom"></div>
            </section>

            <section class="Section Section--appended">
                <div class="Container Container--slim">
                    <h2 class="Section-title Beta">Tech and tools</h2>

                    <div class="Text">
                        <p>
                            <strong>Daily basis:</strong>
                            <br />HTML(latte templates), css(stylus), vanillaJS, Git(GitLab), SVG editing, AdobeXD
                        </p>
                        <p>
                            <strong>I've tried/I'm familiar with (usually half-baked side projects or school projects):</strong>
                            <br />VueJS(NuxtJS), GraphQL, Python, jQuery, basic Linux, Bitbucket, webpack, Arduino, (Lua, Lisp, smalltalk, C#, C/C++, ...)
                        </p>

                        <p>The lists above certainly aren't the most impressive ones. Rather than using libraries for every single task, I prefer to handcode anything that's possible and doesn't take too long. Clean code, naming conventions or at least consistent naming, structuring the code, applying best practices if possible, learning the concepts - those are things that are essential and most important for me.</p>
                    </div>
                </div>
            </section>

            <section>
                <div class="Container Container--slim">
                    <div class="ProCon">
                        <div class="ProCon-item">
                            <h2 class="Section-title Beta">I do</h2>
                            <div class="Text">
                                <ul>
                                    <li>handcode unique designs</li>
                                    <li>refactor and clean up</li>
                                </ul>
                            </div>
                        </div>
                        <div class="ProCon-item">
                            <h2 class="Section-title Beta">I don't</h2>
                            <div class="Text">
                                <ul>
                                    <li>create or use templates</li>
                                    <li>code in Wordpress (I'm sorry, I never will)</li>
                                    <li>ship it and forget it</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="workplace" class="Section SectionAboutWorkplace">
                <div class="Container Container--slim">
                    <h2 class="Section-title Section-title--spaceBottom Beta">Workplace history</h2>
                    <div class="Workplace">
                        <article class="Workplace-item">
                            <div class="Workplace-image">
                                <img class="is-lazy" data-src="~assets/img/logos/giant.svg" alt="Logo Giant Interactive s.r.o" />
                            </div>
                            <div class="Workplace-content">
                                <header class="Workplace-header">
                                    <h3 class="Workplace-title">Giant s.r.o.</h3>
                                    <time class="Workplace-date">
                                        <span>May 2019</span> -
                                        <span>present</span>
                                    </time>
                                </header>
                                <main class="Workplace-text">
                                    <p>Frontend developer</p>
                                </main>
                                <footer class="Workplace-footer">
                                </footer>
                            </div>
                        </article>
                        <article class="Workplace-item">
                            <div class="Workplace-image">
                                <img class="is-lazy" data-src="~assets/img/logos/uw.svg" alt="Logo Úspěšný web s.r.o" />
                            </div>
                            <div class="Workplace-content">
                                <header class="Workplace-header">
                                    <h3 class="Workplace-title">Úspěšný web</h3>
                                    <time class="Workplace-date">
                                        <span>October 2018</span> -
                                        <span>April 2019</span>
                                    </time>
                                </header>
                                <main class="Workplace-text">
                                    <p>Mainly frontend developement which consisted of translating old projects to a newly built CMS. Since it was a 5 people company, there were no strict responsibilities and I was doing some PHP coding as well.</p>
                                    <p class="Workplace-textMore" v-if="openedWorkplaceId === 2">
                                        <span class="Workplace-textMoreRow">
                                            <strong>Devstack used:</strong> Nette Framework (Latte templates), SASS, jQuery/vanillaJS without any kind of compilation
                                        </span>
                                        <span class="Workplace-textMoreRow">
                                            <strong>What I've learned:</strong> CSS/JS basics (before I didn't know what the difference between absolute and relative position was :) )
                                        </span>
                                        <span class="Workplace-textMoreRow">
                                            <strong>What I tried to promote:</strong> using BEM, have control over templates (considerable amount of code was generated), simple webpack build
                                        </span>
                                    </p>
                                </main>
                                <footer class="Workplace-footer">
                                    <button class="Link" @click="openedWorkplaceId = 2" v-if="openedWorkplaceId !== 2">More info</button>
                                </footer>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
export default {
    head() {
        return {
            title: 'About',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'About me - my skillset and work history'
                }
            ]
        }
    },
    data() {
        return {
            openedWorkplaceId: null,
        }
    },
}
</script>

<style lang="stylus">
.ProCon
    @media $small-wide-up
        display flex

    &-item
        &:first-child
            @media $small-max
                margin-bottom 30px

        @media $small-wide-up
            width 50%

.Workplace
    @media $xlarge-up
        margin-left -110px

    &-item
        margin-bottom 40px
        display flex
        flex-flow row wrap

        @media $small-wide-up
            flex-flow row

    &-image
        position absolute
        width 80px
        margin 0 auto 15px
        flex 0 0 auto

        @media $small-wide-up
            position static
            width 110px
            padding-right 50px
            margin 0 0 15px

        img
            width 100%

    &-content
        flex 1 1 100%

    &-title
        font-family $font-worksans
        margin-bottom 10px
        margin-left 100px

        @media $small-wide-up
            margin-left 0

        @media $medium-up
            font-size 2.4rem

    &-date
        font-family $font-worksans
        font-size 1.4rem
        font-weight 600
        margin-left 100px
        margin-bottom 20px
        display block
        line-height 1.2

        @media $small-wide-up
            margin-left 0

    &-footer
        text-align right
        display flex
        align-items center

        .Link
            padding 15px 0 0 0
            margin-right 15px

    &-text
        margin-bottom 0

    &-textMoreRow
        display flex
        margin-bottom 5px

    &-textMore
        strong
            font-family $font-worksans
            font-size .95em
            width 230px
            flex 0 0 auto

.SectionAboutWorkplace
    .Section-arrow
        &--top
            transform scale(1.5)

        &--bottom
            transform scale(1.5)
</style>