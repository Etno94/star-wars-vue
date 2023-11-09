<template>
    <div class="table-responsive"> <!--class="table-wrapper"-->
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col" v-for="(header, kh) in tableHeaderValues" :key="kh" @click="sortRows(header)">
                        <span>{{ header }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, kr) in sortedRows" :key="kr">
                    <td v-for="(cell, kc) in row" :key="kc">
                        <span>{{ cell }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'BsTable',
    props: {
        tableHeaderValues: { type: Array as () => string[] },
        tableRowValues: { type: Array as () => any[] }
    },
    setup(props) {
        console.log(props);

        let sortKey = 'name';
        let reverse=  false;
        const sortedRows = ref(props.tableRowValues);

        const sortRows = (header: string) => {
            console.log('sorting rows', header);
            if (sortKey === header) {
                reverse = !reverse;
            } else {
                sortKey = header;
                reverse = false;
            }
            console.log(sortKey, reverse);
            console.log(sortedRows.value);

            sortedRows.value = [...props.tableRowValues as any[]].sort((a: any, b: any) => {
                const modifier = reverse ? -1 : 1;
                console.log(a, b);

                const valA = a[sortKey];
                const valB = b[sortKey];
                console.log(valA, valB);
                if (valA < valB) return -modifier;
                if (valA > valB) return modifier;
                return 0;
            });
            console.log(sortedRows.value);

        };

        watch(
            () => props.tableRowValues,
            (newValue) => {
                sortedRows.value = [...newValue as any[]];
            }
        );

        return { sortedRows, sortRows };
    }
});
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