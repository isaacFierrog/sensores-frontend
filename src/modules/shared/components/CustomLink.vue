<template>
    <div>
        <a 
            v-if="esLinkExterno"
            :href="link.to"
            class="normal-link">
            {{ link.name }}
        </a>
        <router-link 
            v-else
            :to="link.to"
            v-slot="{ href, isActive }">
                <a 
                    :href="href"
                    :class="isActive ? 'is-active' : 'normal-link'">
                    {{ link.name }}
                </a>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    computed: {
        esLinkExterno(){
            return this.link.to.startsWith('http');
        }
    }
}
</script>

<style scoped>
.is-active{
    color: #42b983;
}

.normal-link{
    color: #2c3e50;
}
</style>