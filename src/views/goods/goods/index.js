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
        //    搜索框数据
            goodsName:"",
            goodsModel:'',
            goodsColorId:-1,
            goodsBrandId:-1,
            goodsCategoryId:-1,


        }


    },
    created() {
        this .finaPageWithExample();
    },
    methods:{
        /**
         * 有条件的分页查询
         * @returns {Promise<void>}
         */
        async finaPageWithExample(){
            //goodsName:"",
            //             goodsModel:'',
            //             goodsColorId:-1,
            //             goodsBrandId:-1,
            //             goodsCategoryId:-1,

            let obj={goodsName:this.goodsName,
                goodsModel:this.goodsModel,
                goodsColorId:this.goodsColorId,
                goodsBrandId:this.goodsBrandId,
                goodsCategoryId:this.goodsCategoryId,
            }
            let respnse = await goods.finaPageWithExample(this.currentPage,this.pageSize,obj);
            this.tableData=respnse.list
            this.total=respnse.total;
            console.log(respnse)
        },

       // async finaAll(){
       //      let respnse = await goods.findAll(this.currentPage,this.pageSize);
       //       this.tableData=respnse.list
       //        this.total=respnse.total;
       //     console.log(respnse)
       //  },
       async  addOrEdit(){
              if (this.formData.id){
                  //修改
                  await goods.updateEntity(this.formData)
                  this.finaPageWithExample();
                  this.formData={}
              }else {
                  //新建
                  await goods.addEntity(this.formData) ;
                  this.finaPageWithExample();
                  this.formData={}
              }
        },
        pageChange(page){
             this.currentPage=page;
             this.finaPageWithExample()
        },
       async findById(id){
           this.editDialig=true
           console.log(id)
           this.formData=await goods.findById(id)



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


    }
}