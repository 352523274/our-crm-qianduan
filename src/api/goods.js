import crm from "../utils/baseAxios";
import axios from "axios";
import firstGoods from "@/api/firstGoods";

let goods= {

    findAllColor(){
        return crm.get(`goods/findAllColor`)
    },
    /**
     *从后端有条件分页查值     并附带firstgoods的属性
     */
   async finaPageWithExample(currentPage, pageSize,obj) {
       let response= await crm.post(`goods/getPageWithExample?currentPage=${currentPage}&pageSize=${pageSize}`,obj)
       //处理返回值
       let goodAddFirt=[]
      await response.list.forEach(g=>{
           firstGoods.findById(g.firstGoodsId).then(re=>{
               g=Object.assign(re, g);
               goodAddFirt.push(g)
           });
       })
       response.list=goodAddFirt;
       return response;
    },
    /**
     *从后端有按id查值     并附带firstgoods的属性
     */
   async findById(id) {
       let response= await crm.get(`goods/findGoodsVoById/${id}`)

       await firstGoods.findById(response.firstGoodsId).then(ree=>{

            response=Object.assign(ree, response)
            response=ree;

        })
        console.log(response);
        return response;
    },
    /**
     *增加
     */
   addEntity(entity){
        return axios.post(`goods`,entity);
   },
    updateEntity(entity){
        return axios.put(`goods`,entity);
   },
    deleteById(ids){
       return  axios.delete(`goods/${ids}`);
    }

}
export default goods;