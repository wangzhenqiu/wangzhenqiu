<template>
  <div id="app">
 
 <router-view/>
<MiniPlayer></MiniPlayer>
  </div>
</template>

<script>
import MiniPlayer from '@/components/MiniPlayer';

export default {
  name: 'App',
   components:{
      MiniPlayer
    }
}

</script>

<style lang='scss'>
@import 'assets/scss/_themes.scss';
*{
    margin:0;
    padding: 0;

}
body{
    margin:0;
    background-color: $black;
    overflow-x:hidden;
}


ul{
  list-style: none;
}
a{
  text-decoration: none;
  color:$white;
}
</style>
