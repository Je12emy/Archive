<template>
  <!--This is where our HTML will recide, view directives and wrappers -->
  <div id="app">
    <!-- This imports another component named HelloWorld located in the components folder -->
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/About">About</router-link>
    </nav>

    <router-view/> 
  </div>
</template>

<script>
//! This is where we will have our logic
//import skills from './components/skills.vue'

export default {
  name: 'app'
}
</script>

<style>
 @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

body {
  background-color: #EEEEEE;
  font-family: 'Montserrat', sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  padding-top: 50px;
}
body, html {
  margin: 0;
  height: 100%;
}
#app {
    width: 50%;
}
nav {
  padding: 20px 20px 20px 0;
}

nav a {
  padding: 10px;
  text-decoration: none;
  background: #fff;
  border-radius: 3px;
  color: rgb(0, 110, 255);
  font-weight: bold;
  margin-right: 15px;
}
</style>
