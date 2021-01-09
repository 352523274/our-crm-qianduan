import crm from "../utils/baseAxios";
import axios from "axios";

let firstGoods= {

    finaPageWithExample(currentPage, pageSize,obj) {
        return crm.post(`firstGoods/getPageWithExample?currentPage=${currentPage}&pageSize=${pageSize}`,obj)
    },
   async findById(id) {
        let a=await crm.get(`firstGoods/${id}`)
       return a;
    },
   addEntity(entity){
        return axios.post(`firstGoods`,entity);
   },
    updateEntity(entity){
        return axios.put(`firstGoods`,entity);
   },
    deleteById(ids){
       return  axios.delete(`firstGoods/${ids}`);
    }

}
export default firstGoods;