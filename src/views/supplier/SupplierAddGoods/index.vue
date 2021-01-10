<template>
  <div class="brand-box">
    <h2 style="display: inline">供应商名称：</h2>
    <h2 style="display: inline-block">{{supplier.supplierName}}</h2>


    <div class="execute-box">
      <el-button-group>
        <el-button type="success" size="mini"  @click="editDialig=true,addGoods()">添加此供应商的供应商品</el-button>
      </el-button-group>
    </div>
<!--    <div class="search-box">-->

<!--    </div>-->
    <div class="table-box">
      <el-table
          ref="dataTable"
          stripe
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 60%">

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
            prop="purchasePrice"
            label="采购价格"
        />
        <el-table-column
            align="center"
            prop="marketPrice"
            label="市场价格"
        />
        <el-table-column
            align="center"
            label="操作"
            width="100"
        >
          <template v-slot="goods">
            <el-button type="danger" size="mini" @click=" delDialig=true,$refs.dataTable.clearSelection(),ids.push(goods.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

<!--    新建或编辑弹出框-->

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