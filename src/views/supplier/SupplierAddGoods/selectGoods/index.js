import category from "@/api/category";
import goods from "@/api/goods";
import brand from "@/api/brand";
import firstGoods from "@/api/firstGoods";
import supplier from "@/api/supplier";


export default {
    name: "index.vue",
    data() {
        return {

            tableData: [],
            currentPage: 1,
            pageSize: 5,
            total: 0,
            ids: [],
            addialig: false,
            //    搜索框数据
            goodsName: "",
            goodsModel: '',
            goodsColorId: undefined,
            goodsBrandId: undefined,
            // goodsCategoryId:-1,
            goodsColor: [],
            goodsBrand: [],
            //只有最子级
            goodsCategory: {},

            // 分类下拉框数据
            //下拉框相关
            treeData: [],
            valueId: -1,  // 初始值
            valueTitle: '',
            defaultExpandedKey: [],

        }


    },
    // 下拉框的属性数据
    props: {
        /* 配置项 */
        props: {
            type: Object,
            default: () => {
                return {
                    value: 'id',       // ID字段名
                    label: 'categoryName',     // 显示名称
                    children: 'children'  // 子级字段名
                }
            }
        },
        /* 初始值 */
        value: {
            type: Number,
            default: () => {
                return 0
            }
        },
        /* 可清空选项 */
        clearable: {
            type: Boolean,
            default: () => {
                return true
            }
        },
        /* 自动收起 */
        accordion: {
            type: Boolean,
            default: () => {
                return false
            }
        },
    },
    created() {
        this.finaPageWithExample();
        this.initSearch()
        this.initadd()
    },


    methods: {
        /**
         * 跳转
         */
        async initadd() {
            if (localStorage.getItem("firstGoods")) {
                //如果不为空说明是选择一类商品跳转来的   展示相关数据
                this.editDialig = true;
                var item = localStorage.getItem("firstGoods");
                let refirstGoods = await firstGoods.findById(item)
                this.formData = refirstGoods;
                this.formData.firstGoodsId=item;
                localStorage.clear();
            }
        },
        /**
         *根据id获取firstgoods
         */
        async getFistGoodsById(firstGoodsId) {
            return await firstGoods.findById(firstGoodsId)
        },
        /**
         * 初始化全部搜索框
         */
        initSearch() {
            this.getTreeData();
            this.getColorSearchData()
            this.getBrandSearchData()
        },
        /**
         * goodsColor搜索框赋值
         */
        async getColorSearchData() {
            let response = await goods.findAllColor();
            console.log(response);
            this.goodsColor = response;
        },
        /**
         * goodsBrand搜索框赋值
         */
        async getBrandSearchData() {
            let response = await brand.findAllWithoutExampleAndPage();
            console.log(response);
            this.goodsBrand = response;
        },
        /**
         *给分类搜索赋值树形数据
         */
        async getTreeData() {
            let response = await category.getTreeData();
            console.log(response);
            this.treeData = response;
        },
        //下拉框相关方法
        initHandle() {
            if (this.valueId) {
                this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]   // 初始化显示

                this.$refs.selectTree.setCurrentKey(this.valueId)    // 设置默认选中
                this.defaultExpandedKey = [this.valueId]   // 设置默认展开
            }
            if (this.valueId == 0) {
                this.valueTitle = "无"
            }
            this.$nextTick(() => {
                // let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
                let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
                // scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
                scrollBar.forEach(ele => ele.style.width = 0)
            })

        },
        // 切换选项
        handleNodeClick(node) {
            this.valueTitle = node[this.props.label]
            this.valueId = node[this.props.value]
            this.formData.parentId = this.valueId
            this.$emit('getValue', this.valueId)
            this.defaultExpandedKey = []

        },
        //endi的树
        // 切换选项
        handleClick(node) {
            this.valueTitle = node[this.props.label]
            this.valueId = node[this.props.value]
            this.formData.goodsCatagoryId = this.valueId
            this.$emit('getValue', this.valueId)
            this.defaultExpandedKey = []
        },
        // 清除选中
        clearHandle() {
            this.valueTitle = ''
            this.valueId = null
            this.defaultExpandedKey = []
            this.clearSelected()
            this.$emit('getValue', null)
        },
        /* 清空选中样式 */
        clearSelected() {
            let allNode = document.querySelectorAll('#tree-option .el-tree-node')
            allNode.forEach((element) => element.classList.remove('is-current'))
        },
        //上为下拉框相关方法


        /**
         * 搜索框提交
         */
        onSubmit() {

            this.finaPageWithExample()
        },

        /**
         * 有条件的分页查询
         * @returns {Promise<void>}
         */
        async finaPageWithExample() {
            //将goodsName  goodsModel  goodsColorId  goodsBrandId  goodsCategoryId
            let obj = {
                goodsName: this.goodsName,
                goodsModel: this.goodsModel,
                goodsColorId: this.goodsColorId,
                goodsBrandId: this.goodsBrandId,
                goodsCategoryId: this.valueId,
            };
            let respnse = await goods.finaPageWithExample(this.currentPage, this.pageSize, obj);
            this.tableData = respnse.list;
            this.total = respnse.total;
            // console.log(this.tableData)
        },

        /**
         * 修改分类是父类弹框
         */
        open() {
            this.$confirm('禁止修改,类型不应该为父类!', '提示', {
                confirmButtonText: '确定',
                // cancelButtonText: '取消',
                type: 'warning'
            })
        },

        pageChange(page) {
            this.currentPage = page;
            this.finaPageWithExample()
        },
        selectionChangListenter(selection) {
            this.ids = []
            selection.forEach(item => this.ids.push(item.id));
            console.log(this.ids)
        },
        async addGoodsForSupplier() {
            if (this.ids.length == 0) {
                this.$message.success("请选中要添加的内容")
            } else {
                await supplier.addGoods(localStorage.getItem("supplierId"),this.ids);
                this.ids = []
                //添加成功跳转回去  到添加页面
                this.$router.push({name:'supplieraddgoods'})
            }
        },


    },


}