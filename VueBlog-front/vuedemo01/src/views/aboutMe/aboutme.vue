<template>
    <div>
        <NavBar />
        <el-container class="aboutMelayout">
            <!-- https://cdn.stocksnap.io/img-thumbs/280h/DBIJH36YJ5.jpg -->
            <!-- main主要内容 -->
            <el-container class="aboutMeBody" style="margin-top: 20px; z-index: 1;">
                <el-card class="box-card" align="center" style="line-height: 1.5;width: 100%;">

                    <div class="poem-wrap">
                        <div class="poem-border poem-left"></div>
                        <div class="poem-border poem-right"></div>
                        <h1>青春如梦</h1>
                        <div id="poem_sentence1">守得云开见月明,静待花开终有时。</div>
                        <div id="poem_info1"> [生活] </div>
                    </div>

                    <div class="author-avat">
                        <el-avatar :size="100" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                            :fit="fit" style="margin-top: 5px;">
                        </el-avatar>
                    </div>
                    <a class="">Tao</a>
                    <div><span>个人简介：我就是我，不一样的烟火！</span></div>
                    <el-divider></el-divider>
                    <div>
                        <el-link :underline="true" href="https://www.baidu.com" target="_blank">百度一下，你就知道</el-link>
                    </div>
                    <div style="margin-top: 8px;padding: 3px;">
                        <el-link :underline="false" href="https://element.eleme.cn/#/zh-CN/component/link"
                            target="_blank"><el-tag>element-ui</el-tag></el-link>
                        <el-link :underline="false" href="https://cn.vuejs.org/guide/introduction.html" target="_blank"
                            style="margin-left: 8px;margin-right: 8px;"><el-tag type="success">vue.js</el-tag></el-link>
                        <el-link :underline="false" href="https://cn.vuejs.org/guide/introduction.html"
                            target="_blank"><el-tag type="danger">echart</el-tag></el-link>
                    </div>
                    <div>
                    </div>
                </el-card>
            </el-container>
            <!-- footer -->
            <el-footer class="footer">
                <div style="" align="center">
                    <p class="text-center text-muted">Copyright © 2023 hjt All right reserved</p>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import NavBar from '../../components/navbar/navbar.vue'
// 
import '@/styles/autoload/autoload.js'

export default {
    name: 'aboutme',
    components: {
        NavBar
    },
    data() {
        return {
            comshow: true,
            fit: "cover",
        }
    }
}
</script>

<!--由于style样式混乱, 于是在跳转前的style里加上scoped，将该css效果改为只在该文件范围内生效 -->
<style lang="scss" scoped>
.aboutMeBody {
    margin-left: 100px;
    margin-right: 100px;
}

@media screen and (max-width: 960px) {
    .aboutMeBody {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
    }
}

.poem-wrap {
    position: relative;
    width: 80%;
    max-width: 80%;
    border: 2px solid #797979;
    border-top: 0;
    text-align: center;
    margin: 40px auto
}

.poem-left {
    left: 0
}

.poem-right {
    right: 0
}

.poem-border {
    position: absolute;
    height: 2px;
    width: 27%;
    background-color: #797979
}

/* .poem-wrap p {
    width: 70%;
    margin: auto;
    line-height: 30px;
    color: #797979
} */

.poem-wrap h1 {
    position: relative;
    margin-top: -20px;
    display: inline-block;
    letter-spacing: 4px;
    color: #797979;
    font-size: 2em;
    margin-bottom: 20px
}

#poem_sentence {
    font-size: 25px
}

#poem_info {
    font-size: 15px;
    margin: 15px auto
}

#poem_sentence1 {
    font-size: 25px
}

#poem_info1 {
    font-size: 15px;
    margin: 15px auto
}
</style>