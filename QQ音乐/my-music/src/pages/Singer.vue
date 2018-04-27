<template>
  <div class="singer">
    <!-- S头部 -->
    <HeaderTab></HeaderTab>
    <!-- E头部 -->
    <div class="singer-wrapper">
    <div class="content">
    <!-- S歌手列表  -->
    <div class="singer-list">
        <div class="singer-item" v-for="(item,k) in singerList" :key="item.index">
            <h2 v-text="item.index"></h2>
            <ul>
                <li v-for="(singer,j) in item.singer" :key="singer.Fsinger_id">
                    <img :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+ singer.Fsinger_mid
+ '.jpg?max_age=2592000'">
                    <span v-text="singer.Fsinger_name

"></span>
                </li>
            </ul>
        </div>
        </div>
    </div>
        <div class="index-tool">
            <ul>
                <li v-for="(index,k) in indexTool" :class="{active:curIndex == k}" :kye="k">{{index}}</li>
            </ul>
        </div>
    </div>
    
     <!-- E歌手列表  -->
    <Loading title="歌手列表加载中" :state="loadingState"></Loading>
  </div>
</template>

<script>
//头部  loading组件
import HeaderTab from '@/components/HeaderTab';
import Loading from '@/components/base/Loading/Loading';

// jsonp 连接
import jsonp from 'jsonp';

//api 连接
import api from '@/api/singerApi';

//better-scroll 插件
import BScroll from 'better-scroll';
export default {
    name: '',
    data(){
        return{
            indexTool:[],
            singerList:[],
            curIndex:0,
            loadingState:false,
            scroll:{}
        }
    },
    mounted(){
        jsonp(api.singerListApi,{param:'jsonpCallback'},(err,data)=>{
        this._getOrderSingerList(data.data.list);

        this.scroll = new BScroll('.singer-wrapper',{
            probeType:3
        });
        this.scroll.on('scroll',(pos)=>{
            let posY = Math.abs(pos.y);
            let singerList = this.singerList;
            let indexMax = this.singerList.length - 1;
            for(let i=0;i<=indexMax;i++){
                if(posY <= singerList[i].distance){
                    this.curIndex = i;
                    break;
                }
            }
        });
        this.$nextTick(()=>{
            this._getDistance();
        })
    })
        
        },
    methods:{
        //歌手列表数据结构，A~Z顺序。
        _getOrderSingerList(data){
            this._getIndexTool();

            //生成热门
            let hotSinger ={index:"热",singer:data.splice(0,10)};
            this.singerList.push(hotSinger);

            //生成A~Z歌手哦顺序结构
            for(let i=1;i<=26;i++){
                let curIndex = this.indexTool[i];
                let temp = {index:curIndex,singer:[]};
    
                data.forEach((singer,k)=>{
                    if(singer.Findex === curIndex){

                        temp.singer.push(singer);
                        data.splice(k,1);
                    }
                });
                this.singerList.push(temp);
            }

            //清楚无singer
            this.singerList.map((item,k)=>{
                if(item.singer.length<=0){
                    this.singerList.splice(k,1);
                    this.indexTool.splice(k,1);
                }
            })
        },
        //index 歌曲索引
        _getIndexTool(){
            let indexArr = ['热'];
             for(let code=65;code<=90;code++){
                indexArr.push(String.fromCharCode(code));
             }
             this.indexTool = indexArr;
             // console.log(indexArr);
        },
        // 
        _getDistance(){
            let singerItemNode = document.querySelectorAll('.singer-item');
            let offset = 0;
            this.singerList.map((singerItem,i)=>{
            offset += singerItemNode[i].offsetHeight;
            this.singerList[i].distance = offset;
           })
           
           }
        

    },
    components:{
        HeaderTab,
        Loading
    }   
}


</script>

<style lang='scss'>
@import '../assets/scss/_themes.scss';
.singer-wrapper{
    height:calc(100vh - 100px);
    overflow: hidden;
    .singer-item{
        h2{
            font-size: 15px;
            line-height: 30px;
            background: #131313;
            font-weight: 400;
            text-indent: 1em;
            color: $white;
        }
        ul{
            padding-left: 25px;
            padding-bottom: 20px;
            li{
                display: flex;
                line-height: 50px;
                margin-top: 20px;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                span{
                    color: $white;
                    flex-grow: 1;
                    margin-left: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-right: 8px;
                }
            }
        }
    }
    }
    
    .index-tool{
        width: 16px;
        position: fixed;
        top: 50%;
        right: 10px;
        margin-top: -145px;
        background-color: hsla(0,0%,92%,.1);
        font-size: 12px;
        border-radius: 10px;
        padding: 5px 0;
        color: #c8c8c8;
        li{
            text-align: center;
            &.active{
                color: #d3442c
            }
        }
        }
    
</style>
