<template>
  <div class="category-box">
    <div class="execute-box">
      <el-button-group>
        <el-button type="success" size="mini" icon="el-icon-edit" @click="editDialig=true">新建</el-button>
        <el-button type="success" size="mini" icon="el-icon-delete" @click=" delDialig=true">删除</el-button>
      </el-button-group>
    </div>
    <div class="search-box">

    </div>
    <div class="table-box">
      <el-table
          ref="dataTable"
          stripe
          border
          :data="tableData"
         @selection-change="selectionChangListenter"
          tooltip-effect="dark"
          style="width: 100%">

        <el-table-column
            align="center"
            type="selection"
            width="55">
        </el-table-column>

        <el-table-column
            align="center"
            prop="id"
            label="id"
            >   </el-table-column>
          <el-table-column
            align="center"
            prop="categoryName"
            label="分类名字"
            />
            <el-table-column
            align="center"
            prop="categoryDesc"
            label="分类描述"
            />
              <el-table-column
            align="center"
            prop="parentId"
            label="父级id"
            />




        <el-table-column
            align="center"
            label="操作"
            >
          <template v-slot="supplier1">
            <el-button type="primary" size="mini" @click="editDialig = true,findById(supplier1.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click=" delDialig=true,$refs.dataTable.clearSelection(),ids.push(supplier1.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
           @current-change="pageChange">
      </el-pagination>
    </div>

<!--    新建或编辑弹出框-->
    <el-dialog
        title="实体操作"
        :visible.sync="editDialig"
        width="50%"
        >
      <el-form ref="form"  label-width="100px" size="small">
        <el-form-item label="分类名称" >
          <el-input v-model="formData.categoryName" placeholder="中国天翼"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" >
          <el-input v-model="formData.categoryDesc"></el-input>
        </el-form-item>
        <el-form-item label="父级id" >
          <el-input v-model="formData.brandDesc"></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialig = false">取 消</el-button>
    <el-button type="primary" @click="editDialig =false, addOrEdit() ">确 定</el-button>
  </span>
    </el-dialog>
<!--删除弹框-->
    <el-dialog
        title="温馨提示"
        :visible.sync="delDialig"
        width="30%"
    >
      <span>你丫的确定要删除吗？{{ids}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="delDialig = false,$refs.dataTable.clearSelection()">取 消</el-button>
    <el-button type="primary" @click=" delDialig=false,deleteByIds()" >确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>