<template>
    <div class="table-responsive">
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col" v-for="(header, kh) in tableHeaderValues" :key="kh" @click="sortRows(header)">
                        <div class="d-flex flex-row align-items-center">
                            <span class="mr-1">{{ header }}</span>
                            <template v-if="sortKey == header">
                                <AfIcon v-if="!reverse" :icon="'arrow-up'" :fill="'#FFFFFF'"></AfIcon>
                                <AfIcon v-if="reverse" :icon="'arrow-down'" :fill="'#FFFFFF'"></AfIcon>
                            </template>
                        </div>
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
import AfIcon from '@/components/icons/arrow-up.icon.vue';

export default defineComponent({
    name: 'BsTable',
    components: {
        AfIcon
    },
    props: {
        tableHeaderValues: { type: Array as () => string[] },
        tableRowValues: { type: Array as () => any[] }
    },
    setup(props) {

        let sortKey = ref('name');
        let reverse = ref(false);
        const sortedRows = ref([] as any[]);

        const sortRows = (header: string) => {
            if (sortKey.value === header) {
                reverse.value = !reverse.value;
            } else {
                sortKey.value = header;
                reverse.value = false;
            }

            sortedRows.value = [...props.tableRowValues as any[]].sort((a: any, b: any) => {
                const modifier = reverse.value ? -1 : 1;
                const valA = a[sortKey.value];
                const valB = b[sortKey.value];
                if (valA < valB) return -modifier;
                if (valA > valB) return modifier;
                return 0;
            });
        };

        watch(
            [() => props.tableRowValues, () => sortKey.value, () => reverse.value],
            ([tableRowValues, currentSortKey, currentReverse]) => {
                if (tableRowValues && tableRowValues.length > 0) {
                    sortedRows.value = [...tableRowValues].sort((a: any, b: any) => {
                        const modifier = currentReverse ? -1 : 1;
                        const valA = a[currentSortKey];
                        const valB = b[currentSortKey];
                        if (valA < valB) return -modifier;
                        if (valA > valB) return modifier;
                        return 0;
                    });
                }
            },
            { immediate: true }
        );


        return { sortKey, reverse, sortedRows, sortRows };
    }
});
</script>

<style lang="scss" scoped>
div.table-responsive table thead tr th span{
    color: var(--accent-color);
    cursor: pointer;
    margin-right: 12px;
}
</style>