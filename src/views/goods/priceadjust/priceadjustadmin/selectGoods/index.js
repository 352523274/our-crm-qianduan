import category from "@/api/category";
import goods from "@/api/goods";
import brand from "@/api/brand";
import firstGoods from "@/api/firstGoods";


export default {
    name: "index.vue",
    data() {
        return {

            tableData: [],
            currentPage: 1,
            pageSize: 5,
            total: 0,
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

            //添加相关
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
    },


    methods: {
        /**
         * 选择商品跳转页面 将商品id存到goodsId
         */
        selectGoods(id){
            localStorage.setItem("goodsId",id)
            this.$router.push({name:'priceadjust/priceadjustadmin'})
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
         * 清除表单信息form
         */
        resetForm() {
            this.formData = {}
            this.valueId = -1;
            this.valueTitle = "";
            // this.addFirstBut = false;
            //清空搜索下拉框信息
            this.goodsBrandId=undefined;
            this.goodsCategoryId=undefined;
            this.goodsColorId=undefined
            this.finaPageWithExample();
        },

        pageChange(page) {
            this.currentPage = page;
            this.finaPageWithExample()
        },
        /**
         *
         */
        selectionChangListenter(selection) {
            this.ids = []
            selection.forEach(item => this.ids.push(item.id));
            console.log(this.ids)

        },
    },


}