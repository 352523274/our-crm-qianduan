import appliaction from "@/api/appliaction";

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
            formInline:{},
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value1: '',
            value2: ''
        }


    },
    created() {
        this .finaAll();
    },
    methods:{
       async finaAll(){
            let respnse = await appliaction.findAll(this.currentPage,this.pageSize);
             this.tableData=respnse.list
             this.tableData.forEach(a=>{
                 a.tReturnedPutMark=a.tReturnedPutMark==true?"已入库":"未入库"
                 a.audit.auditResult=a.audit.auditResult==1?"已审核":"未审核"
             })
           console.log(respnse.list)
              this.total=respnse.total;
           console.log(respnse)
        },
       async findAllByExampl(){
           let respnse= await  appliaction.findAllByExample(this.currentPage,this.pageSize,this.formInline)
           this.tableData=respnse.list
           this.tableData.forEach(a=>{
               a.tReturnedPutMark=a.tReturnedPutMark==true?"已入库":"未入库"
               a.audit.auditResult=a.audit.auditResult==1?"已审核":"未审核"
           })
           this.total=respnse.total;
        },
       async  addOrEdit(){
              if (this.formData.id){
                  //修改
                  await appliaction.updateEntity(this.formData)
                  this.finaAll();
                  this.formData={}
              }else {
                  //新建
                  await appliaction.addEntity(this.formData) ;
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
           this.formData=await appliaction.findById(id)



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
                await appliaction.deleteById(this.ids);
                this.finaAll()
                this.ids=[]
            }

        },
        gotoDetail(id){
            console.log(id)

            this.$router.push({name:'appliactionDetail',params:{param:id}})

        },


    }
}