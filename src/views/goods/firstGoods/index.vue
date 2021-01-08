<template>
  <div class="supplier-box">
    <div class="execute-box">
      <el-button-group>
<!--        <el-button type="success" size="mini" icon="el-icon-edit" @click="editDialig=true">新建</el-button>-->
<!--        <el-button type="success" size="mini" icon="el-icon-delete" @click=" delDialig=true">删除</el-button>-->
      </el-button-group>
    </div>
<!--    搜索框-->
    <div class="search-box">

      <el-form :inline="true"  class="demo-form-inline" >
        <el-form-item label="存货档案编码">
          <el-input v-model="goodsCode" placeholder="存货档案编码"></el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input v-model="model" placeholder="产品型号"></el-input>
        </el-form-item>
        <el-form-item label="基础库-颜色">
          <el-input v-model="color" placeholder="基础库-颜色"></el-input>
        </el-form-item>
        <el-form-item label="基础库-品牌">
          <el-input v-model="brand" placeholder="基础库-品牌"></el-input>
        </el-form-item>
        <el-form-item label="基础库-分类" label-width="100px">
          <el-input v-model="brand" placeholder="基础库-分类"></el-input>
        </el-form-item>

<!--        <el-form-item label="活动区域">-->
<!--          <el-select v-model="formInline.region" placeholder="活动区域">-->
<!--            <el-option label="区域一" value="shanghai"></el-option>-->
<!--            <el-option label="区域二" value="beijing"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>





    </div>

<!--    展示table-->
    <div class="table-box">
      <el-table
          ref="dataTable"
          stripe
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">


        <el-table-column
            align="center"
            prop="id"
            label="id"
            >   </el-table-column>
          <el-table-column
            align="center"
            prop="goodsCode"
            label="存货档案编码"
            />
            <el-table-column
            align="center"
            prop="catagory"
            label="基础库-分类"
            />
              <el-table-column
            align="center"
            prop="brand"
            label="基础库-品牌"
            />
                <el-table-column
            align="center"
            prop="model"
            label="基础库-型号"
           />
                  <el-table-column
            align="center"
            prop="color"
            label="基础库-颜色"
            />
      </el-table>
    </div>


<!--    分页插件-->
    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
           @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>



<!--引入js和css文件-->
<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>