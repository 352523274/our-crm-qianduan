<template>
  <div class="brand-box">

    <div class="execute-box">
    </div>
    <!--    <div class="search-box">-->

    <!--    </div>-->

    <h1>价格调整申请信息:</h1>  <br>
    <el-form ref="form" label-width="120px" size="small" style="width: 60%">

      <el-form-item label="商品id:" label-width="120px">
        <el-input v-model="priceadjustformData.goodsId" disabled></el-input>
      </el-form-item>

      <el-form-item label="商品名称:" label-width="120px">
        <el-input v-model="priceadjustformData.goodsName" disabled></el-input>
      </el-form-item>

      <el-form-item label="商品库存:" label-width="120px">
        <el-input v-model="priceadjustformData.stock" disabled></el-input>
      </el-form-item>

      <el-form-item label="商品原始价格:">
        <el-row>
          <el-col :span="12">
            <el-form-item label="市场价:" label-width="70px">
              <el-input v-model="priceadjustformData.marketPrice" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商城价:" label-width="70px">
              <el-input v-model="priceadjustformData.shoppingPrice" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="商品调整后价格:">
        <el-row>
          <el-col :span="12">
            <el-form-item label="市场价:" label-width="70px">
              <el-input v-model="priceadjustformData.adjustedMarketPrice" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商城价:" label-width="70px">
              <el-input v-model="priceadjustformData.adjustedShoppingPrice" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="价格生效时间:" label-width="120px">
            <el-date-picker
                disabled
                v-model="priceadjustformData.hopeEffectiveDate"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期:">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="价格失效时间:" label-width="130px">
            <el-date-picker
                disabled
                v-model="priceadjustformData.hopeExpiryDate"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期:">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-row>

      <el-form-item label="调整原因:">
        <el-input v-model="priceadjustformData.adjustReason" disabled></el-input>
      </el-form-item>

      <el-form-item label="备注:">
        <el-input v-model="priceadjustformData.remark" disabled></el-input>
      </el-form-item>

    </el-form>
<!--                                                                审核信息-->
    <br>
    <h1>审核信息:  </h1>
    <br>

    <el-form ref="form" label-width="120px" size="small" style="width: 60%" v-show="auditshow">

        <el-row>
          <el-col :span="8">
            <el-form-item label="审批人:" label-width="120px">
              <el-input v-model="auditformdata.auditUserName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="审批时间:" label-width="120px">
              <el-input v-model="auditformdata.auditDate" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审批状态:" label-width="120px">
              <el-input v-model="auditformdata.auditResult" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      <el-form-item label="审批意见:">
        <el-input type="textarea"  v-model="auditformdata.auditIdea" disabled></el-input>
      </el-form-item>

    </el-form>



    <span slot="footer" class="dialog-footer" >
    <el-button type="primary" @click="reback()" style="position: absolute;right: 50%">返回</el-button>
    </span>


    <!--    新建或编辑弹出框-->

  </div>
</template>

<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>