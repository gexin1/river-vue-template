<template>
    <div class="page1">
        <div>Page1</div>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                {{ item.name }}<button>xinzeng2</button>
            </li>
            <el-table :data="list">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column label="操作">
                    <template>
                        <div>
                            <el-button size="mini">查看122</el-button>
                            <el-button size="mini">编辑</el-button>
                            <el-button size="mini">编辑2</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Page1',
    data() {
        return {
            list: [
                {
                    name: '1'
                },
                {
                    name: '2'
                }
            ]
        };
    },
    created() {}
};
</script>

<style></style>
