<template>
  <div class="supplier-box">
    <div class="execute-box">
      <el-button-group>
        <el-button type="success" size="mini" icon="el-icon-edit" @click="addialig=true">批量添加</el-button>
      </el-button-group>
    </div>
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="商品名称" :clearable="clearable">
          <el-input v-model="goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品型号">
          <el-input v-model="goodsModel" placeholder="商品型号"></el-input>
        </el-form-item>
        <el-form-item label="商品颜色">
          <el-select v-model="goodsColorId" placeholder="商品颜色" :clearable="clearable">
            <el-option
                v-for="(item,index) in goodsColor"
                :key="index"
                :label="item.color"
                :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="商品品牌">

          <el-select v-model="goodsBrandId" placeholder="商品品牌" :clearable="clearable">
            <el-option
                v-for="(item,index) in goodsBrand"
                :key="index"
                :label="item.brandName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle">
            <el-option :value="valueTitle" :label="valueTitle">
              <el-tree id="tree-option"
                       ref="selectTree"
                       :accordion="accordion"
                       :data="treeData"
                       :props="props"
                       :node-key="props.value"
                       :default-expanded-keys="defaultExpandedKey"
                       @node-click="handleNodeClick">
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
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

        <!--        展开行数据-->
        <el-table-column type="expand" label="详情展开" width="100">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品存货档案编码:">
                <span>{{ props.row.goodsCode }}</span>
              </el-form-item>
              <el-form-item label="基础库-分类:">
                <span>{{ props.row.catagory }}</span>
              </el-form-item>
              <el-form-item label="基础库-品牌:">
                <span>{{ props.row.brand }}</span>
              </el-form-item>
              <el-form-item label="基础库-型号:">
                <span>{{ props.row.model }}</span>
              </el-form-item>
              <el-form-item label="基础库-颜色:">
                <span>{{ props.row.color }}</span>
              </el-form-item>
              <el-form-item label="基础库-采购模式:">
                <span>{{ props.row.purchaseType }}</span>
              </el-form-item>
              <el-form-item label="基础库-铺货:">
                <span>{{ props.row.distribution }}</span>
              </el-form-item>
              <el-form-item label="基础库-备机:">
                <span>{{ props.row.spare }}</span>
              </el-form-item>
              <el-form-item label="商品名称:">
                <span>{{ props.row.goodsName }}</span>
              </el-form-item>

              <el-form-item label="商品类型:">
                <span>{{ props.row.goodsCatagory }}</span>
              </el-form-item>


              <el-form-item label="市场价:">
                <span>{{ props.row.marketPrice }}</span>
              </el-form-item>

              <el-form-item label="商城价:">
                <span>{{ props.row.shoppingPrice }}</span>
              </el-form-item>

              <el-form-item label="最低库存:">
                <span>{{ props.row.minStock }}</span>
              </el-form-item>

              <el-form-item label="可采购:">
                <span>{{ props.row.canPurchase }}</span>
              </el-form-item>


            </el-form>
          </template>
        </el-table-column>


        <el-table-column
            align="center"
            prop="id"
            label="id"
            width="80"
        ></el-table-column>
        <el-table-column
            align="center"
            prop="goodsName"
            label="商品名称"
        />
        <el-table-column
            align="center"
            prop="goodsCatagory"
            label="商品分类"
        />
        <el-table-column
            align="center"
            prop="goodsBrand"
            label="商品品牌"
        />
        <el-table-column
            align="center"
            prop="goodsModel"
            label="商品型号"
        />
        <el-table-column
            align="center"
            prop="goodsColor"
            label="商品颜色"
        />

        <el-table-column
            align="center"
            label="操作"
            width="300"
        >
          <template v-slot="goods">
            <el-button type="primary" size="mini" @click="addialig= true,ids=[],$refs.dataTable.clearSelection(),ids.push(goods.row.id)">添加</el-button>
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






    <el-dialog
        title="温馨提示"
        :visible.sync="addialig"
        width="30%"
    >
      <span>你确定要添加吗？{{ ids }}</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addialig = false,$refs.dataTable.clearSelection()">取 消</el-button>
      <el-button type="primary" @click=" addialig=false,addGoodsForSupplier()">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>








<!--引入js和css文件-->
<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>