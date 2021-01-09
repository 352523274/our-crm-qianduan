import brand from "@/api/brand";

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
            ids:[]
        }


    },
    created() {
        this.finaAll();
    },
    methods:{
       async finaAll(){
            let respnse = await brand.findAll(this.currentPage,this.pageSize);
             this.tableData=respnse.list
           console.log(respnse.list)
              this.total=respnse.total;
           console.log(respnse)
        },

       async  addOrEdit(){
              if (this.formData.id){
                  //修改
                  await brand.updateEntity(this.formData)
                  this.finaAll();
                  this.formData={}
              }else {
                  //新建
                  await brand.addEntity(this.formData) ;
                  this.finaAll();
                  this.formData={}
              }
        },
        pageChange(page){
             this.currentPage=page;
             this.finaAll()
        },
       async findById(id){
           this.editDialig=true
           console.log(id)
           this.formData=await brand.findById(id)



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
                await brand.deleteById(this.ids);
                this.ids=[]
            }
            console.log("删除完了")
            this.finaAll();

        },


    }
}