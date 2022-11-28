<template>
    <div>
        <LoginForm/>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
    components: {
        LoginForm: defineAsyncComponent(
            () => import('../components/LoginFormComponent.vue')
        )
    }
}
</script>