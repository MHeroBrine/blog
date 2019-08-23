<template>
    <div id="login">
        <div class="form mg">
            <div class="profile">
                <div class="profile_temp">
                    <img src="../assets/Sidebar/profile.png" class="profile_img">
                </div>
                <p>管理员登录</p>
            </div>
            <div class="container">
                <input type="text" class="text" placeholder="User ID" v-model="userName">
                <input type="password" class="text" placeholder="password" v-model="password">
                <div class="remember">
                    <input type="checkbox" v-model="keepState"><p>保持登录状态</p>
                </div>
                <button class="confirm" @click="login()">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: null,
                password: null,
                keepState: false
            }
        },
        methods: {
            // 验证后台登录
            login() {
                if (this.userName && this.password) {
                    this.$http.post(this.URL + '/user/login', {
                        account: this.userName,
                        password: this.password
                    }).then(Response => {
                        if (Response.data.token && this.keepState) {
                            localStorage.setItem('token', Response.data.token);
                            this.$router.push('/console');
                        } else if (Response.data.token && !this.keepState) {
                            sessionStorage.setItem('token', Response.data.token);
                            this.$router.push('/console');
                        } else {
                            alert('登录失败');
                        }
                    })
                }
            }
        },
        beforeCreate() {
            if (localStorage.token || sessionStorage.token) {
                this.$router.push('/console');
            }
        },
        mounted() {
            this.$store.commit('pageState', 'login')
        }
    }
</script>

<style lang="scss" scoped>
    #login {
        background: url('../assets/bgc.jpg') no-repeat;
        background-size: auto 100%;
        width: 100%;
        display: flex;
        height: 100%;
        align-items: center;
        .form {
            padding: 0 20px 0 20px;
            width: 330px;
            height: 440px;
            background-color: #fff;
            border-radius: 15px;
            .profile {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                width: 100%;
                height: 180px;
                .profile_temp {
                    position: relative;
                    margin-bottom: 15px;
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
                p {
                    font-size: 14px;
                    // font-weight: bold;
                }
            }
        }
        .container {
            width: 100%;
            height: 250px;
            .text {
                outline: none;
                width: 290px;
                height: 34px;
                box-sizing: border-box;
                border: 1px solid #eee;
                border-radius: 8px;
                margin-bottom: 20px;
                padding-left: 8px;
                font-size: 12px;
            }
            .remember {
                display: flex;
                height: 20px;
                line-height: 18px;
                p {
                    margin-left: 2px;
                    font-size: 12px;
                }
            }
            .confirm {
                cursor: pointer;
                position: relative;
                margin-top: 30px;
                width: 290px;
                height: 42px;
                border: 0;
                background-color: #00A8FF;
                color: #fff;
                border-radius: 10px;
                font-size: 16px;
                box-shadow: 0px 4px 0px 0px #0080FF;
            }
        }
    }
</style>