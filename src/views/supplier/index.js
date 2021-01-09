import supplier from "@/api/supplier";
// import router from "@/router";

export default {
    name: "index.vue",
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 5,
            total: 0,
            adGoodsDialog:false,
            editDialig: false,
            delDialig:false,
            formData: {},
            ids:[],
            //    搜索框数据
            // supplierName:"",
            // supplierPhone:'',
            // supplierContact:'',
            // supplierAddress:'',
            // supplierBrankCode:'',
            // supplierBrank:'',
            selection:"",
            selectionValue:'',


        }


    },
    created() {
        this .getPageWithExample();
    },
    methods:{
        /**
         * 供应商添加商品
         */
        gotoSupplierAddGoods(supplierId){
            console.log(supplierId);
            this.$router.push({name:'supplieraddgoods',params:{supplierId:supplierId}});
        },
        /**
         * 搜索框提交
         */
        onSubmit() {
            this.getPageWithExample()
        },
        /**
         * 条件分页查询
         * @returns {Promise<void>}
         */
       async getPageWithExample(){
           let obj={}
           obj[this.selection]=this.selectionValue;
            console.log(obj);
            let respnse = await supplier.getPageWithExample(this.currentPage,this.pageSize,obj);
             this.tableData=respnse.list
              this.total=respnse.total;
           console.log(respnse)
        },
       async  addOrEdit(){
              if (this.formData.id){
                  //修改
                  await supplier.updateEntity(this.formData)
                  this.getPageWithExample();
                  this.formData={}
              }else {
                  //新建
                  await supplier.addEntity(this.formData) ;
                  this.getPageWithExample();
                  this.formData={}
              }
        },
        pageChange(page){
             this.currentPage=page;
             this.getPageWithExample()
        },
       async findById(id){
           this.editDialig=true
           this.formData=await supplier.findById(id)
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
                await supplier.deleteById(this.ids);
                this.getPageWithExample()
                this.ids=[]
            }

        },


    }
}