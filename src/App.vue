<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <AppHeader />
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  box-sizing: border-box;
}
.btn, button{
  padding: 10px 20px;
  border: none;
  color: #fff;
  background: #1d73e7;
  cursor: pointer;
  font-weight: 500;
  width: fit-content;
  margin-bottom: 10px;
  text-decoration: none;
  border-radius: 5px;
  display: block;
}
textarea, input{
  border-radius: 10px;
  display: block;
  margin-bottom: 10px;
  font-size: 17px;
  border: 1px solid #595959;

}
textarea{
  width: 100%;
}

.container{
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 15px;
}
input{
  height: 45px;
  padding-left: 20px;
}
</style>
