import priceadjustform from "@/api/priceadjustform";
import goods from "@/api/goods";

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
            addGoodsBut:false,

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
        this.initiaozhuanpage()

    },
    methods:{
        /**
         * 跳转参数初始化页面
         */
        initiaozhuanpage(id){
            if (localStorage.getItem("goodsId")){
                //有值就是跳转来的  显示出添加页面
                this.addGoods(localStorage.getItem("goodsId"))
                localStorage.removeItem("goodsId")
            }
        },
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
            localStorage.setItem("rebackpath","priceadjust/priceadjustadmin");
            this.$router.push({name:'priceadjust/aduitTrace'})
        },
        /**
         * 跳转到商品选择页面
         */
        selectGoods(){
            this.$router.push({name:'priceadjust/selectGoods'})
        },
        /**
         * 渲染goods相关数据到form   根据goodsid
         */
       async addGoods(id){
            console.log("进入了渲染页面")
           var promise =await goods.findById(id);
           this.formData.goodsId=promise.id;
           this.formData.goodsName=promise.goodsName;
           this.formData.stock=promise.stock;
           this.formData.marketPrice=promise.marketPrice;
           this.formData.shoppingPrice=promise.shoppingPrice;
            this.editDialig=true

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
            this.formData = {}
            //清空搜索下拉框信息
            // this.goodsBrandId=undefined;
            // this.goodsCategoryId=undefined;
            // this.goodsColorId=undefined
            this.finaPageWithExample();
        },
        /**
         *根据form数据进行修改或者添加
         */
       async  addOrEdit(){
              if (this.formData.id){
                  //修改
                  await priceadjustform.updateEntity(this.formData)
                  this.finaPageWithExample();
                  this.formData={}
              }else {
                  //新建
                  await priceadjustform.addEntity(this.formData) ;
                  this.finaPageWithExample();
                  this.formData={}
              }
        },
        pageChange(page){
             this.currentPage=page;
             this.finaPageWithExample()
        },
       async findById(id){

           console.log(id)
           this.formData=await priceadjustform.findById(id)
           if (this.formData.aduitStatus==1){
               this.$message.warning("已经审核禁止修改")
               return false;
           }else {
               this.editDialig=true

           }

        },
        selectionChangListenter(selection){
           this.ids=[]
           selection.forEach(item =>this.ids.push(item.id));
            console.log(this.ids)

        },

        async deleteByIds(){
            if (this.ids.length==0){
                this.$message.success("请选中要删除的内容")
            }else {
                await priceadjustform.deleteById(this.ids);
                this.ids=[]
            }
            console.log("删除完了")
            this.finaPageWithExample();

        },


    }
}