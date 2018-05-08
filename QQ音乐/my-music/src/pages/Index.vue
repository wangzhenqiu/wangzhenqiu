<template>
   <div class="index">
   <!-- 头部 -->
    <HeaderTab></HeaderTab>
    <div class="index-wrapper">
        <div class="content">
        <!-- S轮播图 -->
            <div class="sliders">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(s,i) in slider" :key="i">
                      <img :src="s.picUrl">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
            </div> 
        <!-- E轮播图 -->

        <!-- S歌曲排行榜 -->
            <div class="top-list">
                    <h2>歌曲排行榜</h2>
                <div class="song-list">
                    <ul>
                    <router-link :to="'/play/'+song.data.songmid+'/'+song.data.albummid"  @click.native="addSong(song)" v-for="(song,k) in topList" :key="song.data.songid">
                        <li>
                        
                            <div class="thumb">
                                <img v-lazy="'https://y.gtimg.cn/music/photo_new/T002R90x90M000'+ song.data.albummid +'.jpg?max_age=2592000'">
                            </div>
                            <div class="text">
                                <h3 v-text="song.data.songname"></h3>
                                <span v-text="song.data.singer[0].name"></span>
                            </div>

                            <div class="time">{{song.data.interval | getTime}}
                            </div>
                        </li>
                        </router-link>
                    </ul>
                </div>
            </div>
        <!-- E歌曲排行榜 -->
        </div>
    </div>
     <Loading title="歌曲加载中" :state="loadingState"></Loading>
  </div>
</template>

<script>
//头部  loading组件 
import HeaderTab from '@/components/HeaderTab';
import Loading from '@/components/base/Loading/Loading';

// jsonp 连接
import jsonp from 'jsonp';

//api 连接
import api from '@/api/indexApi';

//引入swiper插件
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

//better-scroll 插件
import BScroll from 'better-scroll';

import {mapGetters,mapMutations} from 'vuex';
export default{
    name:'',
        data(){
            return{
                slider:[],
                topList:[],
                scroll:null,
                loadingState:true
             }
            },
            computed:{
              ...mapGetters([
                'getPlayList'
              ])  
            },
    mounted:function(){
        this._getSlider(),
        this._getTopList()
        //实例化 better-scroll
         this.$nextTick(function(){
                this.scroll = new BScroll('.index-wrapper',{
                click:true,
                pullUpLoad:{
                    threshold:50
                }
                });
                this.scroll.on('pullingUp',()=>{
                    this._getTopList();
                    this.loadingState = true;
                    this.scroll.finishPullUp();
                    this.scroll.refresh();
                });
                
            });
    },
    methods:{
        _getSlider(){
         jsonp(api.bannerApi,{param:'jsonpCallback'},(err,data)=>{
            this.slider = data.data.slider;
            this.$nextTick(function(){
                let mySlider = new Swiper('.swiper-container',{
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    bulletClass:'bullet',
                    bulletActiveClass:'bullet-active'
                  }
                });
            });
        });
    },
        _getTopList(){
            let songBegin = this.topList.length;
            let url = api.topListApi + songBegin;
            jsonp(url,{param:'jsonpCallback'},(err,data)=>{
                this.topList = this.topList.concat(data.songlist);
                this.loadingState = false;
            });
        },
        addSong(song){
              song = {musicData:song};
              this.setCurSong(song);

            
              //防止添加
              let listArr = this.getPlayList;
              let numFlag = 0;
              listArr.forEach((item,i)=>{
                if(song.musicData.songid == item.musicData.songid){
                  numFlag++;
                }
              });


              if(numFlag <= 0){
                this.setCurSongIndex(listArr.length);
                this.setPlayList(song);

              }
              
            },
            ...mapMutations({
              'setCurSong':'setCurSong',
              'setPlayList':'setPlayList',
              'setCurSongIndex':'setCurSongIndex'
            })
        
    },
    filters:{
        getTime:function(t){
            let m = parseInt(t/60);
            let s = t % 60;
            if(s<10){
               s = '0'+s
            }
            return m + '分' + s
        }
    },
    components:{
        HeaderTab,
        Loading
    }
}
</script>

<style lang="scss">
@import '../assets/scss/_themes.scss';
    .index{
        .index-wrapper{
            height:calc(100vh - 100px);
            overflow: hidden;
            .content{
          .sliders{
            margin-top: 10px;
            .swiper-container{
              width:100%;

              .swiper-pagination{

                .bullet{
                  display:inline-block;
                  width:10px;
                  height:10px;
                  border-radius: 100%;
                  background:#fff;
                  margin:0 5px;
                }
                .bullet-active{
                    background:blue;
                }
              }
            }
            img{
              width:100%;
            }

          }
    .top-list{
         h2{
             font-size:15px;
             color:$red;
             text-align: center;
             line-height:64px;
        }
        .song-list{
            padding:0 10px;
            li{
                display:flex;
                color:#fff;
                margin-bottom: 20px;
                .thumb{
                    img{
                        width:60px;
                        height:60px;
                    }
                }
                .text{
                    padding-top:15px;
                    margin-left:20px;
                    flex-grow: 1;
                    h3{
                        font-size:15px;
                        margin-bottom: 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width:100px;
                    }
                    span{
                        font-size:12px;
                    }
                }
                .time{
                    padding-top:15px;
                    width:60px;
                    color:$gray;
                }
            }
        }
    }
    }
    }
}
    
</style>