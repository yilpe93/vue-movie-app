<template>
    <div class="poster">
        <router-link :to="isMovie ? `/movie/${id}` : `/show/${id}`">
            <div class="imageContainer">
                <img
                    :src="
                        imageUrl
                            ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                            : require('@/assets/noPosterSmall.png')
                    "
                    :alt="title"
                />
                <p class="rating">
                    <span role="img" aria-label="rating">⭐️</span>
                    {{ rating }}/10
                </p>
            </div>
            <h3 v-if="title.length > 15">{{ substringTitle }}</h3>
            <h3 v-else>{{ title }}</h3>
            <p class="year">{{ year }}</p>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        imageUrl: String,
        title: String,
        rating: Number,
        year: String,
        isMovie: Boolean
    },
    computed: {
        substringTitle() {
            return this.title.substring(0, 18) + "...";
        }
    }
};
</script>

<style lang="scss" scoped>
.imageContainer {
    position: relative;
    margin-bottom: 5px;
    img {
        width: 100%;
        max-height: 180px;
        border-radius: 4px;
        transition: opacity 0.1s linear;
    }
    .rating {
        position: absolute;
        bottom: 5px;
        right: 0;
        opacity: 0;
    }
    &:hover {
        img {
            opacity: 0.3;
        }
        .rating {
            opacity: 1;
        }
    }
}
.title {
    margin-bottom: 3px;
    line-height: 1.4;
}
.year {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
}
</style>
