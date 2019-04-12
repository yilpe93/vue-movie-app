<template>
    <section class="search-wrap wrap">
        <form>
            <input
                type="text"
                placeholder="Search Movies or TV Shows..."
                @keypress.enter.prevent="handleSubmit"
                v-model="searchTerm"
            />
        </form>
        <Loader v-if="loading" />
        <div class="container" v-else>
            <div
                class="movie-list"
                v-if="movieResults && movieResults.length > 0"
            >
                <h2>Movie Resultes</h2>
                <article>
                    <Poster
                        v-for="movie in movieResults"
                        :key="movie.id"
                        :id="movie.id"
                        :image-url="movie.poster_path"
                        :title="movie.original_title"
                        :rating="movie.vote_average"
                        :year="
                            movie.release_date &&
                                movie.release_date.substring(0, 4)
                        "
                        :isMovie="true"
                    />
                </article>
            </div>

            <div class="tv-list" v-if="tvResults && tvResults.length > 0">
                <h2>TV Show Resultes</h2>
                <article>
                    <Poster
                        v-for="show in tvResults"
                        :key="show.id"
                        :id="show.id"
                        :image-url="show.poster_path"
                        :title="show.original_name"
                        :rating="show.vote_average"
                        :year="
                            show.first_air_date &&
                                show.first_air_date.substring(0, 4)
                        "
                    />
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/Loader";
import Poster from "@/components/Poster";
import { MoviesApi, TVApi } from "@/api/movies";

export default {
    metaInfo: {
        title: "Search By | Nomflix"
    },
    components: {
        Loader,
        Poster
    },
    data() {
        return {
            movieResults: null,
            tvResults: null,
            searchTerm: "",
            error: null,
            loading: false
        };
    },
    methods: {
        async searchByTerm() {
            this.loading = true;
            try {
                const {
                    data: { results: movieResults }
                } = await MoviesApi.search(this.searchTerm);

                const {
                    data: { results: tvResults }
                } = await TVApi.search(this.searchTerm);

                this.movieResults = movieResults;
                this.tvResults = tvResults;
            } catch {
                this.error = "Can't find results";
            } finally {
                this.loading = false;
            }
        },
        handleSubmit() {
            if (this.searchTerm !== "") {
                this.searchByTerm();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
form {
    width: 100%;
    margin-bottom: 50px;
    input {
        all: unset;
        width: 100%;
        font-size: 28px;
    }
}
.container {
    > div {
        &:first-child {
            margin-bottom: 80px;
        }
    }
}
article {
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
    margin-top: 25px;
}
</style>
