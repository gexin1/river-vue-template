<template>
    <div class="nav_bar">
        <div
            :class="{ menu_icon: true, active: collapseStatus }"
            @click="menuChange"
        >
            <svg-icon icon-class="menu" :size="20" />
        </div>
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem
                    v-for="(item, index) in breadlist"
                    :key="index"
                    :to="{ path: item.path }"
                    >{{ item.meta.name }}</BreadcrumbItem
                >
            </Breadcrumb>
        </div>
        <div class="user_name">{{ userInfo.nickname }}</div>
        <Dropdown trigger="hover" @on-click="handleCommand">
            <span class="el-dropdown-link">
                <div class="user_info">
                    <div class="avator">
                        <img :src="userInfo.avator || defaultAvator" />
                    </div>
                    <div class="tool">
                        <svg-icon icon-class="xiajiantou" />
                    </div>
                </div>
            </span>
            <DropdownMenu slot="list">
                <DropdownItem name="HOME">HOME</DropdownItem>
                <DropdownItem name="LOGINOUT">退出</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import defaultAvator from '@/assets/user/logo.jpeg';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'NavBar',
    data() {
        return { defaultAvator, breadlist: [] };
    },
    computed: {
        ...mapGetters('userInfo', {
            userInfo: 'getUserInfo'
        }),
        ...mapGetters('app', {
            collapseStatus: 'sideCollapseGetter'
        })
    },
    created() {
        this.getBread();
        this.checkUserInfo();
    },
    methods: {
        ...mapMutations('app', ['TOGGLE_SIDE_COLLAPSE']),
        ...mapMutations('userInfo', ['clearUserInfo']),
        ...mapActions('userInfo', ['reqGetUserInfo']),
        menuChange() {
            this.TOGGLE_SIDE_COLLAPSE();
        },
        getBread() {
            this.breadlist = this.$route.matched;
        },
        checkUserInfo() {
            if (JSON.stringify(this.userInfo) === '{}') {
                this.reqGetUserInfo();
            }
        },
        handleCommand(e) {
            if (e === 'HOME') {
                this.$router.push('/');
            }
            if (e === 'LOGINOUT') {
                this.loginOut();
            }
        },
        loginOut() {
            this.clearUserInfo();
            this.$router.push({ path: '/login' });
        }
    },
    watch: {
        $route() {
            this.getBread();
            this.checkUserInfo();
        }
    }
};
</script>

<style lang="scss" scoped>
.nav_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    padding: 0 20px;
    .menu_icon {
        line-height: initial;
        cursor: pointer;
        transition: all ease 0.5s;
        &.active {
            transform: rotate(-90deg);
        }
    }
    .breadcrumb {
        flex: auto;
        margin-left: 20px;
    }
    .user_name {
        font-size: 13px;
        margin-right: 15px;
        font-weight: 600;
    }
    .user_info {
        display: flex;
        align-items: center;
        cursor: pointer;
        .avator {
            margin-right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid #ddd;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .tool {
            color: #333;
        }
    }
}
</style>
