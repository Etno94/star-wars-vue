<template v-if="planetData">
    <div class="wrapper">
        <div class="clash-card barbarian">
            <div class="clash-card__image clash-card__image--barbarian">
                <img :src="creatorImage()" :alt="planetData?.name.toLowerCase()" @error="imageError = true"/>
            </div>
            <div class="clash-card__level clash-card__level--barbarian">Level 4</div>
            <div class="clash-card__unit-name">{{ planetData?.name }}</div>
            <div class="clash-card__unit-description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur placeat, facilis officia molestias necessitatibus quidem. Nesciunt veritatis fugiat expedita sint libero obcaecati necessitatibus ipsam excepturi similique, illo odit perferendis blanditiis.
            </div>

            <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
                <div class="one-third">
                    <div class="stat">20<sup>S</sup></div>
                    <div class="stat-value">Training</div>
                </div>

                <div class="one-third">
                    <div class="stat">16</div>
                    <div class="stat-value">Speed</div>
                </div>

                <div class="one-third no-border">
                    <div class="stat">150</div>
                    <div class="stat-value">Cost</div>
                </div>

            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Models
import { Planet } from '../../../../models/planet.model';


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


<style>
.wrapper {
    padding-top: 40px;
    padding-bottom: 40px;
}

.wrapper:focus {
    outline: 0;
}

.clash-card {
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

.clash-card__image {
    position: relative;
    height: 230px;
    margin-bottom: 35px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.clash-card__image--barbarian {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg');
}

.clash-card__image--barbarian img {
    width: 270px;
    position: absolute;
    top: -54px;
    left: -21px;
}

.clash-card__level {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 3px;
}

.clash-card__level--barbarian {
    color: rown;
}

.clash-card__unit-name {
    font-size: 26px;
    color: black;
    font-weight: 900;
    margin-bottom: 5px;
}

.clash-card__unit-description {
    padding: 20px;
    margin-bottom: 10px;
}

.clash-card__unit-stats--barbarian {
    background: brown;
}

.clash-card__unit-stats {
    color: white;
    font-weight: 700;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.clash-card__unit-stats .one-third {
    width: 33%;
    float: left;
    padding: 20px 15px;
}

.clash-card__unit-stats sup {
    position: absolute;
    bottom: 4px;
    font-size: 45%;
    margin-left: 2px;
}

.clash-card__unit-stats .stat {
    position: relative;
    font-size: 24px;
    margin-bottom: 10px;
}

.clash-card__unit-stats .stat-value {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 12px;
}

.clash-card__unit-stats .no-border {
    border-right: none;
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}

.slick-prev {
    left: 100px;
    z-index: 999;
}

.slick-next {
    right: 100px;
    z-index: 999;
}
</style>