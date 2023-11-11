<template v-if="planetData">
    <div class="wrapper">
        <div class="planet-card">
            <div class="planet-card__image">
                <img :src="creatorImage()" :alt="planetData?.name.toLowerCase()" @error="imageError = true"/>
                <div class="planet-card__unit-name">{{ planetData?.name }}</div>
            </div>
            
            <!-- <div class="planet-card__unit-description">
                Description of the terrain: {{ planetData?.terrain }}
            </div> -->

            <div class="planet-card__unit-pop p-3">Pop: {{ planetData?.population }}</div>

            <div class="planet-card__unit-stats clearfix">
                <div class="one-third">
                    <div class="stat">{{ planetData?.rotation_period }}<sup>Hs</sup></div>
                    <div class="stat-value">Rotation</div>
                </div>

                <div class="one-third">
                    <div class="stat">{{ planetData?.orbital_period }}<sup>Days</sup></div>
                    <div class="stat-value">Orbital</div>
                </div>

                <div class="one-third no-border">
                    <div class="stat">{{ planetData?.diameter }}</div>
                    <div class="stat-value">Diameter</div>
                </div>

            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Models
import { Planet } from '@/models/planet.model';


export default defineComponent({
    name: 'CardPlanet',
    props: {
        planetData: { type: Object as () => Planet }
    },
    setup(props) {
        const defaultImage = require('@/assets/star-wars-logo.png');
        let imageError = false;

        const creatorImage = () => {
            return imageError ? defaultImage : require(`@/assets/planets/${props.planetData?.name.toLowerCase()}.png`);
        }

        return {creatorImage, imageError}
    }
})
</script>


<style lang="scss">
.wrapper {
    padding-top: 40px;
    padding-bottom: 40px;

    &:focus {
        outline: 0;
    }
}

.planet-card {
    background: white;
    width: 300px;
    display: inline-block;
    margin: auto;
    border-radius: 17px;
    position: relative;
    text-align: center;
    box-shadow: -1px 15px 30px -12px black;
    z-index: 9999;
}

.planet-card__image {
    position: relative;
    height: 300px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg');

    img {
        width: 270px;
        position: absolute;
        top: -54px;
        left: -21px;
    }
}

.planet-card__unit-name {
    position: relative;
    font-size: 26px;
    color: var(--primary-color);
    font-weight: 900;
    margin-bottom: 5px;
    top: 40%;
}

.planet-card__unit-description {
    padding: 20px;
    margin-bottom: 10px;
}
.planet-card__unit-pop {
    background: var(--main-bg-color);
    border-color: transparent;
}


.planet-card__unit-stats {
    background: brown;
    color: white;
    font-weight: 700;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    .one-third {
        width: 33%;
        float: left;
        padding: 20px 15px;
    }

    sup {
        position: absolute;
        bottom: 4px;
        font-size: 45%;
        margin-left: 2px;
    }

    .stat {
        position: relative;
        font-size: 24px;
        margin-bottom: 10px;
    }

    .stat-value {
        text-transform: uppercase;
        font-weight: 400;
        font-size: 12px;
    }

    .no-border {
        border-right: none;
    }
}


.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
</style>