import Vue from "vue";
import Router from "vue-router";
import Movie from "@/views/Movie";
import TV from "@/views/TV";
import Search from "@/views/Search";
import Detail from "@/views/Detail";
import NotFound from "@/views/NotFound";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "movie",
            component: Movie
        },
        {
            path: "/tv",
            name: "tv",
            component: TV
        },
        {
            path: "/search",
            name: "search",
            component: Search
        },
        {
            path: "/movie/:id",
            name: "movie detail",
            component: Detail
        },
        {
            path: "/show/:id",
            name: "show detail",
            component: Detail
        },
        {
            path: "/404",
            name: "404",
            component: NotFound
        },
        {
            path: "*",
            redirect: "404"
        }
    ]
});
