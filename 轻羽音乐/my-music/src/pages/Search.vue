<template>
  <div class="">
    <HeaderTab></HeaderTab>

    <div class="search-wrap">
      <div class="search-form">
        <input placeholder="搜索歌曲、歌手" v-model="keywords" @>
        <i class="delete" @click="delKeywords()"></i>
      </div>

      <div class="hotkey" v-if="!showState">
        <h2>热门搜索</h2>
        <div class="hotkey-list">
          <span  v-for="(key,i) in hotkey" :kye="key.n" @click="searchHotKey(key.k)">{{key.k}}</span>
        </div>
      </div>
  
      <div class="song-wrapper">
        <div class="content">
          <div class="song-list" v-if="showState" >
            <ul>
              <!-- S 歌手直达 -->
                <router-link :to="'/singer/'+songList.zhida.singermid">
                    <li class="singer">{{songList.zhida.singername}}</li>
                </router-link>
              <!-- E 歌手直达 -->
                <router-link :to="'/play/'+s.songmid+'/'+s.albummid" v-for="(s,k) in songList.song.list" :key="s.songid" @click.native="addSong(s)">
                <li>{{s.songname}}-{{s.singer[0].name}}</li>
                </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTab from '@/components/HeaderTab';

import api from '@/api/searchApi';

import jsonp from 'jsonp';

import {mapGetters,mapMutations} from 'vuex';

import BScroll from 'better-scroll';
export default {
      name: '',
    
    data(){
       return{
    	keywords:'',
        hotkey:[],
        songList:[]
        }
    },
    computed:{
    	showState:function(){
    		return this.keywords == ''? false : true;
    	},
        ...mapGetters([
            'getPlayList'
            ])
    },
    created(){
    	let url  = api.hotkeyApi;
    	jsonp(url,{param:'jsonpCallback'},(err,data)=>{
    		this.hotkey = data.data.hotkey.slice(0,10);
    	})
    },
    mounted(){
            this.$nextTick(()=>{
              this.scroll = new BScroll('.song-wrapper',{
                    click:true
              });
            })
    },
    watch:{
        keywords:function(newVal,OldVal){
              this._search();
        }
    },
   methods:{
   		searchHotKey(keywords){
   			this.keywords = keywords;
   		},
   		delKeywords(){
   			this.keywords = '';
   		},
         _search(){
              let url = api.searchApi + this.keywords;
              jsonp(url,{param:'jsonpCallback'},(err,data)=>{
                this.songList = data.data;
                console.log(this.songList);
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
                'setPlayList':'setPlayList',
                'setCurSongIndex':'setCurSongIndex',
                'setCurSong':'setCurSong'
            })
      
    },
    components:{
    HeaderTab
    }
}

</script>

<style lang='scss' scoped>
ul{
  list-style: none;
}
a{
  color: #676767;
}
.search-wrap{
  padding: 0 15px;
  margin: 0 auto;

  .search-form{
    padding: 8px 0;
    text-indent: 15px;
    background-color: #121212;
    margin: 0 5px;
    margin-top: 25px;
    border-radius: 8px;
    position: relative;
    margin-bottom: 20px;
    &::before{
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/search.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
    input{
      width: 220px;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      background-color: transparent;
      border: 0;
      outline: 0;
      color: #676767;
    }
    .delete{
          display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/delete.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      position: absolute;
      right: 10px;
    }
  }

  .hotkey{
    margin-top: 30px;
    h2{
      color: #676767;
      font-size: 15px;
      text-indent: 5px;
    }
    .hotkey-list{
      color: #676767;
      display: flex;
      flex-wrap: wrap;
      span{
        padding: 4px 6px;
        background-color: #121212;
        margin: 5px;
        border-radius: 8px;
        font-size: 14px;
      }
    }
  }
}


.song-wrapper{
  height:calc(100vh - 173px);
  overflow: hidden;
}
li{
  padding: 6px 5px;
  color: #676767;
  &::before{
    content: "";
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url(../assets/icon/music.png) no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
  }

  &.singer{
    &::before{
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/singer.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>