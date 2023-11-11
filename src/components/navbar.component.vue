<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav flex-fill justify-content-center">
                    <li v-for="(nav, id) in navigation" :key="id" class="nav-item m-3 active">
                        <router-link :to="nav.url" class="button">
                            <span class="text">{{ nav.content }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {Navigation} from '../navigation/navigation';

export default defineComponent({
    name: 'NavBar',
    data() {
    return {
      navigation: Navigation
    };
  },
});
</script>

<style>
/* Reset */
a {
    color: var(--primary-color);
    text-decoration: none;
}
a:hover {
    color: var(--accent-color);
    text-decoration: none;
}
/* Reset */

nav {
    flex: 1 1 90%;
}

</style>