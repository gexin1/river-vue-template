<template>
    <Submenu :name="`${parentName}`">
        <template slot="title">
            <svg-icon
                :icon-class="parentItem.meta.icon"
                :size="14"
                class="menu-icon"
            ></svg-icon>
            <span>{{ showTitle(parentItem) }}</span>
        </template>
        <template v-for="item in children">
            <template v-if="item.children && item.children.length === 1">
                <side-menu-item
                    v-if="showChildren(item)"
                    :key="`menu-${item.name}`"
                    :parent-item="item"
                ></side-menu-item>
                <menu-item
                    v-else
                    :name="getNameOrHref(item, true)"
                    :key="`menu-${item.children[0].name}`"
                >
                    <svg-icon
                        :icon-class="item.children[0].meta.icon"
                        :size="14"
                        class="menu-icon"
                    ></svg-icon>
                    <span>{{ showTitle(item.children[0]) }}</span>
                </menu-item>
            </template>
            <template v-else>
                <side-menu-item
                    v-if="showChildren(item)"
                    :key="`menu-${item.name}`"
                    :parent-item="item"
                ></side-menu-item>
                <menu-item
                    v-else
                    :name="getNameOrHref(item)"
                    :key="`menu-${item.name}`"
                >
                    <svg-icon
                        :icon-class="item.meta.icon"
                        :size="14"
                        class="menu-icon"
                    ></svg-icon>
                    <span>{{ showTitle(item) }}</span>
                </menu-item>
            </template>
        </template>
    </Submenu>
</template>
<script>
import mixin from './mixin';
import itemMixin from './item-mixin';
export default {
    name: 'SideMenuItem',
    mixins: [mixin, itemMixin]
};
</script>
<style lang="scss" scoped>
/deep/ .menu-icon {
    margin-right: 12px;
}
</style>
