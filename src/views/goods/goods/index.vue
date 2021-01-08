<template>
  <div class="supplier-box">
    <div class="execute-box">
      <el-button-group>
        <el-button type="success" size="mini" icon="el-icon-edit" @click="editDialig=true">新建</el-button>
        <el-button type="success" size="mini" icon="el-icon-delete" @click=" delDialig=true">删除</el-button>
      </el-button-group>
    </div>
    <div class="search-box">

    </div>

<!--    展示table-->
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
            prop="goodsName"
            label="商品名称"
            />
            <el-table-column
            align="center"
            prop="goodsCatagoryId"
            label="商品分类"
            />
              <el-table-column
            align="center"
            prop="goodsBrandId"
            label="商品品牌"
            />
                <el-table-column
            align="center"
            prop="goodsModel"
            label="商品型号"
           />
                  <el-table-column
            align="center"
            prop="goodsColorId"
            label="商品颜色"
            />

        <el-table-column
            align="center"
            label="操作"
            width="300"
            >
          <template v-slot="goods">
            <el-button type="primary" size="mini" @click="editDialig = true">查看详情</el-button>
            <el-button type="primary" size="mini" @click="editDialig = true,findById(goods.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click=" delDialig=true,$refs.dataTable.clearSelection(),ids.push(goods.row.id)">删除</el-button>
          </template>
        </el-table-column>
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

<!--    新建或编辑弹出框-->
    <el-dialog
        title="实体操作"
        :visible.sync="editDialig"
        width="50%"
        >
      <el-form ref="form"  label-width="100px" size="small">
        <el-form-item label="运营商名称" >
          <el-input v-model="formData.supplierName" placeholder="中国天翼"></el-input>
        </el-form-item>
        <el-form-item label="联系人" >
          <el-input v-model="formData.supplierContact"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input v-model="formData.supplierPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="formData.supplierEmail"></el-input>
        </el-form-item>
        <el-form-item label="地址" >
          <el-input v-model="formData.supplierAddress"></el-input>
        </el-form-item>
        <el-form-item label="开户行" >
          <el-input v-model="formData.supplierBrank"></el-input>
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



<!--引入js和css文件-->
<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>