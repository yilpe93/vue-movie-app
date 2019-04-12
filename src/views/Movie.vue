<template>
    <section class="movie-wrap wrap">
        <Loader v-if="loading" />
        <div class="container" v-else>
            <div class="now-list">
                <h2>Now Playing</h2>
                <article v-if="nowPlaying && nowPlaying.length > 0">
                    <Poster
                        v-for="movie in nowPlaying"
                        :key="movie.id"
                        :id="movie.id"
                        :image-url="movie.poster_path"
                        :title="movie.original_title"
                        :rating="movie.vote_average"
                        :year="
                            movie.release_date &&
                                movie.release_date.substring(0, 4)
                        "
                        :is-movie="true"
                    ></Poster>
                </article>
            </div>

            <div class="upcoming-list">
                <h2>Upcoming Movie</h2>
                <article v-if="upcoming && upcoming.length > 0">
                    <Poster
                        v-for="movie in upcoming"
                        :key="movie.id"
                        :id="movie.id"
                        :image-url="movie.poster_path"
                        :title="movie.original_title"
                        :rating="movie.vote_average"
                        :year="
                            movie.release_date &&
                                movie.release_date.substring(0, 4)
                        "
                        :is-movie="true"
                    ></Poster>
                </article>
            </div>

            <div class="popular-list">
                <h2>Popular Movie</h2>
                <article v-if="popular && popular.length > 0">
                    <Poster
                        v-for="movie in popular"
                        :key="movie.id"
                        :id="movie.id"
                        :image-url="movie.poster_path"
                        :title="movie.original_title"
                        :rating="movie.vote_average"
                        :year="
                            movie.release_date &&
                                movie.release_date.substring(0, 4)
                        "
                        :is-movie="true"
                    ></Poster>
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/Loader";
import Poster from "@/components/Poster";
import { MoviesApi } from "@/api/movies";

export default {
    metaInfo: {
        title: "Movies | Nomflix"
    },
    components: {
        Loader,
        Poster
    },
    data() {
        return {
            nowPlaying: null,
            upcoming: null,
            popular: null,
            error: null,
            loading: true
        };
    },
    async mounted() {
        try {
            const {
                data: { results: nowPlaying }
            } = await MoviesApi.nowPlaying();

            const {
                data: { results: upcoming }
            } = await MoviesApi.upcoming();

            const {
                data: { results: popular }
            } = await MoviesApi.popular();

            this.nowPlaying = nowPlaying;
            this.upcoming = upcoming;
            this.popular = popular;
        } catch {
            this.error = "Can't find movies information";
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
