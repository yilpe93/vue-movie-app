<template>
    <section class="tv-wrap wrap">
        <Loader v-if="loading" />
        <div class="container" v-else>
            <div class="top-list">
                <h2>Top Rated Shows</h2>
                <article v-if="topRated && topRated.length > 0">
                    <Poster
                        v-for="show in topRated"
                        :key="show.id"
                        :id="show.id"
                        :image-url="show.poster_path"
                        :title="show.original_name"
                        :rating="show.vote_average"
                        :year="
                            show.first_air_date &&
                                show.first_air_date.substring(0, 4)
                        "
                    ></Poster>
                </article>
            </div>

            <div class="popular-list">
                <h2>Popular Shows</h2>
                <article v-if="popular && popular.length > 0">
                    <Poster
                        v-for="show in popular"
                        :key="show.id"
                        :id="show.id"
                        :image-url="show.poster_path"
                        :title="show.original_name"
                        :rating="show.vote_average"
                        :year="
                            show.first_air_date &&
                                show.first_air_date.substring(0, 4)
                        "
                    ></Poster>
                </article>
            </div>

            <div class="airing-list">
                <h2>AiringToday Shows</h2>
                <article v-if="airingToday && airingToday.length > 0">
                    <Poster
                        v-for="show in topRated"
                        :key="show.id"
                        :id="show.id"
                        :image-url="show.poster_path"
                        :title="show.original_name"
                        :rating="show.vote_average"
                        :year="
                            show.first_air_date &&
                                show.first_air_date.substring(0, 4)
                        "
                    ></Poster>
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/Loader";
import Poster from "@/components/Poster";
import { TVApi } from "@/api/movies";

export default {
    metaInfo: {
        title: "TV Shows | Nomflix"
    },
    components: {
        Loader,
        Poster
    },
    data() {
        return {
            topRated: null,
            popular: null,
            airingToday: null,
            error: null,
            loading: true
        };
    },
    async mounted() {
        try {
            const {
                data: { results: topRated }
            } = await TVApi.topRated();

            const {
                data: { results: popular }
            } = await TVApi.popular();

            const {
                data: { results: airingToday }
            } = await TVApi.airingToday();

            this.topRated = topRated;
            this.popular = popular;
            this.airingToday = airingToday;
        } catch {
            this.error = "Can't find TV information";
        } finally {
            this.loading = false;
        }
    }
};
</script>

<style lang="scss" scoped>
article {
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
    margin-top: 25px;
}
</style>
