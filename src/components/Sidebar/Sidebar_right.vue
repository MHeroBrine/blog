<template>
    <div id="sidebar_right">
        <div class="search_area">
            <input type="text" class="search" placeholder="搜索">
            <img src="../../assets/Sidebar/search.svg" class="search_img">
        </div>
        <div class="area_1">

        </div>
        <div class="area_2">

        </div>
        <!-- <div class="login">
            <h3>后台入口</h3>
            <input type="text" placeholder="账号" v-model="userName">
            <input type="password" placeholder="密码" v-model="password">
        </div> -->
    </div>
</template>

<script>
    import VueEvent from '../../model/VueEvent.js'
    import Axios from 'axios'

    export default {
        data() {
            return {
                timeout: null,
                userName: null,
                password: null
            }
        },
        methods: {
            // 验证后台登录
            Login() {
                if (this.userName && this.password) {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        this.$http.post(this.URL + '/user/login', {
                            account: this.userName,
                            password: this.password
                        }).then(Response => {
                            if (Response.data.token) {
                                localStorage.setItem('token', Response.data.token);
                                VueEvent.$emit('isAdmin');
                            }
                        })
                    }, 500);
                }
            }
        },
        watch: {
            userName: function() {
                this.Login();
            },
            password: function() {
                this.Login();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #sidebar_right {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-shadow: 0px 0px 10px 0px rgb(192, 202, 212);
        .search_area {
            position: relative;
            width: 100%;
            height: 120px;
            border-bottom: 1px solid #eee;
            .search {
                position: absolute;
                color: #666;
                font-size: 14px;
                font-weight: bold;
                left: 35px;
                top: 40px;
                border: 0;
                outline: none;
                width: 250px;
                height: 30px;
                padding-left: 40px;
            }
            .search_img {
                position: absolute;
                top: 43px;
                left: 35px;
                width: 25px;
            }   
        }
        .area_1 {
            width: 100%;
            height: 300px;
            border-bottom: 1px solid #eee;
        }
        .area_2 {
            width: 100%;
            height: 300px;
            border-bottom: 1px solid #eee;
        }
        .login {
            position: relative;
            width: 100%;
            height: 250px;
            // border-bottom: 1px solid #eee;
            padding: 20px;
            h3 {
                font-size: 18px;
                font-weight: bold;
                color: #666;
            }
            input {
                position: absolute;
                top: 70px;
                left: 45px;
                width: 250px;
                height: 50px;
                padding-left: 10px;
                border: 0;
                border-radius: 10px;
                background-color: rgb(215, 223, 235);
                font-size: 14px;
                font-weight: bold;
                outline: none;
                color: #666;
                &::-webkit-input-placeholder { /* WebKit browsers */ 
                    color: #ccc; 
                } 
                &:nth-of-type(2) {
                    top: 140px;
                }
            }
        }
    }
</style>
