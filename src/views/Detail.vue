<template>
    <section class="detail-warp">
        <Loader v-if="loading" />
        <div
            class="container"
            v-else
            :style="{
                backgroundImage: `url(
                    https://image.tmdb.org/t/p/original${result.backdrop_path}
                )`
            }"
        >
            <div class="content">
                <div
                    class="cover"
                    :style="{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${
                            result.poster_path
                        })`
                    }"
                ></div>
                <div class="info">
                    <h2>{{ result.original_title }}</h2>
                    <div class="item-container">
                        <div class="sub-info">
                            <span>
                                {{
                                    result.original_title
                                        ? result.original_title
                                        : result.original_name
                                }}
                            </span>
                            <span>
                                {{
                                    result.runtime
                                        ? result.runtime
                                        : result.episode_run_time[0]
                                }}
                                분
                            </span>
                            <span>
                                {{
                                    result.genres &&
                                        result.genres.map((genre, index) =>
                                            index === result.genres.length - 1
                                                ? genre.name
                                                : `${genre.name}/ `
                                        )
                                }}
                            </span>
                        </div>
                        <div class="description">{{ result.overview }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/Loader";
import { MoviesApi, TVApi } from "@/api/movies";

export default {
    metaInfo() {
        return {
            title: this.loading
                ? "Loading | Nomflix"
                : `${
                    this.result.original_title
                        ? this.result.original_title
                        : this.result.original_name
                } | Nomflix`
        };
    },
    components: {
        Loader
    },
    data() {
        return {
            result: null,
            error: null,
            loading: true,
            isMovie: false
        };
    },
    async mounted() {
        const {
            path: pathname,
            params: { id }
        } = this.$router.history.current;

        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            this.$router.push("/");
        }

        this.isMovie = pathname.includes("/movie/") ? true : false;

        try {
            const { data: result } = this.isMovie
                ? await MoviesApi.movieDetail(parsedId)
                : await TVApi.showDetail(parsedId);

            this.result = result;
        } catch {
            this.error = "Can't find anything";
        } finally {
            this.loading = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
    padding: 50px;
}
.content {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
}
.info {
    width: 70%;
    margin-left: 30px;
    h2 {
        margin: 20px 0;
    }
}
.cover {
    width: 30%;
    height: 100%;
    border-radius: 5px;
    background-position: center center;
    background-size: cover;
}
.sub-info {
    margin-bottom: 10px;
    span {
        margin-right: 10px;
        &:last-child {
            margin: 0;
        }
    }
}
</style>
