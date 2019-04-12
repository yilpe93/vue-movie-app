<template>
    <header>
        <nav>
            <ul>
                <li>
                    <router-link to="/">Movie</router-link>
                </li>
                <li>
                    <router-link to="/tv">TV</router-link>
                </li>
                <li>
                    <router-link to="/search">Search</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    color: white;
    background: rgba(20, 20, 20, 0.6);
    z-index: 10;
    box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.8);
}

nav {
    ul {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        margin: 0;
        padding: 0;
        li {
            list-style: none;
            width: 80px;
            text-align: center;
            a {
                font-size: 18px;
                border: 0 none;
                &.router-link-exact-active {
                    border-bottom: 5px solid #3498db;
                    transition: border-bottom 0.3s ease-in-out;
                }
            }
        }
    }
}
</style>
