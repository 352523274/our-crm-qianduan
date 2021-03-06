import sellOrder from "@/api/sellOrder";

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
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }

        }


    },
    created() {
        this .finaAll();
    },
    methods:{
       async finaAll(){
            let respnse = await sellOrder.findAll(this.currentPage,this.pageSize);
             this.tableData=respnse.list
             this.total=respnse.total;
           console.log(respnse)
        },
       async  addOrEdit(){
              if (this.formData.id){
                  //修改
                  await sellOrder.updateEntity(this.formData)
                  this.finaAll();
                  this.formData={}
              }else {
                  //新建
                  await sellOrder.addEntity(this.formData) ;
                  this.finaAll();
                  this.formData={}
              }
        },
        pageChange(page){
             this.currentPage=page;
             this.finaAll()
        },

        gotoDetail(id){
            console.log(id)

           this.$router.push({name:'SellOrderDetail',params:{param:id}})

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
                await sellOrder.deleteById(this.ids);
                this.finaAll()
                this.ids=[]
            }

        },


    }
}