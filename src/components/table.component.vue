<template>
    <div class="table-wrapper">
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col" v-for="(header, kh) in tableHeaderValues" :key="kh">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, kr) in tableRowValues" :key="kr">
                    <td v-for="(cell, kc) in row" :key="kc">{{ cell }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'BSTable',
    props: {
        'tableHeaderValues': { type: Array },
        'tableRowValues': { type: Array }
    },
    setup(props) {
        console.log(props);
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.table-wrapper {
    position: relative;
    max-height: 85vh;
    max-width: 100%;
    overflow: auto;
    display: block;
    flex: 0 1 100%;
}
</style>