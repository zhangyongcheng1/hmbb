<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">

            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.title">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="it in item.subcates" :key="it.id">
                                                {{it.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="it in item.subcates" :key="it.id">{{it.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel height="341px">
                                    <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                        <a href="#">
                                            <img :src="item.img_url" alt="" style="height:100%">
                                        </a>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | capitalize('年','月','日','')}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in orderlist" :key="item.catelist">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="it in item.level2catelist" :key="it.subcateid">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itlist in item.datas" :key="itlist.artID">
                            <router-link :to="'/detail/'+itlist.artID">
                                <!-- <a href="#/site/goodsinfo/87" class=""> -->
                                <div class="img-box">
                                    <img :src="itlist.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itlist.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itlist.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itlist.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itlist.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            <!-- </a> -->
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import moment from "moment";
// import axios from "axios";
export default {
  name: "index",
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      orderlist: [],
    };
  },
  //过滤器,迁移到全局
//   filters: {
//     capitalize(value) {
//       // console.log(value)
//       return moment(value).format("YYYY年MM月DD日");
//     }
//   },
  created() {
    this.$axios.get("/site/goods/gettopdata/goods").then(response => {
      // console.log(response);
      this.catelist = response.data.message.catelist;
      this.sliderlist = response.data.message.sliderlist;
      this.toplist = response.data.message.toplist;
    }),
      this.$axios.get("/site/goods/getgoodsgroup").then(response => {
        this.orderlist = response.data.message;
      });

  }
};
</script>
<style>
/* @import url("../assets/statics/site/css/style.css"); */
</style>


