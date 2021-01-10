import supplier from "@/api/supplier";
import priceadjustform from "@/api/priceadjustform";
import audit from "@/api/audit";

export default {
    name: "index.vue",
    data() {
        return {
            priceadjustformData: {},
            auditformdata:{},
            auditshow:false,
            auditshowNo:false,

        }


    },
    created() {
        this.inidata();

    },
    methods:{
        /**
         * 跳转回来查看是否有值  渲染
         */
        inidata(){
            //取出pricedjustformId   进行渲染
            var item = localStorage.getItem("priceadjustformId");
            this.inipriceadjust(item);

        },
       async inipriceadjust(item){
           let response= await priceadjustform.findById(item)
          this.priceadjustformData= response
           if (response.aduitStatus==2){
               this.auditshowNo=true;
               this.auditshow=false;
           }else {
               this.auditshowNo=false;
               this.auditshow=true;
               this.iniaudit(response.auditId);
           }

        },
       async iniaudit(id){
           let re= await audit.findById(id)
           this.auditformdata=re;
        },
        /**
         * 携带信息跳转页面
         */
        reback(){
          this.$router.push({name:localStorage.getItem("rebackpath")})
        },


    }
}