<template>
<transition name="playsong">
  <div class="play-song">
    <div class="header">
            <h1><i @click="back"></i>{{getCurSong.musicData.singer[0].name}}</h1>
            <span>{{getCurSong.musicData.songname}}</span>
          </div>
           
          <div class="box"></div>
          <div class="thumb playing">
            <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+getCurSong.musicData.albummid +'.jpg'">
          </div>

          <div class="opt-btn">
            <a href="javascript:void(0);" class="mode"></a>
            <a href="javascript:void(0);" class="prev" @click="playPrev()"></a>
            <a href="javascript:void(0);" class="playPause pause" @click="playOrPause"></a>
            <a href="javascript:void(0);" class="next" @click="playNext()"></a>
            <a href="javascript:void(0);" class="like"></a>
          </div>
        
          <div class="bg-album">
            <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+getCurSong.musicData.albummid +'.jpg'">
          </div>
   
  </div>
</transition>
</template>

<script>
// jsonp 连接
import jsonp from 'jsonp';

//api 连接
import api from '@/api/songApi';

import {mapGetters,mapMutations} from 'vuex';

export default {
      name: '',
    
    data(){
       return{
        smid:'',
        mid:'',
        src:''
        }
    },
    computed:{
        ...mapGetters([
            'getCurSong',
            'getPlayState',
            'getPlayList',
            'getCurSongIndex'
            ])
    },
    mounted(){
        this._getData()
    },
   methods:{
        back(){
                this.$router.go(-1)
            },
        playOrPause(){
            let opBtnNode = document.querySelector('.playPause');
            let audioNode = document.querySelector('#player');
            let thumb = document.querySelector('.thumb');
            if(!this.getPlayState){//播放
                audioNode.play();
                opBtnNode.setAttribute('class','playPause pause');
                thumb.style.animationPlayState = 'running'
            }else{//暂停
                audioNode.pause();
                opBtnNode.setAttribute('class','playPause play');
                thumb.style.animationPlayState = 'pause'
            }
            this.setPlayState(!this.getPlayState);
        },
          playPrev(){
            let curIndex = this.getCurSongIndex;
            let maxIndex = this.getPlayList.length - 1;

            let prevIndex = curIndex - 1;
            prevIndex >= 0 ? prevIndex : 0;

            this.setCurSongIndex(prevIndex);
            this.setCurSong(this.getPlayList[prevIndex]);
            let songData = this.getPlayList[prevIndex].musicData;
            this._getData(songData.songmid,songData.albummid);
            },
        playNext(){
            let curIndex = this.getCurSongIndex;
            let maxIndex = this.getPlayList.length - 1;

            let nextIndex = curIndex + 1;
            nextIndex <= maxIndex ? nextIndex : maxIndex;

            this.setCurSongIndex(nextIndex);
            this.setCurSong(this.getPlayList[nextIndex]);
            let songData = this.getPlayList[nextIndex].musicData;
            this._getData(songData.songmid,songData.albummid);
        },
        _getData(smid,amid){
            this.smid = smid;
            this.mid = amid;

            //1、获取vKey
            let url = api.vKeyApi + `&songmid=${this.smid}&filename=C400${this.smid}.m4a`;

            jsonp(url,{param:'callback'},(err,data)=>{
                let vkey = data.data.items[0].vkey;
                //2、使用 smid和vKey取得歌曲播放地址
                this.src = `http://dl.stream.qqmusic.qq.com/C400${this.smid}.m4a?vkey=${vkey}&guid=7120953682&uin=0&fromtag=66`;

                //添加播放地址到vuex
                this.setPlaySrc(this.src);
            })
        },
      
        ...mapMutations({
                'setPlaySrc':'setPlaySrc',
                'setCurSong':'setCurSong',
                'setPlayState':'setPlayState',
                'setCurSongIndex':'setCurSongIndex'
            })
    },
    components:{
    
    }
}

</script>

<style lang='scss' scoped>
@mixin bg($src){
  background:url('../assets/icon/'+$src) no-repeat;
  background-size:100% 100%;
}
.play-song{
  overflow-x: hidden;
  position: relative;
  z-index: 1010;
  height:100vh;
  transition:all .3s cubic-bezier(0.61, 0.35, 0, 1.04);
}
.header{
  text-align: center;
  color:#fff;
  position: relative;
  top:0;
    z-index: 1010;
  h1{
    font-weight: 400;
    font-size:22px;
    line-height: 55px;
    i{
      display: inline-block;
      width:25px;
      height:25px;
      padding:15px;
      background:url("../assets/icon/arrow_down.png") no-repeat;
      background-size:25px 25px;
      background-position: center center;
      position: absolute;
      left: 0;
    }
  }
  span{
    font-size: 15px;
  }
}

.thumb{
  text-align: center;
  margin-top:15px;
  position: relative;
  left: 0;
  top: 0;
  z-index:1010;
  &.playing{
    animation:playCicle 5s linear infinite;
  }

  img{
    width:250px;
    height:250px;
    border-radius: 50%;
    border:10px solid rgba(0,0,0,.26);
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


.opt-btn{
  display: flex;
  position: fixed;
  z-index:1010;
  bottom:30px;
  width:100%;
  justify-content:space-around;
  a{
    width:30px;
    height:30px;
    background:red;
    $opList:'mode','prev','play','pause','next','like';
    @each $val in $opList{
      &.#{$val}{
        @include bg('#{$val}.png');
      }
    }
  
  }
}


.bg-album{
  background: #000;
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
  transform-origin:center center;

  img{
    width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      filter:blur(20px);
  } 
}

.header,.opt-btn{
    transition: all .2s cubic-bezier(0, 0.48, 0.32, 1.31) .15s;
}
.thumb{
    transition: all .4s cubic-bezier(0.68, 0.44, 0.32, 0.71);
    img{
        transition: all .4s cubic-bezier(0.68, 0.44, 0.32, 0.71);
    }
}

.playsong-enter-active{
    .header{
        top:0;
    }
    .thumb{
        top:0;
        left:0;
        img{
            width:250px;
            height:250px;
        }
    }
    .opt-btn{
        bottom:30px;
    }
}
.playsong-enter{/*初始位置*/
    .header{
        top:-80px;
    }
    .thumb{
        top:400px;
        left: -100px;
        img{
            width:45px;
            height:45px;
        }
    }
    .opt-btn{
        bottom:-30px;
    }
}
</style>