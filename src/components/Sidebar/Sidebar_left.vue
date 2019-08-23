<template>
    <div class="sidebar_left" v-bind:class="{ show: this.$store.state.global.COVER }">
        <div class="profile">
            <img src="@/assets/Sidebar/menu_2.svg" class="menu" alt="" @click="menuControl(false)">
            <div class="profile_temp">
                <img src="../../assets/Sidebar/profile.png" class="profile_img">
            </div>
            <div class="info">
                <p>Front End</p>
                <h1>MHeroBrine</h1>
            </div>
            <ul class="list">
                <div v-bind:class="{ hide: isFrontHide }">
                    <li v-bind:class="{ active: active.ALL }">
                        <img src="../../assets/Sidebar/menu.svg" v-show="!active.ALL">
                        <img src="../../assets/Sidebar/menu_active.svg" v-show="active.ALL">
                        <span @click="changePage('ALL')">ALL</span>
                    </li>
                    <li v-bind:class="{ active: active.HTML }">
                        <img src="../../assets/Sidebar/html.svg" v-show="!active.HTML">
                        <img src="../../assets/Sidebar/html_active.svg" v-show="active.HTML">
                        <span @click="changePage('HTML')">HTML</span>
                    </li>
                    <li v-bind:class="{ active: active.CSS }">
                        <img src="../../assets/Sidebar/css.svg" v-show="!active.CSS">
                        <img src="../../assets/Sidebar/css_active.svg" v-show="active.CSS">
                        <span @click="changePage('CSS')">CSS</span>
                    </li>
                    <li v-bind:class="{ active: active.JS }">
                        <img src="../../assets/Sidebar/js.svg" v-show="!active.JS">
                        <img src="../../assets/Sidebar/js_active.svg" v-show="active.JS">
                        <span @click="changePage('JS')">JS</span>
                    </li>
                    <!-- <li v-bind:class="{ active: active.NODE }">
                        <img src="../../assets/Sidebar/nodejs.svg" v-show="!active.NODE">
                        <img src="../../assets/Sidebar/nodejs_active.svg" v-show="active.NODE">
                        <span @click="changePage('NODE')">Node</span>
                    </li> -->
                    <li v-bind:class="{ active: active.PWA }">
                        <img src="../../assets/Sidebar/pwa.svg" v-show="!active.PWA">
                        <img src="../../assets/Sidebar/pwa_active.svg" v-show="active.PWA">
                        <span @click="changePage('PWA')">PWA</span>
                    </li>
                    <!-- <li v-bind:class="{ active: active.Internet }">
                        <img src="../../assets/Sidebar/net.svg" v-show="!active.Internet">
                        <img src="../../assets/Sidebar/net_active.svg" v-show="active.Internet">
                        <span @click="changePage('Internet')">Internet</span>
                    </li> -->
                    <li v-bind:class="{ active: active.Other }">
                        <img src="../../assets/Sidebar/other.svg" v-show="!active.Other">
                        <img src="../../assets/Sidebar/other_active.svg" v-show="active.Other">
                        <span @click="changePage('Other')">Other</span>
                    </li>
                    <li v-bind:class="{ active: active.Console }">
                        <img src="../../assets/Sidebar/console.svg" v-show="!active.Console">
                        <img src="../../assets/Sidebar/console_active.svg" v-show="active.Console">
                        <span @click="pushTo('/login')">Console</span>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import VueEvent from '../../model/VueEvent.js'
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 进入后台页面
                isFrontHide: false,
                // 当前显示
                active: {
                    ALL: true,
                    HTML: false,
                    CSS: false,
                    JS: false,
                    PWA: false,
                    Other: false,
                    Console: false
                },
                // 状态栏显示情况
                menuStatus: true
            }
        },
        mounted() {
            let that = this;
            VueEvent.$emit('controlMenu', function(val) {
                that.menuStatus = val;
            })
            this.init();
        },
        methods: {
            // 进入后台管理界面
            enterConsole() {
                this.isFrontHide = true;
            },
            // 转换侧栏标签
            changePage(address) {
                for(let item in this.active) {
                    this.active[item] = false;
                }
                this.active[address] = true;
                setTimeout(() => {
                    VueEvent.$emit('pageChange', address);
                }, 0);
                this.$router.push('/index');
            },
            // 侧栏初始化
            init() {
                let that = this;
                VueEvent.$on('sidebarInit', function() {
                    for(let item in that.active) {
                        that.active[item] = false;
                    }
                })
            },
            // 跳转
            pushTo(address) {
                this.$router.push(address);
            },
            // 控制菜单
            menuControl(state) {
                this.$store.commit('menuControl', state);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar_left {
        width: 250px;
        overflow-y: auto;
        height: 100%;
        background-color: #fff;
        box-shadow: 0px 0px 10px 0px rgb(192, 202, 212);
        // transition: width 1s;
        .menu {
            display: none;
        }
        .profile {
            width: 100%;
            height: 200px;
            padding-top: 20px;
            padding-left: 30px;
            .profile_temp {
                position: relative;
                width: 83px;
                height: 83px;
                border-radius: 50%;
                background-color: #ECE7E4;
                .profile_img {
                    position: absolute;
                    bottom: 0;
                    left: 6px;
                    width: 75px;
                    border-radius: 50%;
                }
            }
            .info {
                overflow: hidden;
                padding-left: 5px;
                margin-top: 17px;
                line-height: 10px;
                p {
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: 12px;
                    color: #666;
                }
                h1 {
                    font-weight: bold;
                    font-size: 20px;
                }
            }
            .list {
                display: flex;
                flex-direction: column;
                margin-top: 65px;
                padding-left: 3px;
                overflow: hidden;
                div {
                    transition: all 1s;
                    height: 400px;
                    overflow: hidden;
                }
                .hide {
                    height: 0;
                }
                li {
                    position: relative;
                    height: 50px;
                    line-height: 50px;
                    margin-top: 5px;
                    img {
                        position: absolute;
                        top: 10px;
                        width: 30px;
                    }
                    span {
                        cursor: pointer;
                        font-size: 14px;
                        top: 0;
                        left: 80px;
                        color: #8a8a8a;
                        position: absolute;
                        &:hover {
                            color: #93ADDB;
                        }
                    }
                }
                .active {
                    span {
                        color: #93ADDB;
                    }
                    &::before {
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 16px;
                        border-right: 15px solid #93ADDB;
                        border-top: 10px solid transparent;
                        border-bottom: 10px solid transparent;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1024px) {
        .sidebar_left {
            width: 0;
            height: 100%;
            position: fixed;
            z-index: 100;
            overflow-y: auto;
            // padding-bottom: 1000px;
            .menu {
                display: block;
                position: absolute;
                width: 20px;
                right: 20px;
            }
        }
        .show {
            width: 100%;
            // background-color: #000;
        }
    }
</style>
