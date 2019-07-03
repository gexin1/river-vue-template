<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        key() {
            return this.$route.path;
        }
    }
};
</script>

<style scoped>
.app-main {
    height: 100vh;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    overflow: auto;
}
.fixed-header + .app-main {
    padding: 20px;
    padding-top: 70px;
}
</style>
