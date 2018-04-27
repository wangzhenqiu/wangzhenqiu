<template>
  <div id="app">
 
 <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
}


ul{
  list-style: none;
}
a{
  text-decoration: none;
  color:$white;
}
</style>
