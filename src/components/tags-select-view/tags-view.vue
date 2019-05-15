<template>
    <div class="tags_view">
        <div class="before btn" @click="pre"></div>
        <div class="after btn" @click="next"></div>
        <div
            class="close_other btn"
            title="关闭其他标签"
            @click="closeOtherTag"
        ></div>
        <div class="tag_box" ref="tagBox">
            <ul class="tag_list" ref="tagList" :style="scrollLeftToStyle">
                <li
                    class="tag_list_item"
                    v-for="(item, index) in visitedViewsGetters"
                    :key="index"
                    @click="linkTo(item)"
                    :ref="`tagItem-${item.path}`"
                >
                    <div :class="['tag_item', isActive(item) ? 'active' : '']">
                        <i class="tag_icon tag_dot"></i>
                        {{ item.name }}
                        <i
                            class="tag_icon tag_close"
                            @click.prevent.stop="closeSelectedTag(item)"
                        ></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    name: 'TagsView',
    data() {
        return {
            scrollLeft: 0
        };
    },
    created() {},
    computed: {
        ...mapGetters('tagsView', ['visitedViewsGetters']),
        scrollLeftToStyle() {
            return {
                transform: `translateX(-${this.scrollLeft}px)`
            };
        }
    },
    mounted() {},
    methods: {
        ...mapMutations('tagsView', ['DEL_ROUTE', 'DEL_OTHER_ROUTE']),
        isActive(route) {
            return route.path === this.$route.path;
        },
        closeOtherTag() {
            this.DEL_OTHER_ROUTE({
                path: this.$route.path
            });
        },
        closeSelectedTag({ path }) {
            this.DEL_ROUTE({ path });
        },
        linkTo({ path, query }, index) {
            this.$router.push({ path, query });
            this.$nextTick(() => {
                this.moveTo(path);
            });
        },
        //移动tag在标签内
        moveTo(path) {
            if (!this.$refs[`tagItem-${path}`]) {
                return;
            }
            const tagItem = this.$refs[`tagItem-${path}`][0];
            const boxWidth = this.$refs.tagBox.offsetWidth;
            const listWidth = this.$refs.tagList.offsetWidth;
            const itemOffsetLeft = tagItem.offsetLeft;
            const itemOffsetWidth = tagItem.offsetWidth;
            if (boxWidth >= listWidth) {
                //标签在视觉内
            } else if (itemOffsetLeft <= this.scrollLeft) {
                //标签左边超出
                this.scrollLeft = itemOffsetLeft;
            } else if (
                itemOffsetLeft + itemOffsetWidth - this.scrollLeft >
                boxWidth
            ) {
                //标签右边超出
                this.scrollLeft = itemOffsetLeft + itemOffsetWidth - boxWidth;
            } else {
                //标签未超出
            }
        },
        /**
         * 移动tagItem一段距离
         */
        scrollTo(distance) {
            const boxWidth = this.$refs.tagBox.offsetWidth;
            const listWidth = this.$refs.tagList.offsetWidth;
            if (this.scrollLeft + boxWidth + distance >= listWidth) {
                //如果右移动超出最大值
                this.scrollLeft = listWidth - boxWidth;
            } else if (this.scrollLeft + distance <= 0) {
                //如果左移动超出最小值
                this.scrollLeft = 0;
            } else {
                //如果中间值
                this.scrollLeft = this.scrollLeft + distance;
            }
        },

        /**
         * 移动到指定tag的位置
         */
        moveToTag() {},

        pre() {
            this.scrollTo(-500);
        },
        next() {
            this.scrollTo(500);
        },
        refreshTagPosition() {
            this.$nextTick(() => {
                this.$route.path && this.moveTo(this.$route.path);
            });
        }
    },
    watch: {
        $route: {
            immediate: true,
            deep: true,
            handler(val) {
                this.refreshTagPosition();
            }
        },
        visitedViewsGetters: {
            immediate: true,
            deep: true,
            handler(val) {
                this.refreshTagPosition();
            }
        }
    }
};
</script>

<style scoped>
.tags_view {
    position: relative;
    width: 100%;
    padding: 4px 74px 4px 32px;
    box-sizing: border-box;
    overflow: hidden;
    user-select: none;
    background: #f0f0f0;
    box-sizing: border-box;
    height: 40px;
}
.tags_view .tag_box {
    overflow: hidden;
    width: 100%;
}
.tags_view .tag_list {
    transition: transform 0.2s ease;
    display: inline-block;
    white-space: nowrap;
    position: relative;
}
.tags_view .btn {
    background-size: 60%;
    box-sizing: border-box;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: center;
    width: 32px;
    position: absolute;
    content: '';
    display: inline-block;
    z-index: 1;
    height: 100%;
    top: 0px;
    background-color: #fff;
    cursor: pointer;
}
.tags_view .before {
    left: 0;
    background-image: url('./images/left-arrow.png');
}
.tags_view .before:hover {
    background-image: url('./images/left-arrow-active.png');
}
.tags_view .after {
    right: 31px;
    background-image: url('./images/right-arrow.png');
}
.tags_view .close_other {
    right: 0;
    background-image: url('./images/close-other.png');
}
.tags_view .close_other:hover {
    background-image: url('./images/close-other-active.png');
}
.tags_view .after:hover {
    background-image: url('./images/right-arrow-active.png');
}
.tags_view .tag_list .tag_list_item {
    display: inline-block;
    padding-left: 10px;
}
.tags_view .tag_list .tag_list_item .tag_item {
    background-color: #fff;
    display: inline-block;
    padding: 0 12px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #e8eaec;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 3px;
    color: #515a6e;
    position: relative;
}
.tags_view .tag_list .tag_list_item .tag_item:hover {
    opacity: 0.85;
}
.tags_view .tag_list .tag_list_item .tag_item .tag_icon.tag_dot {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    background: #e8eaec;
    margin-right: 8px;
}
.tags_view .tag_list .tag_list_item .tag_item.active .tag_icon.tag_dot {
    background-color: #2d8cf0;
}
.tags_view .tag_list .tag_list_item .tag_item .tag_icon.tag_close {
    margin-left: 5px;
}

.tags_view .tag_list .tag_list_item .tag_item .tag_icon {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 20px;
    width: 20px;
    line-height: 20px;
    top: -1px;
    display: inline-block;
    background: url('./images/close.png') no-repeat center;
    background-size: 50%;
    vertical-align: middle;
    opacity: 0.66;
}

.tags_view .tag_list .tag_list_item .tag_item .tag_icon:hover {
    opacity: 1;
}
</style>
