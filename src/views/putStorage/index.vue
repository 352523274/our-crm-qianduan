<template>
  <div class="putStorage-box">
    <div class="execute-box">
      <el-button-group>
        <el-button type="success" size="mini" icon="el-icon-edit" @click="editDialig=true">新建</el-button>
        <el-button type="success" size="mini" icon="el-icon-delete" @click=" delDialig=true">删除</el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="success" size="mini" icon="el-icon-edit" @click="editDialig=true" class="form">新增入库单</el-button>
        <el-button type="success" size="mini" icon="el-icon-delete" @click=" delDialig=true" class="form">导出入库单</el-button>
      </el-button-group>
    </div>
    <div class="search-box">

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="返厂入库单号">
          <el-input v-model="formInline.tReturnedPutOdd" placeholder="返厂入库单号"></el-input>
        </el-form-item>
        <el-form-item label="返厂入库标志">
          <el-select v-model="formInline.tReturnedPutMark" placeholder="全部">
            <el-option label="已入库" value="1"></el-option>
            <el-option label="未入库" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.auditResult" placeholder="全部">
            <el-option label="已审核" value="1"></el-option>
            <el-option label="未审核" value="2"></el-option>
            <el-option label="审核不通过" value="3"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="制单人">
          <el-input v-model="formInline.makeUsername" placeholder="制单人姓名"></el-input>
        </el-form-item>
        <br>
        <span class="demonstration">制单时间</span>
        <el-date-picker
            v-model="formInline.makeTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>

        <span class="demonstration">审批时间</span>
        <el-date-picker
            v-model="formInline.auditTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>

        <el-form-item label="返厂地点">
          <el-input v-model="formInline.putaddress" placeholder="返厂地点"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="findAllByExampl">查询</el-button>
        </el-form-item>
      </el-form>

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
            prop="tReturnedOrdersId"
            label="序号"
            >   </el-table-column>
          <el-table-column
            align="center"
            prop="tReturnedPutOdd"
            label="返厂入库单号"
            />
            <el-table-column
            align="center"
            prop="tReturnedPutMark"
            label="返厂入库标志"
            />
              <el-table-column
            align="center"
            prop="makeOrders.makeUsername"
            label="制单人"
            />
                <el-table-column
            align="center"
            prop="audit.auditUserName"
            label="审批人"
           />
        <el-table-column
            align="center"
            prop="audit.auditResult"
            label="审批状态"
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
        <el-form-item label="品牌名称" >
          <el-input v-model="formData.brandName" placeholder="中国天翼"></el-input>
        </el-form-item>
        <el-form-item label="品牌" >
          <el-input v-model="formData.brandSite"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述" >
          <el-input v-model="formData.brandDesc"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" >
          <el-input v-model="formData.brandLogo"></el-input>
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