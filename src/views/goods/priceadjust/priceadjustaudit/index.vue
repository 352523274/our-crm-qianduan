<template>
  <div class="brand-box">
    <!--                                                                            操作框-->
    <div class="execute-box">
    </div>
    <!--                                                                           搜索框-->
    <div class="search-box">

      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="goodsName" placeholder="商品名称"></el-input>
        </el-form-item>

        <el-form-item label="审批状态">
          <el-select v-model="aduitStatus" placeholder="请选择">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="未审核" value="2"></el-option>
            <el-option label="已审核" value="1"></el-option>
            <el-option label="未通过" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="价格生效时间">
        <el-date-picker
            v-model="hopeEffectiveDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
        </el-date-picker>
        </el-form-item>

        <el-form-item label="价格失效时间">
          <el-date-picker
              v-model="hopeExpiryDate"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <!--                                                                         table展示框-->
    <div class="table-box">
      <el-table
          ref="dataTable"
          stripe
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">

<!--                                                                                  详情展开页-->
        <el-table-column type="expand" label="详情展开" width="100">
          <template slot-scope="props">
            <el-form label-position="left"  class="demo-table-expand">
              <el-form-item label="商品Id:">
                <span>{{ props.row.goodsId }}</span>
              </el-form-item>
              <el-form-item label="商品名称:">
                <span>{{ props.row.goodsName }}</span>
              </el-form-item>
              <el-form-item label="商品库存:">
                <span>{{ props.row.stock }}</span>
              </el-form-item>
              <el-form-item label="商品原始价格:">
                <span>市场价:{{ props.row.marketPrice}}</span> <tabs/>
                <span>商城价:{{ props.row.shoppingPrice }}</span>
              </el-form-item>
              <el-form-item label="商品调整后价格:">
                <span>市场价:{{ props.row.adjustedMarketPrice }}</span>
                <span>商城价:{{ props.row.adjustedShoppingPrice }}</span>
              </el-form-item>
              <el-form-item label="希望价格生效时间:">
                <span>{{ props.row.hopeEffectiveDate }}</span>
              </el-form-item>
              <el-form-item label="希望价格失效时间:">
                <span>{{ props.row.hopeExpiryDate }}</span>
              </el-form-item>
              <el-form-item label="活动情况和原因:">
                <span>{{ props.row.adjustReason }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
            align="center"
            prop="id"
            label="id"
        ></el-table-column>
        <el-table-column
            align="center"
            prop="goodsName"
            label="商品名称"
        />
        <el-table-column
            align="center"
            prop="shoppingPrice"
            label="原商城价"
        />
        <el-table-column
            align="center"
            prop="adjustedShoppingPrice"
            label="调整后商城价格"
        />
        <el-table-column
            align="center"
            prop="hopeEffectiveDate"
            label="希望价格生效时间"
        />
        <el-table-column
            align="center"
            prop="aduitStatus"
            label="审批状态"
        />


        <el-table-column
            align="center"
            label="操作"
            width="300"
        >
          <template v-slot="form1">
            <el-button type="primary" size="mini" @click="findById(form1.row.id)">审核</el-button>
            <el-button type="primary" size="mini" @click="editDialig = true,adjustDetail(form1.row.id)">审核跟踪</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--                                                                            分页插件-->
    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="pageChange">
      </el-pagination>
    </div>

    <!--                                                                           新建或编辑弹出框-->
    <el-dialog
        title="实体操作"
        :visible.sync="editDialig"
        width="70%"
    >

      <h1>价格调整申请信息:</h1>  <br>
      <el-form ref="form" label-width="120px" size="small" style="width: 100%">

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



            <el-form-item label="价格生效时间:" label-width="120px">
              <el-date-picker
                  disabled
                  v-model="priceadjustformData.hopeEffectiveDate"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期:">
              </el-date-picker>
            </el-form-item>



            <el-form-item label="价格失效时间:" label-width="120px">
              <el-date-picker
                  disabled
                  v-model="priceadjustformData.hopeExpiryDate"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期:">
              </el-date-picker>
            </el-form-item>




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

      <el-form ref="form" label-width="120px" size="small" style="width: 60%" >

        <el-row>
          <el-col :span="20">
            <el-form-item label="审批状态:" label-width="120px">
              <el-select v-model="auditformdata.auditResult" placeholder="请选择">
                <el-option label="通过" value="1"></el-option>
                <el-option label="未通过" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="审批意见:">
          <el-input type="textarea"  v-model="auditformdata.auditIdea" ></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialig = false">取 消</el-button>
    <el-button type="primary" @click="editDialig =false, addOrEdit() ">确 定</el-button>
  </span>
    </el-dialog>
    <!--                                                                            删除弹框-->

  </div>
</template>


<!--                                                                                引入外部js-->
<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>