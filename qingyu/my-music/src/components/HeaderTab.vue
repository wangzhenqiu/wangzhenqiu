<template>
    <div class="header-tab">
        <h1><i class="logo"></i>音乐随心听</h1>
        <div class="nav">
        <router-link to='index'  active-class="active"><span>推荐</span></router-link>
        <router-link  to="/singer" active-class="active"><span>歌手</span></router-link>
        <router-link  to="/search" active-class="active"><span>搜索</span></router-link>
        </div>
    </div>
</template>
<script>
export default{
   name:'',
   data(){
       return{
    
        }
    },
   methods:{

    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_themes.scss';
.header-tab{
    padding-top:15px;
    text-align: center;
    h1{
        color:$white;
        font-weight: 400;
        font-size: 22px;
        i{
            display: inline-block;
            width:30px;
            height:30px;
            background:url(../assets/icon/logo.png) no-repeat;
            background-size:100% 100%;
            vertical-align: middle;
        }
    }
    .nav{
        display: flex;
        margin-top:25px;
        a{
            flex:1;
            span{
                padding-bottom: 5px;
            }

        }
        .active{
            span{
                border-bottom: 1px solid $red;
                color:$red;
            }
        }
    }

}
</style>