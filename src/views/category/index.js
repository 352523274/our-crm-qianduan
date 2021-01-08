import category from "@/api/category";

let obj = {
    name: "index",
    data() {
        return {
            tableData: [],
            addOrUpdateVisible:false,
            ids:[],
            formData: {
            },
            //下拉框相关
            valueId:this.value,  // 初始值
            valueTitle:'',
            defaultExpandedKey:[],
            //

        }
    },
    //下拉框的属性数据
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

    mounted(){
        this.initHandle()
    },
    created() {
        this.getTreeData();
    },
    methods: {
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
         分页查询
         */
        async getTreeData() {
            let response = await category.getTreeData();
            console.log(response);
            this.tableData = response;

        },

        /**
         * 增加或者修改
         */
        async addOrUpdate(){
            if (this.formData.id){
                //修改
                await category.updateEntity(this.formData)

            }else {
                //添加
                await category.addEntity(this.formData)
            }
            this.getTreeData()
        },

        /**
         * 根据id查询
         */
        async findById(id){
            this.formData=await category.findById(id)
            this.valueId=this.formData.parentId;
            this.initHandle();
        },

        /**
         * 删除
         */
        async deleteEntity(){
            await category.deleteEntity(this.ids)
            this.getTreeData()
        },
        /**
         * 删除弹框
         */
        open() {
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteEntity();
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }

    },
    watch: {
        value(){
            this.valueId = this.value
            this.initHandle()
        }
    },





}

export default obj;