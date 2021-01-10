import supplier from "@/api/supplier";

export default {
    name: "index.vue",
    data() {
        return {
            tableData: [],
            delDialig:false,
            formData: {},
            ids:[],
            supplierId:localStorage.getItem("supplierId"),
            supplier:{},

        }


    },
    created() {
        this.intSupplierId();
        this.findsupplierByid();
        this.getAddGoods();

    },
    methods:{
        /**
         * 跳转回来查看是否有值
         */
        intSupplierId(){
            var item = localStorage.getItem("supplierId");
            if (item){
                this.supplierId=item;
            }
        },
        /**
         * 添加供应商商品
         */
        addGoods(){
            //携带信息跳转页面  供应商id
            localStorage.setItem("supplierId",this.supplierId)
            this.$router.push({name:'/main/supplier/supplieraddgoods/selectGoods'})
        },
        /**
         * 获取供应商名称
         */
       async findsupplierByid(){
          this.supplier= await supplier.findById(this.supplierId);
        },
        /**
         * 初始化数据
         * @returns {Promise<void>}
         */
       async getAddGoods(){
            this.tableData=await supplier.getAddGoods(this.supplierId)

        },

       async  addOrEdit(){
              if (this.formData.id){
                  //修改
                  await supplier.updateEntity(this.formData)
                  this.getAddGoods();
                  this.formData={}
              }else {
                  //新建
                  await supplier.addEntity(this.formData) ;
                  this.getAddGoods();
                  this.formData={}
              }
        },
       async findById(id){
           this.editDialig=true
           console.log(id)
           this.formData=await supplier.findById(id)
        },
        async deleteByIds(){
            if (this.ids.length==0){
                this.$message.success("请选中要删除的内容")
            }else {
                await supplier.deletesuppgoodsById(this.ids);
                this.ids=[]
            }
            this.getAddGoods();

        },


    }
}