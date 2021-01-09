<template>
  <div class="sellOrder-box">

    <div class="execute-box">
    </div>

    <div class="search-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >立即创建</el-button>
          <el-button>取消</el-button>
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
            prop="sellOrder.id"
            label="序号"
        ></el-table-column>

        <el-table-column
            align="center"
            type="selection"
            width="55">
        </el-table-column>

        <el-table-column
            align="center"
            prop="sellOrder.orderNumber"
            label="订单编号"
        ></el-table-column>

        <el-table-column
            align="center"
            prop="typeName"
            label="订单类型"
        ></el-table-column>
        <el-table-column
            align="center"
            prop="sellOrder.orderAction"
            label="订单动作"
        ></el-table-column>
        <el-table-column
            align="center"
            prop="sellOrder.businessType"
            label="业务类型"
        ></el-table-column>
        <el-table-column
            align="center"
            prop="sellOrder.paymentMethod"
            label="支付方式"
        ></el-table-column>
        <el-table-column
            align="center"
            prop="deliveryName"
            label="配送方式"
        ></el-table-column>
        <el-table-column
            align="center"
            prop="statusName"
            label="订单状态"
        ></el-table-column>


        <el-table-column
            align="center"
            label="操作"
        >
          <template v-slot="sellOrder">
            <el-button type="primary" size="mini" @click="gotoDetail(sellOrder.row.sellOrder.id)">查看</el-button>
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
  </div>
</template>

<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>