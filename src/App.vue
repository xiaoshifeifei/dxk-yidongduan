<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="key"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key" />
    <!-- <Tabbar v-if="$route.meta.showTabbar" /> -->
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue';
export default {
  computed:{
	    key(){
	        return this.$route.path + Math.random();
	    }
	}

};
/*
 * @ is an alias to /src
 * import home from '@/assets/logo.png'
 */
</script>
<style>
.overflow-dian {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="stylus">
@import "./common/css/base.css"
</style>
