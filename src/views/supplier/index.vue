<template>
  <div class="supplier-box">
    <div class="execute-box">
      <el-button-group>
        <el-button type="success" size="mini" icon="el-icon-edit" @click="editDialig=true">新建</el-button>
        <el-button type="success" size="mini" icon="el-icon-delete" @click=" delDialig=true">删除</el-button>
      </el-button-group>
    </div>

    <!--    搜索框-->
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline">

        <el-form-item label="">
          <el-select v-model="selection" placeholder="选择搜索条件">
            <el-option label="供应商名字" value="supplierName"></el-option>
            <el-option label="供应商联系人" value="supplierContact"></el-option>
            <el-option label="联系人电话" value="supplierPhone"></el-option>
            <el-option label="供应商地址" value="supplierAddress"></el-option>
            <el-option label="银行卡号" value="supplierBrankCode"></el-option>
            <el-option label="开户银行" value="supplierBrank"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="" label-width="100px">
          <el-input v-model="selectionValue" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>


    <!--    展示框-->
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
        ></el-table-column>
        <el-table-column
            align="center"
            prop="supplierName"
            label="姓名"
        />
        <el-table-column
            align="center"
            prop="supplierContact"
            label="联系人"
        />
        <el-table-column
            align="center"
            prop="supplierPhone"
            label="联系电话"
        />
        <el-table-column
            align="center"
            prop="supplierEmail"
            label="邮箱"
        />
        <el-table-column
            align="center"
            prop="supplierAddress"
            label="地址"
        />
        <el-table-column
            align="center"
            prop="supplierBrank"
            label="开户行"
        />


        <el-table-column
            align="center"
            label="操作"
            width="300"
        >
          <template v-slot="supplier">
            <el-button type="primary" size="mini" @click="gotoSupplierAddGoods(supplier.row.id)">选用供应商品</el-button>
            <el-button type="primary" size="mini" @click="editDialig = true,findById(supplier.row.id)">编辑</el-button>
            <el-button type="danger" size="mini"
                       @click=" delDialig=true,$refs.dataTable.clearSelection(),ids.push(supplier.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页相关-->
    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="pageChange">
      </el-pagination>
    </div>
    <!--    供应商添加商品-->
<!--    <el-dialog-->
<!--        title="实体操作"-->
<!--        :visible.sync="adGoodsDialog"-->
<!--        width="50%"-->
<!--    >-->
<!--      <h2>中兴通讯</h2>-->

<!--      <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="adGoodsDialog = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="adGoodsDialog =false ">确 定</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->


    <!--    新建或编辑弹出框-->
    <el-dialog
        title="实体操作"
        :visible.sync="editDialig"
        width="50%"
    >
      <el-form ref="form" label-width="100px" size="small">
        <el-form-item label="运营商名称">
          <el-input v-model="formData.supplierName" placeholder="中国天翼"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="formData.supplierContact"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.supplierPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.supplierEmail"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formData.supplierAddress"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
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
      <span>你丫的确定要删除吗？{{ ids }}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="delDialig = false,$refs.dataTable.clearSelection()">取 消</el-button>
    <el-button type="primary" @click=" delDialig=false,deleteByIds()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>