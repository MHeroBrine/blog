<template>
    <div id="Index">
        <img src="@/assets/Sidebar/menu_2.svg" alt="" class="menu" @click="menuControl(true)"><h1>{{ titleNow }}</h1>
        <div class="container">
            <ul>
                <!-- <li class="title">所有的文章都在这里了</li> -->
                <li class="item" v-for="item in data">
                    <h3 @click="getBlogDetail(item._id)">{{ item.title }}</h3>
                    <span class="time">发表于：{{ new Date(item.date).getFullYear() + '/'+ (new Date(item.date).getMonth() + 1) + '/' + new Date(item.date).getDate() }}</span>
                    <p>
                        {{ item.introduce }}
                    </p>
                    <!-- <div class="comments">

                    </div> -->
                    <div class="icons">
                        <div class="up">
                            <img src="../assets/Sidebar/up_active.svg" @click="thumb(item)"><span>{{ item.thumb }}</span>
                        </div>
                        <div class="comment">
                            <img src="../assets/Sidebar/comment.svg" alt=""><span>{{ item.comment.length }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import VueEvent from '../model/VueEvent'

    export default {
        data() {
            return {
                titleNow: 'ALL',
                // 当前博客数据
                data: [],
            }
        },
        methods: {
            // 获取博客数据
            getBlog(label) {
                if (label == 'ALL') {
                    Axios.get(this.URL + '/blog')
                        .then(Response => {
                            if (Response.data.success === true) {
                                this.data = Response.data.data;
                            } else {
                                console.error('数据获取失败');
                            }
                        })
                } else {
                    Axios.get(this.URL + '/blog/withCategory?category=' + label)
                        .then(Response => {
                            if (Response.data.success === true) {
                                this.data = Response.data.data;
                            } else {
                                console.error('数据获取失败');
                            }
                        })
                }
            },
            // 获取博客详细数据
            getBlogDetail(_id) {
                this.$router.push('/detail/' + _id);
                VueEvent.$emit('sidebarInit');
            },

            // 点赞功能
            thumb(item) {
                let { _id } = item;
                let _this = this;

                // 检验是否已经点赞过
                caches.open('blog').then(function(cache) {
                    cache.match(_id).then(Response => {
                        if (Response) {
                            alert('你已经点赞过了');
                            return;
                        }
                        Axios.post(_this.URL + '/blog/thumb', {
                            _id: _id
                        }).then(Response => {
                            if (Response.data.success === true) {
                                item.thumb ++;
                                caches.open('blog').then(function(cache) {
                                    cache.add(_id).then(function() {
                                        
                                    })
                                })
                            } else {
                                alert(Response.data.message);
                            }
                        })
                    })
                })
            },
            // 控制侧边栏
            menuControl(state) {
                this.$store.commit('menuControl', state);
            }
        },
        watch: {
            'titleNow': function(val) {
                this.getBlog(val);
            }
        },
        mounted() {
            let that = this;

            this.getBlog('ALL');

            // 监听侧栏切换
            VueEvent.$on('pageChange', function(val) {
                that.titleNow = val;
            })

            // 页面设置
            this.$store.commit('pageState', 'index')
        }
    }
</script>

<style lang="scss" scoped>
    #Index {
        padding: 40px 50px 40px 50px;
        // display: flex;
        .menu {
            display: none;
        }
        h1 {
            color: #727B84; 
            font-size: 24px;
            padding-bottom: 30px;
            border-bottom: 1px solid #ddd;
        }
        .container {     
            display: flex;
            ul {
                min-width: 250px;
                flex: 0.75;
                .title {
                    background-color: #fff;
                    border-radius: 10px;
                    font-size: 15px;
                    padding-left: 20px;
                    height: 50px;
                    line-height: 50px;
                    color: rgb(179, 179, 179);
                    font-weight: bold;  
                    margin-top: 40px;
                }
                .item {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    background-color: #fff;
                    border-radius: 10px;
                    margin: 10px 0 0 0;
                    font-size: 15px;
                    padding: 25px 40px 0px 25px;
                    .comments {
                        height: 40px;
                        margin-top: 10px;
                        border-top: 1px solid #eee;
                    }
                    .icons {
                        position: relative;
                        width: 100%;
                        height: 60px;
                        img {
                            cursor: pointer;
                            width: 30px;
                        }
                        .up {
                            position: absolute;
                            bottom: 30px;
                            left: 0px;
                            img {
                                position: absolute;
                                left: 0px;
                                top: -10px;
                            }
                            span {
                                color: #93ADDB;
                                font-size: 14px;
                                font-weight: bold;
                                margin-left: 40px;
                            }
                        }
                        .comment {
                            position: absolute;
                            bottom: 30px;
                            left: 100px;
                            img {
                                position: absolute;
                                left: 0px;
                                top: -10px;
                            }
                            span {
                                color: #93ADDB;
                                font-size: 14px;
                                font-weight: bold;
                                margin-left: 40px;
                            }
                        }
                    }
                    h3 {
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 18px;
                        color: rgba(88, 88, 88, 0.753);
                        &:hover {
                            color: #666;
                        }
                    }
                    .time {
                        font-size: 12px;
                        color: rgb(137, 163, 189);
                        margin-top: 5px;
                    }
                    p {
                        color: #848B93;
                        font-size: 14px;
                        padding-right: 0px;
                        margin-top: 10px;
                        line-height: 27px;
                        margin-bottom: 10px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                        
                    }
                    ul {
                        display: flex;
                        margin: 10px 0 10px 0;
                        li {
                            margin-left: 10px;
                            &:nth-of-type(1) {
                                margin: 0;
                            }
                            button {
                                cursor: pointer;
                                border-radius: 5px;
                                width: 80px;
                                height: 25px;
                                background-color: #fff;
                                outline: none;
                                border: 1px solid rgb(182, 177, 177); 
                                transition: all 0.2s;
                                font-size: 12px;
                                &:hover {
                                    color: #fff;
                                    background-color: #727B84;
                                }
                            }
                        }
                    }
                    .down {
                        position: absolute;
                        right: 20px;
                        bottom: 10px;
                        width: 30px;
                        color: #666;
                        text-decoration: none;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1024px) {
        #Index {
            padding: 15px 15px 0px 15px;
            h1 {
                padding-left: 30px;
                padding-bottom: 10px;
            }
            .menu {
                position: absolute;
                width: 20px;
                top: 24px;
                display: block;
            }
            .container {
                ul {
                    flex: 1;
                    // height: 50px;
                    .item {
                        padding: 15px;
                        .icons {
                            height: 30px;
                            .up {
                                bottom: 0;
                            }
                            .comment {
                                bottom: 0;
                            }
                        }
                    }
                }
            }       
        }
    }
</style>
