<template>
    <div id="app">
        <Header />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";

export default {
    name: "app",
    components: {
        Header
    }
};
</script>

<style lang="scss">
@import "@/styles/reset.scss";
</style>
