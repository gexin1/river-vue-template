<template>
    <el-table :data="data" border style="width: 100%" :height="height">
        <cloum-plug v-for="(item, index) in columns" :attr="item"></cloum-plug>
    </el-table>
</template>

<script>
export default {
    props: {
        data: {
            type: Array
        },
        columns: {
            type: Array
        }
    },
    data() {
        return {
            height: 300
        };
    }
};
</script>

<style></style>
