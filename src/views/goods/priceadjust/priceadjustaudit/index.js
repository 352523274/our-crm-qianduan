import priceadjustform from "@/api/priceadjustform";
import goods from "@/api/goods";
import audit from "@/api/audit";

export default {
    name: "index.vue",
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 5,
            total: 0,
            editDialig: false,
            priceadjustformData: {},
            auditformdata:{},

            //搜索框的数据
            goodsName:undefined,
            aduitStatus:undefined,
            hopeEffectiveDate:undefined,
            hopeExpiryDate:undefined,


        }


    },
    created() {
        this.finaPageWithExample();
        //看跳转回来的相关

    },
    methods:{

        /**
         * 有条件的分页查询
         * @returns {Promise<void>}
         */
        async finaPageWithExample() {
            //goodsName  aduitStatus   hopeEffectiveDate   hopeExpiryDate
            let obj = {
                goodsName: this.goodsName,
                aduitStatus: this.aduitStatus,
                hopeEffectiveDate: this.hopeEffectiveDate,
                hopeExpiryDate: this.hopeExpiryDate,
            };
            let respnse = await priceadjustform.finaPageWithExample(this.currentPage, this.pageSize, obj);

            //取到数据之前进行  渲染改变
            //改变审批状态
            respnse.list.forEach(a=>{
                if (a.aduitStatus==0) {
                    a.aduitStatus='未通过'
                }else if(a.aduitStatus==1){
                    a.aduitStatus='已审核'
                }else {
                    a.aduitStatus='未审核'
                }
            })
            //数据修改完成   进行渲染
            this.tableData = respnse.list;
            this.total = respnse.total;
        },
        /**
         * 跳转到审核跟踪详情页面
         */
        adjustDetail(id){
            localStorage.setItem("priceadjustformId",id)
            localStorage.setItem("rebackpath","priceadjust/priceadjustaudit");
            this.$router.push({name:'priceadjust/aduitTrace'})
        },
        /**
         *搜索框提交
         */
        onSubmit() {
            this.finaPageWithExample()
        },
        /**
         * 清除表单信息form
         */
        resetForm() {
            this.priceadjustformData={}
            this.auditformdata={}
            //清空搜索下拉框信息
            // this.goodsBrandId=undefined;
            // this.goodsCategoryId=undefined;
            // this.goodsColorId=undefined
            this.finaPageWithExample();
        },
        /**
         *根据form数据进行给表单添加审核结果
         */
       async  addOrEdit(){

                  //修改
                  await audit.updatepriceadjust(this.priceadjustformData.id,this.auditformdata)

                  this.finaPageWithExample();
                  this.priceadjustformData={}
                  this.auditformdata={}


        },
        pageChange(page){
             this.currentPage=page;
             this.finaPageWithExample()
        },


        async findById(item){
            let response= await priceadjustform.findById(item)

            this.priceadjustformData= response
            if (this.priceadjustformData.aduitStatus!=2){
                this.$message.warning("已经审核禁止再次审核")
                return false;
            }else {
                this.editDialig=true
            }
                // this.iniaudit(response.auditId);
        },
        async iniaudit(id){
            let re= await audit.findById(id)
            this.auditformdata=re;
        },
        /**
         *查询出来继续渲染form
         */
       // async findById(id){
       //
       //     console.log(id)
       //     this.formData=await priceadjustform.findById(id)
       //     if (this.formData.aduitStatus!=2){
       //         this.$message.warning("已经审核禁止再次审核")
       //         return false;
       //     }else {
       //         this.editDialig=true
       //     }
       //
       //  },
    }
}