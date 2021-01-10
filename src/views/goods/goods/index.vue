<template>
  <div class="supplier-box">
    <div class="execute-box">
      <el-button-group>
        <el-button type="success" size="mini" icon="el-icon-edit" @click="editDialig=true,addFirstBut=true,resetForm()">新建</el-button>
        <el-button type="success" size="mini" icon="el-icon-delete" @click=" delDialig=true">删除</el-button>
      </el-button-group>
    </div>
<!--    搜索框-->
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
          <!--          <el-input v-model="goodsBrandId" placeholder="商品品牌"></el-input>-->

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
          <!--          <el-input v-model="goodsCategoryId" placeholder="商品分类"></el-input>-->
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

        <!--        <el-form-item label="活动区域">-->
        <!--          <el-select v-model="formInline.region" placeholder="活动区域">-->
        <!--            <el-option label="区域一" value="shanghai"></el-option>-->
        <!--            <el-option label="区域二" value="beijing"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>



    <!--                                                                                 展示table-->
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

        <!--                                                                                     展开行数据-->
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
            <el-button type="primary" size="mini" @click="editDialig=true,addFirstBut=false,findById(goods.row.id)">编辑</el-button>
            <el-button type="danger" size="mini"
                       @click=" delDialig=true,$refs.dataTable.clearSelection(),ids.push(goods.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--                                                                     分页插件-->
    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="pageChange">
      </el-pagination>
    </div>


    <!--                                                                         编辑弹出框-->
    <el-dialog
        title="实体操作"
        :visible.sync="editDialig"
        width="50%"
        @close="resetForm"
    >
      <el-button type="primary" v-show="addFirstBut" @click="selectFirstGoods()">选择一级商品</el-button>
      <el-form ref="editform" label-width="100px" size="small">
        <el-row>
          <el-col :span="10">
            <el-form-item label="存货档案编号" label-width="100px">
              <el-input v-model="formData.goodsCode" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="基础库-分类" label-width="100px">
              <el-input v-model="formData.catagory" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="基础库-品牌" label-width="100px">
              <el-input v-model="formData.brand" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="基础库-型号" label-width="100px">
              <el-input v-model="formData.model" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="基础库-颜色" label-width="100px">
              <el-input v-model="formData.color" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="基础库-采购模式" label-width="120px">
              <el-input v-model="formData.purchaseType" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="基础库-铺货" label-width="100px">
              <el-input v-model="formData.distribution" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="基础库-备机" label-width="100px">
              <el-input v-model="formData.spare" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <!--        以上为无法修改的-->

        <el-form-item label="商品名称">
          <el-col :span="19">
            <el-input v-model="formData.goodsName"></el-input>
          </el-col>
        </el-form-item>
        <!--        选择商品类别-->

        <el-form-item label="商品类别">
          <el-col :span="19">
          <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle" @change="formData.goodsCatagoryId=valueId">
            <el-option :value="valueTitle" :label="valueTitle">
              <el-tree id="tree-edit"
                       ref="selectTree"
                       check-strictly
                       :accordion="accordion"
                       :data="treeData"
                       :props="props"
                       :node-key="props.value"
                       :default-expanded-keys="defaultExpandedKey"
                       @node-click="handleClick">
              </el-tree>
            </el-option>
          </el-select>
            </el-col>
        </el-form-item>
<!--            树形展示-->
          <el-form-item label="商品颜色">
            <el-col :span="19">
              <el-select v-model="goodsColorId" placeholder="商品颜色" :clearable="clearable" @change="formData.goodsColorId=goodsColorId">
                <el-option
                    v-for="(item,index) in goodsColor"
                    :key="index"
                    :label="item.color"
                    :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>


        <el-form-item label="商品品牌">
          <!--          <el-input v-model="goodsBrandId" placeholder="商品品牌"></el-input>-->

          <el-select v-model="goodsBrandId" placeholder="商品品牌" :clearable="clearable" @change="formData.goodsBrandId=goodsBrandId">
            <el-option
                v-for="(item,index) in goodsBrand"
                :key="index"
                :label="item.brandName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品型号">
          <el-col :span="19">
            <el-input v-model="formData.goodsModel"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-col :span="19">
          <el-input v-model="formData.marketPrice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商城价格">
          <el-col :span="19">
          <el-input v-model="formData.shoppingPrice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="最低库存量">
          <el-col :span="19">
          <el-input v-model="formData.minStock"></el-input>
          </el-col>
        </el-form-item>



        <el-form-item label="是否可采购">
          <el-col :span="19">
          <el-select v-model="formData.canPurchase" placeholder="请选择">
            <el-option label="可采购" value="true"></el-option>
            <el-option label="不可采购" value="false"></el-option>
          </el-select>
          </el-col>
        </el-form-item>

        <!--        <el-form-item label="活动区域">-->
        <!--          <el-select v-model="form.region" placeholder="请选择活动区域">-->
        <!--            <el-option label="区域一" value="shanghai"></el-option>-->
        <!--            <el-option label="区域二" value="beijing"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialig = false,resetForm()">取 消</el-button>
    <el-button type="primary" @click="editDialig =false, addOrEdit() ">确 定</el-button>
  </span>
    </el-dialog>


    <!--                                                                           新增弹框-->


    <!--                                                                                删除弹框-->
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


<!--引入js和css文件-->
<script src="./index.js">

</script>

<style scoped lang="less" src="./index.less">

</style>