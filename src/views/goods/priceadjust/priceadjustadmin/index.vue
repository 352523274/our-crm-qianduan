<template>
  <div class="brand-box">
    <!--                                                                            操作框-->
    <div class="execute-box">
      <el-button-group>
        <el-button type="success" size="mini" icon="el-icon-edit" @click="editDialig=true,addGoodsBut=true,resetForm()">新建</el-button>
        <el-button type="success" size="mini" icon="el-icon-delete" @click=" delDialig=true">删除</el-button>
      </el-button-group>
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
          @selection-change="selectionChangListenter"
          tooltip-effect="dark"
          style="width: 100%">

        <el-table-column
            align="center"
            type="selection"
            width="55">
        </el-table-column>
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
            <el-button type="primary" size="mini" @click="findById(form1.row.id)">修改</el-button>
            <el-button type="danger" size="mini"
                       @click=" delDialig=true,$refs.dataTable.clearSelection(),ids.push(form1.row.id)">删除
            </el-button>
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
        width="50%"
    >

      <el-button type="primary" v-show="addGoodsBut" @click="selectGoods()">选择一级商品</el-button>


      <el-form ref="form" label-width="120px" size="small">
        <el-row>

          <el-col :span="8">
        <el-form-item label="商品id:"  label-width="80px">
          <el-input v-model="formData.goodsId" disabled></el-input>
        </el-form-item>
          </el-col>

          <el-col :span="8">
        <el-form-item label="商品名称:"  label-width="80px">
          <el-input v-model="formData.goodsName" disabled></el-input>
        </el-form-item>
          </el-col>

          <el-col :span="8">
        <el-form-item label="商品库存:"  label-width="80px">
          <el-input v-model="formData.stock" disabled></el-input>
        </el-form-item>
          </el-col>

        </el-row>

        <el-form-item label="商品原始价格:">

          <el-row>
            <el-col :span="12">
          <el-form-item label="市场价:" label-width="70px">
            <el-input v-model="formData.marketPrice" disabled></el-input>
          </el-form-item>
          </el-col>
            <el-col :span="12">
          <el-form-item label="商城价:" label-width="70px" >
            <el-input v-model="formData.shoppingPrice" disabled></el-input>
          </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

<!--                             以上为不可输入框-->



        <el-form-item label="商品调整后价格:">

          <el-row>
            <el-col :span="12">
              <el-form-item label="市场价:" label-width="70px">
                <el-input v-model="formData.adjustedMarketPrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商城价:" label-width="70px" >
                <el-input v-model="formData.adjustedShoppingPrice"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="价格生效时间">
          <el-date-picker
              v-model="formData.hopeEffectiveDate"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="价格失效时间">
          <el-date-picker
              v-model="formData.hopeExpiryDate"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="调整原因">
          <el-input v-model="formData.adjustReason"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="formData.remark"></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialig = false">取 消</el-button>
    <el-button type="primary" @click="editDialig =false, addOrEdit() ">确 定</el-button>
  </span>
    </el-dialog>
    <!--                                                                            删除弹框-->
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


<!--                                                                                引入外部js-->
<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>