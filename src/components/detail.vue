<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                <ProductZoomer
                                :base-images="images"
                                :base-zoomer-options="containerRoundOptions"
                                />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                 <el-input-number v-model="num" @change="numChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addcar" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="selecteDisplay=0" href="javascript:;" :class="{selected:selecteDisplay==0}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="selecteDisplay=1" href="javascript:;" :class="{selected:selecteDisplay==1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="selecteDisplay==0" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="selecteDisplay==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model.trim="message"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="addmessage">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);" >暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | capitalize('/','/',' ','hh:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div> -->
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="pageIndex"
                                        :page-sizes="[10, 20, 50, 100]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <span>{{item.add_time | capitalize('年','月','日','')}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <!-- <BackTop :height="100" :bottom="50">
        <div class="top">🚀</div>
    </BackTop> -->
    </div>
</template>

<script>
export default {
  name: "detail",
  data: function() {
    return {
      goodId: "",
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      //商品的购买数量
      num: 0,
      //判断tab栏选择
      selecteDisplay: 0,
      //评论数据
      commentlist: [],
      //添加评论
      message: "",
      //当前页数
      pageIndex: 1,
      //每页显示条数
      pageSize: 10,
      //评论总数
      totalcount: 0,

      //放大镜插件数据
      images: {
        normal_size: [
          {
            id: 1,
            url:
              "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1539346884&di=c5537715546d901a4b51edbb7f55e103&src=http://f.hiphotos.baidu.com/zhidao/pic/item/eac4b74543a982267a3d54978a82b9014b90eb86.jpg"
          },
          {
            id: 2,
            url:
              "http://img2.imgtn.bdimg.com/it/u=1380014937,3416502069&fm=26&gp=0.jpg"
          }
        ]
      },
      containerRoundOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  methods: {
    //添加商品数量
    numChange(value) {
      console.log(value);
      this.num = value;
    },
    getGoodInfo() {
      this.images.normal_size = [];
      this.$axios
        .get("/site/goods/getgoodsinfo/" + this.goodId)
        .then(response => {
          // console.log(response);
          // 商品信息
          this.goodsinfo = response.data.message.goodsinfo;
          // 热卖列表
          this.hotgoodslist = response.data.message.hotgoodslist;
          // 图片列表
          this.imglist = response.data.message.imglist;
          const zoomImge = [];
          this.imglist.forEach(e => {
            console.log(e);
            zoomImge.push({
              id: e.id,
              url: e.thumb_path
            });
          });
          console.log(zoomImge);
          this.images.normal_size = zoomImge;
        });
    },
    //获取评论信息
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          //   console.log(response);
          this.commentlist = response.data.message;
          this.totalcount = response.data.totalcount;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getComments();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getComments();
    },
    //添加评论
    addmessage() {
      if (this.message == "") {
        this.$message({
          message: "请留下您的评论,谢谢!",
          type: "warning"
        });
        return;
      }
      this.$axios
        .post("site/validate/comment/post/goods/" + this.goodId, {
          commenttxt: this.message
        })
        .then(response => {
          // console.log(response);
          this.$message({
            message: "恭喜你,评论成功!",
            type: "success"
          });
          this.message = "";
          this.pageIndex = 1;
          this.getComments();
        });
    },
    //商品数量添加到购物车
    addcar(){
        this.$store.commit('addshop',{
            id:this.goodId,
            count:this.num
        })
    }
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
      this.goodId = to.params.goodID;
      //获取对应商品的详细信息
      this.getGoodInfo();
      this.pageIndex = 1;
      //获取对应商品的评论
      this.getComments();
      //   this.pageIndex=1;
    }
  },
  created() {
    this.goodId = this.$route.params.goodID;
    //   console.log(this.$route.params.goodID)
    this.getGoodInfo();

    //获取评论
    this.getComments();
  }
};
</script>

<style>
img {
  display: block;
}

.pic-box {
  padding-right: 10px;
  width: 410px;
}
.control-box .responsive-image {
  width: 50px;
  height: 50px;
}
.preview-box .responsive-image {
  height: 200px;
}

/* .top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  font-size: 24px;
  transform: rotate(-45deg);
  text-align: center;
  border-radius: 50%;
} */
</style>

