import firstGoods from "@/api/firstGoods";

export default {
    name: "index.vue",
    data() {
        return {

            tableData: [],
            currentPage: 1,
            pageSize: 5,
            total: 0,
            formData: {},
        //    搜索框数据
            goodsCode:"",
            model:'',
            color:'',
            brand:'',
            category:'',


        }


    },
    created() {
        this .finaPageWithExample();
    },
    methods:{
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
            let obj={goodsCode:this.goodsCode,
                model:this.model,
                color:this.color,
                brand:this.brand,
                category:this.category,
            }
            let respnse = await firstGoods.finaPageWithExample(this.currentPage,this.pageSize,obj);
            this.tableData=respnse.list
            this.total=respnse.total;
        },
        /**
         * 分页改变
         * @param page
         */
        pageChange(page){
             this.currentPage=page;
             this.finaPageWithExample()
        },


    }
}