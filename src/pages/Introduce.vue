<template>
    <div id="introduce">
        <div class="container" v-bind:style="{ transform: 'translateY(-' + (pageNow - 1) * 20 + '%)' }">
            <div class="page_1">
                <div class="profile">
                    <div class="img">
                        <img src="@/assets/Sidebar/profile.png" alt="" class="profile_img">
                    </div>
                </div>
                <div class="info">
                    <div class="part_1">
                        <p>姓名：<span>王昊岩 - MHeroBrine</span></p>
                        <p>在读学校：<span>重庆邮电大学 - 2017级</span></p>
                        <p>专业：<span>信息管理与信息系统</span></p>
                        <p>学历：<span>大学本科</span></p>
                        <p>求职意向：<span>web前端</span></p>
                        <p>联系方式：<span>13705971109</span></p>
                        <p>邮箱：<span>mherobrine@foxmail.com</span></p>
                    </div>
                    <div class="divide">

                    </div>
                    <div class="part_2">
                        <p>我是来自重庆邮电大学2017级学生王昊岩，从2017年10月开始接触学习前端，距今为止有2年以上的前端开发经验。</p>
                        <p>我对新技术抱有热情的同时，也同样喜欢研究它们背后的原理和思想。</p>
                        <p>有强烈的时间观念和责任心，能按时完成分配的任务。</p>
                    
                        <p style="margin-top: 20px;">两年前端开发经验，熟悉HTML、CSS、Javascript，能熟练开发符合W3C标准的页面。</p>
                        <p>熟练掌握vue全系列的使用，开发过一些小型项目和一个中型项目，对vue的原理及其思想有所探究。</p>
                        <p>能使用Git进行版本控制和代码托管，使用规范的commit规则，能使用markdown撰写文档。</p>
                    </div>
                </div>
                <!-- <div class="nav">
                    <div class="slot">
                        <img src="@/assets/Introduce/github.svg" alt="">
                    </div>
                    <div class="slot">
                        <img src="@/assets/Introduce/mail.svg" alt="">
                    </div>
                    <div class="slot">
                        <img src="@/assets/Introduce/QQ.svg" alt="">
                    </div>
                    <div class="slot">
                        <img src="@/assets/Introduce/music.svg" alt="">
                    </div>
                </div> -->
            </div>
            <div class="page_2">
                <h2>专业技能</h2>
                <div class="content">
                    <ul class="row">
                        <li>
                            <div class="circle">
                                <img src="@/assets/Introduce/html5.svg" alt="">
                                <span>HTML5</span>
                            </div>
                        </li>
                        <li>
                            <div class="circle">
                                <img src="@/assets/Introduce/css3.svg" alt="">
                                <span>CSS3</span>
                            </div>
                        </li>
                        <li>
                            <div class="circle">
                                <img src="@/assets/Introduce/javascript.svg" alt="">
                                <span>Javascript</span>
                            </div>
                        </li>
                        <li>
                            <div class="circle">
                                <img src="@/assets/Introduce/bootstrap.svg" alt="">
                                <span>Bootstrap</span>
                            </div>
                        </li>
                    </ul>
                    <ul class="row">
                        <li>
                            <div class="circle">
                                <img src="@/assets/Introduce/sass.svg" alt="">
                                <span>Sass</span>
                            </div>
                        </li>
                        <li>
                            <div class="circle">
                                <img src="@/assets/Introduce/vuejs.svg" alt="">
                                <span>Vue</span>
                            </div>
                        </li>
                        <li>
                            <div class="circle">
                                <img src="@/assets/Introduce/git.svg" alt="">
                                <span>Git</span>
                            </div>
                        </li>
                        <li>
                            <div class="circle">
                                <img src="@/assets/Introduce/webpack.svg" alt="">
                                <span>Webpack</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page_3">
                <h2>项目经历</h2>
                <ul>
                    <li class="ERP">ERP虚拟运营系统（学生端）</li>
                    <p><span>-&nbsp;</span>仓库地址：<a href="https://github.com/MHeroBrine/NewErp">https://github.com/MHeroBrine/NewErp</a></p>
                    <p><span>-&nbsp;</span>简介：ERP系统是企业资源计划 (Enterprise Resource Planning) 的简称，是指建立在信息技术基础上，集信息技术与先进管理思想于一身，以系统化的管理思想，为企业员工及决策层提供决策手段的管理平台。系统是基于Vue2.0，配合vue-router，vuex搭建的中型项目，主要实现了市场管理、产品管理、采购管理等7个模块的功能、以及对游戏进程的控制。</p>
                    <p><span>-&nbsp;</span>技术栈：Vue2.0 + Vue-router + Vuex + Axios + Webapck + ES6</p>
                    <p><span>-&nbsp;</span>技术难点：中型项目的代码组织规划、项目组件化、游戏准备阶段的状态控制、webpack打包优化</p>
                
                    <li class="weather">基于service worker的天气应用</li>
                    <p><span>-&nbsp;</span>演示地址：<a href="https://mherobrine.github.io/pwaTest/">https://mherobrine.github.io/pwaTest/</a>（限手机端）</p>
                    <p><span>-&nbsp;</span>简介：该天气应用是基于service worker实现的PWA demo，实现了应用的离线使用，在线时更新。</p>

                    <li class="weather">博客</li>
                    <p><span>-&nbsp;</span>仓库地址：<a href="https://github.com/MHeroBrine/blog">https://github.com/MHeroBrine/blog</a></p>
                    <p><span>-&nbsp;</span>简介：前端基于vue2.0，后端基于nodejs，数据库基于mongoDB搭建与Linux的博客，同时兼容PC端、移动设备。并且分为博客展示部分和后台管理部分。</p>
                    <p><span>-&nbsp;</span>前端技术栈：Vue2.0 + Vue-router + Vuex + Axios + Webpack + ES6</p>
                    <p><span>-&nbsp;</span>后台技术栈：Node + Express + MongoDB</p>
                    <p><span>-&nbsp;</span>服务器：CentOS</p>
                </ul>
            </div>
            <div class="page_4">
                <h2>联系作者</h2>
                <p>Email: mherobrine@foxmail.com</p>
                <p>QQ: 531966844</p>
            </div>
        </div>
        <!-- <img class="pageUp" src="@/assets/Introduce/arrow_up.svg" @click="pageUp()" v-show="pageNow != 1"/> -->
        <!-- <img class="pageDown" src="@/assets/Introduce/arrow_down.svg" @click="pageDown()"/> -->
    </div>
</template>

<script>
    import VueEvent from '../model/VueEvent'
    
    export default {
        data() {
            return {
                pageNow: 1
            }
        },
        methods: {
            pageDown() {
                this.pageNow ++;
            },
            pageUp() {
                this.pageNow --;
            },
            pageChange(page) {
                this.pageNow = page;
            }
        },
        mounted() {
            this.$store.commit('pageState', 'introduce')
            VueEvent.$on('pageChange_introduce', (page) => {
                this.pageChange(page);
            })
            VueEvent.$emit('sidebarState', 'introduce');
        },
        beforeDestroy() {
            VueEvent.$emit('sidebarState', 'homePage');
        }
    }
</script>

<style lang="scss" scoped>
    #introduce {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .container {
            height: 500%;
            transition: all 1s;
            // transform: translateY(-20%);
            .page_1 {
                position: relative;
                height: 20%;
                background-color: #93ADDB;
                .profile {
                    position: absolute;
                    text-align: center;
                    top: 80px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: 0 auto;
                    width: 200px;
                    height: 200px;
                    .img {
                        position: relative;
                        width: 200px;
                        height: 200px;
                        border-radius: 50%;
                        background-color: #ECE7E4;
                        overflow: hidden;
                    } 
                    .profile_img {
                        position: absolute;
                        bottom: 0;
                        left: 15px;
                        width: 180px;
                    }
                    .name {
                        margin-top: 10px;
                        font-size: 32px;
                        color: #fff;
                    }
                }
                .info {
                    position: absolute;
                    top: 320px;
                    width: 100%;
                    height: 350px;
                    padding: 30px;
                    // text-align: right;
                    display: flex;
                    // flex-direction: row-reverse;
                    color: #fff;
                    font-size: 16px;
                    .part_1 {
                        flex: 1;
                        height: 350px;
                        line-height: 28px;
                        padding-right: 50px;
                        p {
                            text-align: right;
                            span {
                                text-align: left;
                                display: inline-block;
                                width: 180px;
                            }
                        }
                    }
                    .divide {
                        flex: 0.01;
                        border-left: 2px solid #fff;
                    }
                    .part_2 {
                        flex: 1;
                        padding-left: 50px;
                        // line-height: 20px;
                        p {
                            width: 500px;
                            margin-bottom: 0px;
                            line-height: 30px;
                        }
                    }
                }
                .nav {
                    position: absolute;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 100px;
                    align-items: center;
                    bottom: 0;
                    width: 100%;
                    height: 200px;
                    .slot {
                        cursor: pointer;
                        position: relative;
                        // box-sizing: content-box;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        // border: 2px solid #485FB9;
                        background-color: #ECE7E4;
                        img {
                            position: absolute;
                            top: 5px;
                            left: 5px;
                            width: 50px;
                        }
                    }
                }
            }
            .page_2 {
                position: relative;
                height: 20%;
                padding-top: 80px;
                text-align: center;
                background-color: #9C58B6;
                h2 {
                    font-size: 32px;
                    color: #fff;
                }
                .content {
                    width: 1000px;
                    height: 500px;
                    margin: 0 auto;
                    .row {
                        display: flex;
                        flex-direction: row;
                        height: 250px;
                        li {
                            flex: 1;
                            padding-left: 50px;
                            padding-top: 50px;
                            .circle {
                                position: relative;
                                width: 150px;
                                height: 150px;
                                background-color: #fff;
                                border-radius: 50%;
                                // text-align: center;
                                img {
                                    position: absolute;
                                    top: 25px;
                                    left: 25px;
                                    width: 100px;
                                }
                                span {
                                    position: absolute;
                                    width: 150px;
                                    left: 0;
                                    font-size: 20px;
                                    color: #fff;
                                    text-align: center;
                                    bottom: -35px;
                                    
                                }
                            }
                        }
                    }
                }
            }
            .page_3 {
                position: relative;
                height: 20%;
                overflow: auto;
                padding-top: 80px;
                text-align: center;
                background-color: #26B1B6;
                h2 {
                    font-size: 32px;
                    color: #fff;
                }
                ul {
                    width: 1000px;
                    margin: 50px auto 0 auto;
                    text-align: left;
                    li {
                        color: #fff;
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    p {
                        color: #fff;
                        line-height: 20px;
                        font-size: 16px;
                    }
                    .weather {
                        margin-top: 30px;
                    }
                }
            }
            .page_4 {
                position: relative;
                height: 20%;
                padding-top: 80px;
                text-align: center;
                background-color: #FF8000;
                h2 {
                    font-size: 32px;
                    color: #fff;
                }
                p {
                    font-size: 24px;
                    color: #fff;
                    &:nth-of-type(1) {
                        margin-top: 250px;
                    }
                }
            }
        }
        .pageUp {
            cursor: pointer;
            width: 80px;
            position: absolute;
            bottom: 20px;
            right: 80px;
            bottom: 20px;
            z-index: 1000;
        }
        .pageDown {
            cursor: pointer;
            width: 80px;
            position: absolute;
            bottom: 20px;
            right: 20px;
            bottom: 20px;
            z-index: 1000;
        }
    }
</style>