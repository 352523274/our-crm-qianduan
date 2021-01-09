<template>
  <div class="category-box">
    <!--  操作的部分-->

    <div class="execute-box">
      <el-button-group>
        <el-button size="mini" type="primary" @click="formData={},addOrUpdateVisible=true">新建</el-button>
        <el-button size="mini" type="primary" @click="open">删除</el-button>
      </el-button-group>


<!--删除警告-->




    </div>
    <!--查询部分-->
    <div class="search-box">
      <!--      搜索使用的-->


    </div>
    <!--      表单数据show-overflow-tooltip   -->
<!--                                                             树形展示-->
    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border

        :tree-props="{children: 'children'}">
      <el-table-column
          prop="categoryName"
          label="品牌名字"
          sortable
          >
      </el-table-column>
      <el-table-column
          prop="categoryDesc"
          label="分类描述"
          sortable
         >
      </el-table-column>

            <el-table-column
                  label="操作">
                <template v-slot="rowD">
                  <el-button size="mini" type="primary" @click="findById(rowD.row.id),addOrUpdateVisible=true">编辑</el-button>
                  <el-button size="mini" type="danger" @click="ids=[],ids.push(rowD.row.id),open()">删除</el-button>
                </template>
              </el-table-column>
    </el-table>






    <!--编辑添加框-->
    <el-dialog
        title="操作"
        :visible.sync="addOrUpdateVisible"
        width="40%"
       >
<!--      表单-->
      <el-form ref="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="formData.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="formData.categoryDesc"></el-input>
        </el-form-item>
<!--        下拉选择框   选择其父级-->
        <el-form-item label="分类父级">
          <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle">
            <el-option :value="valueTitle" :label="valueTitle">
              <el-tree id="tree-option"
                       ref="selectTree"
                       :accordion="accordion"
                       :data="tableData"
                       :props="props"
                       :node-key="props.value"
                       :default-expanded-keys="defaultExpandedKey"
                       @node-click="handleNodeClick">
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addOrUpdateVisible = false">取 消</el-button>
    <el-button type="primary" @click="addOrUpdateVisible = false,addOrUpdate()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>






<!--加载js-->
<script src="./index.js">

</script>

<style lang="less" src="./index.less">

</style>