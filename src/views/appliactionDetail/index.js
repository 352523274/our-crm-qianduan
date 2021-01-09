
import sellOrderDetail from "@/api/sellOderDetail";

export default {
    name: "index.vue",
    data() {

        return {
             tableData: [],
            table1Data:[],
             sellId:0,
            table2Data:[],
        }


    },
    created() {
        this .finaAll();
    },
    methods:{
       async finaAll(){

           let params = this.$route.params.param;
           console(params)


           this.sellId=params
           let respone= await sellOrderDetail.findById(this.sellId)
           this.consigneeId=respone.sellOrder.consigneeId
           let respons = await  sellOrderDetail.findDetailById(this.consigneeId)
           console.log(respons);
           this.tableData.push(respone)
           this.table1Data.push(respons[0])
           this.table2Data=respons
       },






    }
}