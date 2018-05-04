<template>
  <div class="mini-player" @click="showPlayState()">
    <!-- S 歌曲封面 -->
    <div class="thumb playing">
        <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+ getCurSong.musicData.albummid +'.jpg'">
    </div>
    <!-- E 歌曲封面 -->

    <div class="song-info">
        <h3 v-text="getCurSong.musicData.songname"></h3>
        <span v-text="getCurSong.musicData.singer[0].name"></span>
    </div>
 
    <div class="song-operator">
        <a href="javascript:" class="play-paused pause" @click.stop="playOrPause"></a>
        <a href="javascript:" class="song-list" @click.stop="showSongList()"></a>
    </div>
    

    <!-- 播放器 -->
    <div class="audio">
      <audio id="player" :src="getPlaySrc" autoplay="autoplay"></audio>
    </div>
     <!-- S歌曲列表 -->
    <SongList :showState="slState" @closesonglist="closeSongList()"></SongList>
    <!-- E歌曲列表 -->

  </div>
</template>

<script>
import SongList from '@/components/SongList';
import {mapGetters,mapMutations} from 'vuex';
import PlaySong from '@/pages/PlaySong';
export default {
      name: '',
      data(){
        return{
            //播放列表的状态
            slState:false
        }
      },
      computed:{
        ...mapGetters([
           'getPlaySrc',
           'getCurSong',
           'getPlayState'
        ])
    },
   methods:{
          playOrPause(){
            let opBtnNode = document.querySelector('.play-paused');
            let audioNode = document.querySelector('#player');
            let thumb = document.querySelector('.thumb');
            if(!this.getPlayState){//播放
                audioNode.play();
                opBtnNode.setAttribute('class','play-paused pause');
                thumb.style.animationPlayState = 'running'
            }else{//暂停
                audioNode.pause();
                opBtnNode.setAttribute('class','play-paused play');
                thumb.style.animationPlayState = 'pause'
            }
          this.setPlayState(!this.getPlayState);
        },
        showPlayState(){
            let song= this.getCurSong;
            this.$router.push({path:'/play/'+song.musicData.songmid+'/' + song.musicData.albummid})
        },
        showSongList(){
            this.slState = true;
        },
        closeSongList(){
            this.slState = false;
        },

        ...mapMutations({
             'setPlayState':'setPlayState'
        })
    },
    components:{
        SongList,
        PlaySong
    }
}

</script>

<style lang='scss' scoped>
.mini-player{
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background: #101010;
  display: flex;
  align-items: center;
  padding-left:18px;
  box-sizing: border-box;
  
  .thumb{
    &.playing{
      animation:playCicle 5s linear infinite;
    }
    img{
        width:45px;
        height:45px;
        border-radius: 50%;
    }
  }
  .song-info{
    flex:1;
    margin-left:16px;
    overflow: hidden;
    h3{
        color: #fff;
        font-size:16px;
        font-weight: 400;
      overflow: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    span{
        color: #ccc;
        font-size:12px;
    }
  }
  .song-operator{
    margin-right:10px;
    .play-paused,.song-list{
        width:30px;
        height:30px;    
        display: inline-block;
    }
    .play-paused{
      margin-right:16px;
    }
    .play{
         background:url(../assets/icon/play.png) no-repeat;
        background-size:100% 100%;
    }
    .pause{
        background:url(../assets/icon/pause.png) no-repeat;
     
      background-size:100% 100%;
    }
    .song-list{
          background:url(../assets/icon/list.png) no-repeat;
        background-size:100% 100%;
    }
  }
}

@keyframes playCicle{
  from{
    transform:rotateZ(0deg);
  }
  to{
    transform:rotateZ(360deg);
  }
}
</style>