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
            editDialig: false,
            delDialig:false,
            formData: {},
            ids:[],
        //    搜索框数据
            goodsName:"",
            goodsModel:'',
            goodsColorId:undefined,
            goodsBrandId:undefined,
            // goodsCategoryId:-1,

            goodsColor:[],
            goodsBrand:[],
            //只有最子级
            goodsCategory:{},

           // 分类下拉框数据
            //下拉框相关
            treeData:[],
            valueId:-1,  // 初始值
            valueTitle:'',
            defaultExpandedKey:[],

            //添加相关
            addFirstBut:false,






        }


    },
    // 下拉框的属性数据
    props:{
        /* 配置项 */
        props:{
            type: Object,
            default:()=>{
                return {
                    value:'id',       // ID字段名
                    label: 'categoryName',     // 显示名称
                    children: 'children'  // 子级字段名
                }
            }
        },
        /* 选项列表数据(树形结构的对象数组) */
        // options:{
        //     type: Array,
        //     default: ()=>{ return null }
        // },
        /* 初始值 */
        value:{
            type: Number,
            default: ()=>{ return 0 }
        },
        /* 可清空选项 */
        clearable:{
            type:Boolean,
            default:()=>{ return true }
        },
        /* 自动收起 */
        accordion:{
            type:Boolean,
            default:()=>{ return false }
        },
    },
    created() {
        this .finaPageWithExample();
        this.initSearch()
    },













    methods:{
        /**
         * 添加商品----------->>>>>选择firstgoods
         */
        selectFirstGoods(){

        },
        /**
         *根据id获取firstgoods
         */
       async getFistGoodsById(firstGoodsId){
           return await firstGoods.findById(firstGoodsId)
        },
        /**
         * 初始化全部搜索框
         */
        initSearch(){
            this.getTreeData();
            this.getColorSearchData()
            this.getBrandSearchData()

        },
        /**
         * goodsColor搜索框赋值
         */
        async getColorSearchData(){
            let response = await goods.findAllColor();
            console.log(response);
            this.goodsColor = response;
        },
        /**
         * goodsBrand搜索框赋值
         */
        async getBrandSearchData(){
            let response = await brand.findAllWithoutExampleAndPage();
            console.log(response);
            this.goodsBrand = response;
        },
        /**
         *给分类搜索赋值树形数据
         */
        async getTreeData(){
            let response = await category.getTreeData();
            console.log(response);
            this.treeData = response;
        },
        //下拉框相关方法
        initHandle(){
            if(this.valueId){
                this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]   // 初始化显示

                this.$refs.selectTree.setCurrentKey(this.valueId)    // 设置默认选中
                this.defaultExpandedKey = [this.valueId]   // 设置默认展开
            }
            if (this.valueId==0){
                this.valueTitle ="无"
            }
            this.$nextTick(()=>{
                // let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
                let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
                // scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
                scrollBar.forEach(ele => ele.style.width = 0)
            })

        },
        // 切换选项
        handleNodeClick(node){
            this.valueTitle = node[this.props.label]
            this.valueId = node[this.props.value]
            this.formData.parentId=this.valueId
            this.$emit('getValue',this.valueId)
            this.defaultExpandedKey = []

        },
        //endi的树
        // 切换选项
        handleClick(node){
            this.valueTitle = node[this.props.label]
            this.valueId = node[this.props.value]
            this.formData.goodsCatagoryId=this.valueId
            this.$emit('getValue',this.valueId)
            this.defaultExpandedKey = []
        },
        // 清除选中
        clearHandle(){
            this.valueTitle = ''
            this.valueId = null
            this.defaultExpandedKey = []
            this.clearSelected()
            this.$emit('getValue',null)
        },
        /* 清空选中样式 */
        clearSelected(){
            let allNode = document.querySelectorAll('#tree-option .el-tree-node')
            allNode.forEach((element)=>element.classList.remove('is-current'))
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
        async finaPageWithExample(){
            //将goodsName  goodsModel  goodsColorId  goodsBrandId  goodsCategoryId
            let obj={
                goodsName:this.goodsName,
                goodsModel:this.goodsModel,
                goodsColorId:this.goodsColorId,
                goodsBrandId:this.goodsBrandId,
                goodsCategoryId:this.valueId,
            };
            let respnse = await goods.finaPageWithExample(this.currentPage,this.pageSize,obj);
            this.tableData=respnse.list;
            this.total=respnse.total;
            // console.log(this.tableData)
        },

       // async finaAll(){
       //      let respnse = await goods.findAll(this.currentPage,this.pageSize);
       //       this.tableData=respnse.list
       //        this.total=respnse.total;
       //     console.log(respnse)
       //  },
       async  addOrEdit(){
           console.log("进入addOrEdit")
              if (this.formData.id){
                  //修改
                  //给分类赋值
                  // this.formData.goodsColorId=this.valueId;
                  //验证分类是否为最下级
                // let category= await category.findById(this.valueId)
                //   if (category.ifParent){
                //       this.open()
                //       return;
                //   }
                  await goods.updateEntity(this.formData)

              }else {
                  //新建
                  await goods.addEntity(this.formData) ;
                  this.finaPageWithExample();
              }
           this.resetForm()
        },

        /**
         * 清除表单信息
         */
        resetForm(){
            this.formData={}
            this.valueId=-1;
            this.valueTitle="";
            this.addFirstBut=false;
            this.finaPageWithExample();
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


        pageChange(page){
            this.currentPage=page;
            this.finaPageWithExample()
        },
        async findById(id){

            console.log(id)
            this.formData=await goods.findById(id)
            //将分类回显
           this.valueId=this.formData.goodsCatagoryId;
            this.valueTitle=this.formData.goodsCatagory;
            console.log(this.formData)

        },
        selectionChangListenter(selection){
            this.ids=[]
            selection.forEach(item =>this.ids.push(item.id));
            console.log(this.ids)

        },

        async deleteByIds(){
            if (this.ids.length==0){
                console.log("1323223")
                this.$message.success("请选中要删除的内容")
            }else {
                await goods.deleteById(this.ids);
                this.finaPageWithExample()
                this.ids=[]
            }

        },


    },




}