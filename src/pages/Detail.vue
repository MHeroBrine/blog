<template>
    <div id="detail">
        <div class="markdown-body main" v-html="data">
            
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    let marked = require('marked');

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
            if (lang && hljs.getLanguage(lang)) {    
                return hljs.highlight(lang, code, true).value;
            } else {
                return hljs.highlightAuto(code).value;
            }
        }
    });

    export default {
        data() {
            return {
                data: null
            }
        },
        created() {
            this.getBlogDetail(this.$route.params.id);
        },
        mounted() {
            this.$store.commit('pageState', 'detail');
        },
        methods: {
            getBlogDetail(_id) {
                Axios.get(this.URL + '/blog/withId?_id=' + _id)
                    .then(Response => {
                        if (Response.data.success) {
                            this.data = marked(Response.data.data);
                        } else {
                            alert('数据获取失败，即将跳转至主页');
                            this.$router.push('/index');
                        }
                    })
            },
        }
    }
</script>

<style lang="scss" scoped>
    #detail {
        padding: 20px 30px 20px 30px;
        .main {
            box-shadow: 0px 0px 10px 0px #eee;
            border-radius: 10px;
            background-color: #fff;
            padding: 20px 40px 20px 40px;
        }
    }

    @media screen and (max-width: 1024px) {
        #detail {
            padding: 0px;
            .main {
                box-shadow: 0px 0px 10px 0px #eee;
                border-radius: 0px;
                background-color: #fff;
                padding: 20px;
            }
        }
    }
</style>
