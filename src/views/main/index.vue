<template>

<div class="main-box">
  <el-container>
    <el-aside width="200px">
      <div class="title-wrapper">
        <img src="../../assets/aaa.jpeg" alt=" " >
        <span>后台管理系统</span>
      </div>
      <el-scrollbar class="scrollerbar">
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo">

        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">系统首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品相关</span>
          </template>
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            <span slot="title">品牌管理</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>

        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">运营商管理</span>
        </el-menu-item>
      </el-menu>

      </el-scrollbar>

      </el-aside>

    <el-container>
      <el-header>生活想要过的去</el-header>
      <el-main>
        <div class="main-body">
           <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script src="./index.js">

</script>

<style  lang="less" src="./index.less">



</style>