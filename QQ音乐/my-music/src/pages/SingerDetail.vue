<template>
<transition name= "sd">
  <div class="singer-detail">
        <div class="hearder">
            <h1>
            <a href="javascipt:" class="back" @click="back"></a>{{singer.singer_name}}
            </h1>
        </div>
        <div class="list-wrapper">
            <div class="content">
                <div class="list">
                    <ul>
                    <router-link :to="'/play/'+song.musicData.songmid + '/' + song.musicData.albummid" v-for="(song,k) in singer.list" :key="song.musicData.songid" tag="div" @click.native="addSong(song)">
                        <li>
                            <h2>{{song.musicData.songname}}</h2>
                            <p v-text="singer.singer_name+'-'+song.musicData.albumname"></p>
                        </li>
                    </router-link>
                    </ul>
                </div>
            </div>
        </div>
           <div class="thumb" v-html="thumb">
            </div>
        <Loading title="歌曲加载中" :state="loadingState"></Loading>
  </div>  
  </transition>  
</template>

<script>
//载入loading
import Loading from '@/components/base/Loading/Loading';
// jsonp 连接
import jsonp from 'jsonp';

//api 连接
import api from '@/api/singerApi';

//better-scroll 插件
import BScroll from 'better-scroll';

//载入animate.css
import "@/assets/css/animate.css";

import {mapGetters,mapMutations} from 'vuex';

export default {
      name: '',
    
    data(){
       return{
            singer:{},
            scroll:{},
            thumb:'',
            loadingState:true
        }
    },
    computed:{
        ...mapGetters([
            'getCurSong',
            'getPlayList'
            ])
    },
    mounted(){
        this._getData()
    },
   methods:{
        _getData(){
            let url = api.singerDetailApi + this.$route.params.sid;
            jsonp(url,{param:'jsonpCallback'},(err,data)=>{
                this.singer = data.data;
                this.thumb = `<img src="https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.singer_mid}.jpg" style="width:100%">`;
                this.loadingState = false;
                this.$nextTick(()=>{
                     this.scroll = new BScroll('.list-wrapper',{
                        click:true
                    });
                })
            })
        },
        //回退
        back(){
            // window.history.back();
            this.$router.go(-1);

        },
        addSong(song){
            this.setCurSong(song);
            let listArr = this.getPlayList;
            let numFlag = 0;
            listArr.forEach((item,i)=>{
                if(item.musicData.songid == song.musicData.songid){
                    numFlag++
                };
            });
              if(numFlag<=0){
                    this.setCurSongIndex(this.getPlayList.length);
                    this.setPlayList(song);
                }
           
        },
        ...mapMutations({
            'setCurSong':'setCurSong',
            'setPlayList':'setPlayList',
            'setCurSongIndex':'setCurSongIndex'
        })
    },
    components:{
        Loading
    }

}

</script>

<style lang='scss' scoped>

.singer-detail{
    height: 100vh;
    overflow:hidden;
    .hearder{
        text-align: center;
        line-height: 55px;
        color: #fff;
        position: fixed;
        width: 100%;
        h1{
            font-size: 20px;
            font-weight: normal;
            a{
            display: inline-block;
            width: 25px;
            height: 25px;
            padding: 15px;
            background: url(../assets/icon/back.png) no-repeat;
            background-size: 25px 25px;
            background-position: 50%;
            position: absolute;
            left: 0;
            -webkit-tap-highlight-color:rgba(0,0,0,0);
            }
        }
    }

        .list-wrapper{
            width: 100vw;
            height: 340px;
            position: fixed;
            bottom: 0;
            z-index: 99;
            background-color: #060506;
            color: #fff;
            overflow: hidden;
            li{
                padding: 0 10px;
                padding-top: 10px;
               h2{
                    font-weight: 400;
                    font-size: 18px;
               }
               p{
                    font-size: 16px;
               }
            }
        }
    
}
.sd-enter-active{
    animation: fadeInRight 0.3s;
}
</style>