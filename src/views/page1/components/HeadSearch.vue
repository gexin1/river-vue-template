<template>
    <el-form
        :size="size"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="100px"
        label-position="left"
    >
        <template v-for="(formItem, key) in formList">
            <el-form-item
                label="商品名称"
                :key="key"
                v-if="formItem.type === 'input'"
                v-bind="formItem.attr"
            >
                <el-input
                    v-model="formInline.user"
                    :placeholder="`请输入${formItem.name}`"
                ></el-input>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
export default {
    name: 'HeadSearch',
    data() {
        return {
            size: 'mini',
            formList: [
                {
                    key: 'user',
                    name: '用户',
                    type: 'input',
                    attr: {}
                }
            ],
            formInline: {
                user: ''
            }
        };
    }
};
</script>

<style></style>
