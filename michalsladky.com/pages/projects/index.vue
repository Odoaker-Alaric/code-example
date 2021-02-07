<template>
    <main>
        <div class="PageHeader PageHeader--appended">
            <h1 class="PageHeader-title Alpha">Projects</h1>
        </div>
        <section class="Section">
            <div class="Container">
                <ProjectList :projects="projects" v-if="projects"></ProjectList>
            </div>
        </section>
    </main>
</template>

<script>
import { fetchItems } from '@/api'
import ProjectList from '@/components/project/ProjectList'

export default {
    head() {
        return {
            title: 'Projects',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Projects I have built'
                }
            ]
        }
    },
    components: {
        ProjectList,
    },
    asyncData({ params, error }) {
        return fetchItems('projects', {
                params: {
                    fields: 'id,title,slug,card_description,main_image.data.thumbnails',
                },
            })
            .then((res) => {
                return { projects: res.data.data }
            })
            .catch((e) => {
                // error({ statusCode: 404, message: "Projects not found" })
            })
    },
    data() {
        return {
            projects: [],
        }
    },
}
</script>

<style lang="stylus"></style>
