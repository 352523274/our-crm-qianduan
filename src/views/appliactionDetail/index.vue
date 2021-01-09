<template>
  <div class="sellOrder-box">

    <div class="execute-box">
      <h2>订单基本资料</h2>
      <el-divider></el-divider>
      <div class="execute-table">
        <el-table
            stripe
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
          <el-table-column
              align="center"
              prop="sellOrder.orderNumber"
              label="订单编号"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="sellOrder.addTime"
              label="下单时间"
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
              prop="statusName"
              label="订单状态"
          ></el-table-column>
        </el-table>
      </div>

      <h2>收货人资料</h2>
      <el-divider></el-divider>
      <div class="execute-table">
        <el-table
            stripe
            :data="table1Data"
            tooltip-effect="dark"
            style="width: 100%">
          <el-table-column
              align="center"
              prop="consignee.consigneeName"
              label="收货人姓名"
          ></el-table-column>

          <el-table-column
              align="center"
              prop="consignee.vipAccountNumber"
              label="会员账号"
          ></el-table-column>

          <el-table-column
              align="center"
              prop="consignee.consigneePhone"
              label="联系电话"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="consignee.consigneeCellphone"
              label="联系手机"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="consignee.consigneeZipcode"
              label="邮政编码"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="consignee.consigneeAddress"
              label="收货地址"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="consignee.consigneeAddress"
              label="配送地区"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="consignee.consigneeAddress"
              label="配送方式"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="consignee.consigneeMoney"
              label="配送费用"
          ></el-table-column>
        </el-table>
      </div>
      <div class="execute-table">
        <el-table
            stripe
            :data="table1Data"
            tooltip-effect="dark"
            style="width: 100%">
          <el-table-column
              align="center"
              width="150px"
              prop="consignee.consigneeTime"
              label="自提时间"
          ></el-table-column>
          <el-table-column
              align="center"
              width="200px"
              prop="consignee.consigneeEmail"
              label="电子邮箱"
          ></el-table-column>
          <el-table-column
              prop="consignee.consigneeRemark"
              label="备注"
          ></el-table-column>

        </el-table>
      </div>

      <h2>订单商品信息</h2>
      <el-divider></el-divider>
      <div class="execute-table">
        <el-table
            stripe
            :data="table2Data"
            tooltip-effect="dark"
            align="center"
            border
            style="width: 70%">
          <el-table-column
              align="center"
              prop="id"
              label="商品编号"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="goodsName"
              label="商品名称"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="shoppingPrice"
              label="单价"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="consignee.consigneeNumber"
              label="数量"
          ></el-table-column>
          <el-table-column
              align="center"
              prop="consignee.consigneeTotalamount"
              label="总金额"
          ></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="search-box">

    </div>

  </div>
</template>

<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>