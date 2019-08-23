<template>
    <div id="console">
        <a-layout id="components-layout-demo-custom-trigger" style="min-height: 100%;">
            <a-layout-sider
            :trigger="null"
            collapsible
            v-model="collapsed"
            >
            <div class="logo" />
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
                <a-menu-item key="1" @click="changePage('index')">
                    <a-icon type="home" />
                    <span>主页</span>
                </a-menu-item>
                <a-menu-item key="2" @click="changePage('add')">
                    <a-icon type="plus" />
                    <span>添加博客</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="lock" />
                    <span>权限管理</span>
                </a-menu-item>
                <a-menu-item key="4">
                    <a-icon type="line-chart" />
                    <span>访问统计</span>
                </a-menu-item>
            </a-menu>
            </a-layout-sider>
            <a-layout>

            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="()=> collapsed = !collapsed"
                />
            </a-layout-header>

            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px', position: 'relative' }">
                
                <div v-show="page.index">
                    <a-card v-for="item in data" :title="item.title" style="margin-bottom: 25px;">
                        <a href="#" slot="extra">修改</a><a href="#" slot="extra" style="margin-left: 20px;" @click="deleteBlog(item._id)">删除</a>
                        {{ item.introduce }}
                    </a-card>
                </div>

                <div v-show="page.add" style="height: 100%">
                    <div style="margin-bottom: -170px;">
                        <div style="display: flex;">
                            <a-input placeholder="请输入标题" style="flex: 0.9" v-model="newTitle"/>
                            <div style="flex: 0.05"></div>
                            <div style="display: flex; flex: 0.1; flex-direction: row-reverse;">
                                <a-select style="width: 120px" v-model="addCategory">
                                    <div slot="dropdownRender" slot-scope="menu">
                                        <v-nodes :vnodes="menu"/>
                                        <a-divider style="margin: 4px 0;" />
                                        <div style="padding: 8px; cursor: pointer;" @mousedown="addNewCategory()">
                                            <a-icon type="plus" /> Add item
                                        </div>
                                        <a-modal
                                            title="Basic Modal"
                                            v-model="float.visible"
                                            @ok="handleOk"
                                        >
                                        <a-input placeholder="新标签" v-model="newCategory"></a-input>
                                        </a-modal>
                                    </div>

                                    <a-select-option v-for="item in categories" :value="item.title">
                                        {{ item.title }}
                                    </a-select-option>
                                    <!-- <a-select-option value="jack">Jack</a-select-option>
                                    <a-select-option value="lucy">Lucy</a-select-option> -->
                                </a-select>
                            </div>
                        </div>
                        <a-textarea placeholder="请输入文章描述 / 简介" style="margin-top: 25px; height: 90px; resize: none;" v-model="newIntroduce"/>
                    </div>
                    <div class="editor">
                        <div style="height: 100%;">
                            <div style="width: 100%;" class="markdown-body" v-html="main_markdown">

                            </div>
                        </div>
                        <div style="flex: 0.01"></div>
                        <div class="divide"></div>
                        <div style="position: relative;">
                            <a-textarea style="height: 100%; resize: none; min-height: 500px;" v-model="main" placeholder="请输入文章内容"/>
                            <a-upload
                                name="imgUploader"
                                :showUploadList="false"
                                action="https://mherobrine.com:4000/blog/upload"
                                :beforeUpload="beforeUpload"
                                @change="handleChange"
                                class="upload_label"
                            >
                                <!-- <div>
                                    <a-icon :type="loading ? 'loading' : 'plus'" />
                                    <div class="ant-upload-text">Upload</div>
                                </div> -->
                            <a-button>
                                <a-icon type="upload" />上传
                            </a-button>
                            </a-upload>
                            <a-icon type="check" class="check" @click="pushBlog()"></a-icon>
                            <!-- <a-modal
                                title="是否提交"
                                v-model="float.visible"
                                @ok="handleOk"
                            >
                            <a-input placeholder="新标签" v-model="newCategory"></a-input>
                            </a-modal> -->
                        </div>
                    </div>
                </div>  

            </a-layout-content>

            </a-layout>
        </a-layout>
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

    function getBase64 (img, callback) {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }

    export default {
        data() {
            return {
                data: [],
                // 文章内容
                main: null,
                // 转译markdown的内容
                main_markdown: null,
                collapsed: false,

                loading: false,
                imageUrl: '',

                // 需要添加的新标签
                newCategory: null,
                // 文章的标签
                addCategory: null,
                // 标题
                newTitle: null,
                // 简介
                newIntroduce: null,

                // 标签
                categories: [],

                // 页面
                page: {
                    index: true,
                    add: false
                },
                // 浮窗
                float: {
                    visible: false
                }
            }
        },
        mounted() {
            this.listenUnload();
        },
        methods: {
            // 页面转换
            changePage(address) {
                for (let item in this.page) {
                    this.page[item] = false;
                }
                this.page[address] = true;
            },

            // 获取所有博客数据
            getBlog() {
                Axios.get(this.URL + '/blog')
                    .then(Response => {
                        if (Response.data.success === true) {
                            this.data = Response.data.data;
                        } else {
                            console.error('数据获取失败');
                        }
                    })
            },
            // 获取所有标签
            getCategory() {
                Axios.get(this.URL + '/category').then(Response => {
                    if (Response.data.success === true) {
                        this.categories = Response.data.data;
                    } else {
                        alert('标签获取失败');
                    }
                })
            },
            // 添加博客
            pushBlog() {
                if (this.newTitle && this.main && this.addCategory && this.newIntroduce) {
                    Axios.post(this.URL + '/blog', {
                        title: this.newTitle,
                        body: this.main,
                        category: this.addCategory,
                        introduce: this.newIntroduce
                    }).then(Response => {
                        if (Response.data.success === true) {
                            this.$message.success('提交成功');
                            this.newTitle = null;
                            this.main = null;
                            this.addCategory = null;
                            this.newIntroduce = null;
                            this.changePage('index');
                            this.getBlog();
                        } else {
                            this.$message.error('提交失败');
                        }
                    })
                } else {
                    this.$message.error("请检查输入完整性");
                }
            },
            // 删除博客
            deleteBlog(id) {
                let i = confirm('是否删除该博客');
                if (i) {
                    Axios.delete(this.URL + '/blog?id=' + id).then(Response => {
                        if (Response.data.success === true) {
                            this.$message.success('删除成功');
                            this.getBlog();
                        } else {
                            this.$message.error('删除失败');
                        }
                    })
                }
            },
            // 全局消息弹窗
            notification() {
                this.$notification.open({
                    message: '上传图片',
                    description: '<p>1</p>',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            },

            handleChange (info) {
                if (info.file.status === 'uploading') {
                    this.loading = true
                    return
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    getBase64(info.file.originFileObj, (imageUrl) => {
                        this.$notification.open({
                            message: '图片地址',
                            description: this.URL + '/blog/img?path=' + info.file.response.data,
                            duration: 0
                        });
                        this.loading = false
                    })
                }
                },
                beforeUpload (file) {
                const isJPG = file.type === 'image/jpeg'
                if (!isJPG) {
                    this.$message.error('You can only upload JPG file!')
                }
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!')
                }
                return isJPG && isLt2M
            },

            // 添加新标签
            addNewCategory() {
                this.float.visible = true;
            },
            handleOk(e) {
                this.float.visible = false;
                Axios.post(this.URL + '/category', {
                    title: this.newCategory
                }).then(Response => {
                    if (Response.data.success === true) {
                        this.getCategory();
                        this.$message.success('添加成功');
                    } else {
                        this.$message.error('添加失败');
                    }
                })
            },

            // 监听页面刷新或关闭
            listenUnload() {
                window.addEventListener('beforeunload', function() {
                    // let i = confirm('是否需要保存草稿');
                    console.log('fresh');
                    if (this.newTitle || this.main || this.addCategory) {
                        let i = confirm('是否需要保存草稿');
                    }
                    return true;
                })
            },
            // 保存草稿
            // saveDraft() {
            //     caches.open('draft').then(cache => {
            //         cache.add()
            //     })
            // }
        },
        created() {
            this.getBlog();
            this.getCategory();
        },
        mounted() {
            this.$store.commit('pageState', 'console')

            let timer = null;
            let that = this;

            this.$watch('main', function(newVal) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                timer = setTimeout(() => {
                    that.main_markdown = marked(newVal);
                }, 1000);
            })
        },
        components: {
            VNodes: {
                functional: true,
                render: (h, ctx) => ctx.props.vnodes
            }
        }
    }
</script>

<style lang="scss" scoped>
    #console {
        height: 100%;
        #components-layout-demo-custom-trigger .trigger {
            font-size: 18px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            transition: color .3s;
        }

            #components-layout-demo-custom-trigger .trigger:hover {
            color: #1890ff;
        }

            #components-layout-demo-custom-trigger .logo {
            height: 32px;
            background: rgba(255,255,255,.2);
            margin: 16px;
        }

        .editor {
            display: flex;
            margin-top: 25px;
            flex-direction: row;
            padding-top: 170px;
            // top: 180px;
            // bottom: 25px;
            // border: 1px solid #000;
            width: 100%;
            height: 100%;
            div {
                flex: 0.49;
            }
            .divide {
                flex: 0.02;
                border-left: 1px solid #eee;
            }
            
            i {
                cursor: pointer;
                font-size: 22px;
            }
            .upload {
                position: absolute;
                right: 70px;
                bottom: 30px;
            }
            .check {
                position: absolute;
                right: 20px;
                bottom: 20px;
            }
            .upload_label {
                position: absolute; 
                bottom: 20px; 
                left: 20px; 
                opacity: 0.4;
                &:hover {
                    opacity: 1;
                }
            }
            p {
                word-break:break-word;
            }
        }
    }
</style>
